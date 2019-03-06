import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "./authorization";
import { isSenseiOfDojo } from "./authorization";
import Stripe from "stripe";

const stripe = Stripe("sk_test_HjMDt0IGY1gapAtwisALNOuf");

export default {
  Query: {
    dojos: combineResolvers(
      // isAuthenticated,
      async (parent, args, { db, req }) => {
        const currentUser = await db.user.findById(req.session.userId);
        const profiles = await currentUser.getProfiles();

        const dojos = await Promise.all(
          profiles.map(async profile => {
            let dojo = await profile.getDojo();
            return dojo;
          })
        );

        return dojos;
      }
    ),
    isHandleAvailable: async (parent, { handle }, { db }) => {
      const availability = await db.dojo.findAll({
        where: {
          handle: handle
        }
      });
      if (availability.length) {
        return { available: false };
      }
      return { available: true };
    },
    getStudents: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug }, { db }) => {
        const dojo = await db.dojo.find({
          where: {
            handle: dojoSlug
          }
        });
        const profiles = await dojo.getProfiles({
          include: [
            {
              model: db.user
            }
          ]
        });

        return profiles;
      }
    ),
    getBillingProducts: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug }, { db }) => {
        const dojo = await db.dojo.find({
          where: {
            handle: dojoSlug
          }
        });

        const billingProducts = await stripe.products.list(
          { type: "service" },
          {
            stripe_account: dojo.stripeId
          }
        );

        await Promise.all(
          billingProducts.data.map(async billingProduct => {
            const plan = await stripe.plans.list(
              {
                product: billingProduct.id
              },
              {
                stripe_account: dojo.stripeId
              }
            );
            billingProduct.plans = plan.data;
          })
        );

        return billingProducts.data;
      }
    ),
    getPlans: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug }, { db }) => {
        const dojo = await db.dojo.find({
          where: {
            handle: dojoSlug
          }
        });
        // const billingProducts = await stripe.products
        const billingProducts = await stripe.plans.list(
          {},
          {
            stripe_account: dojo.stripeId
          }
        );

        return billingProducts.data;
      }
    )
  },

  Mutation: {
    newStudent: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, email, firstname, lastname }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        // Check if there is a user with the given email
        const userCheck = await db.user.findOne({
          where: { email: email },
          include: [
            {
              model: db.profile,
              include: [
                {
                  model: db.dojo,
                  where: {
                    id: dojo.id
                  }
                }
              ]
            }
          ]
        });
        if (userCheck) {
          // User exists, check if it has a profile for this dojo
          if (userCheck.profiles.length) {
            // Need to do nothing, already have a profile for this dojo
            // TODO: Send error? Or just the profile?
            return userCheck.profiles[0];
          } else {
            // Need to create a profile for the found user

            const stripeCustomer = await stripe.customers.create(
              {
                email: email
              },
              {
                stripe_account: dojo.stripeId
              }
            );
            const profile = await db.profile.create({
              stripeId: stripeCustomer.id,
              firstname,
              lastname
            });
            await profile.setDojo(dojo);
            await userCheck.addProfile(profile);
            return profile;
          }
        } else {
          // Need to create a new user, and a profile for dojo
          const student = await db.user.create({
            email,
            password: "qwaszxqwaszx"
          });

          const stripeCustomer = await stripe.customers.create(
            {
              email: email
            },
            {
              stripe_account: dojo.stripeId
            }
          );

          const profile = await db.profile.create({
            stripeId: stripeCustomer.id,
            firstname,
            lastname
          });
          await profile.setDojo(dojo);
          await student.addProfile(profile);
          return profile;
        }
      }
    )
  }
};
