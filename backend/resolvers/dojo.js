import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "./authorization";
import { isSenseiOfDojo } from "./authorization";
import Stripe from "stripe";
import { AuthenticationError, UserInputError } from "apollo-server-express";

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
    getStudent: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, student }, { db }) => {
        const dojo = await db.dojo.find({
          where: {
            handle: dojoSlug
          }
        });

        const profile = await dojo.getProfiles({
          where: {
            stripeId: student
          },
          include: [
            {
              model: db.user
            }
          ]
        });

        if (typeof profile[0] === "undefined") {
          throw new AuthenticationError("Invalid student.");
        }

        return profile[0];
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
    ),
    listStudentSubscriptions: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, student, status }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        const params = {
          customer: student,
          expand: ["data.plan.product"]
        };
        if (status) {
          params.status = status;
        }

        const subscriptions = await stripe.subscriptions.list(params, {
          stripe_account: dojo.stripeId
        });

        return subscriptions.data;
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
            return new UserInputError("Email already exists");
            // return userCheck.profiles[0];
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
    ),
    newBillingProduct: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, name }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        const billingProduct = await stripe.products.create(
          {
            name: name,
            type: "service"
          },
          {
            stripe_account: dojo.stripeId
          }
        );

        return billingProduct;
      }
    ),
    newPlan: combineResolvers(
      isSenseiOfDojo,
      async (
        parent,
        { dojoSlug, product, nickname, interval, interval_count, amount },
        { db }
      ) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        const billingProduct = await stripe.plans.create(
          {
            nickname: nickname,
            amount: amount,
            interval: interval,
            interval_count: interval_count,
            product: product,
            currency: dojo.currency
          },
          {
            stripe_account: dojo.stripeId
          }
        );

        return billingProduct;
      }
    ),
    deleteBillingProduct: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, product }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        try {
          await stripe.products.del(product, {
            stripe_account: dojo.stripeId
          });
        } catch (e) {
          return {
            result: false,
            message: e.message
          };
        }

        return {
          result: true,
          message: "Product succesfully deleted"
        };
      }
    ),
    deletePlan: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, plan }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        try {
          await stripe.plans.del(plan, {
            stripe_account: dojo.stripeId
          });
        } catch (e) {
          return {
            result: false,
            message: e.message
          };
        }

        return {
          result: true,
          message: "Plan succesfully deleted"
        };
      }
    ),
    addStudentSubscription: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, student, plan, start }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        try {
          const params = {
            customer: student,
            billing: "send_invoice",
            days_until_due: 30,
            application_fee_percent: 2,
            // backdate_start_date: 1522494263,
            // trial_end: 1553494263,
            items: [
              {
                plan: plan
              }
            ]
          };

          const currentDate = Math.round(new Date().getTime() / 1000);
          if (start) {
            if (start > currentDate) {
              params.trial_end = start;
            } else {
              params.backdate_start_date = start;
            }
          }
          await stripe.subscriptions.create(params, {
            stripe_account: dojo.stripeId
          });
        } catch (e) {
          return {
            result: false,
            message: e.message
          };
        }

        return {
          result: true,
          message: "Subscription succesfully created"
        };
      }
    ),
    deleteStudentSubscription: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, plan }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        try {
          await stripe.subscriptions.del(plan, {
            stripe_account: dojo.stripeId
          });
        } catch (e) {
          return {
            result: false,
            message: e.message
          };
        }

        return {
          result: true,
          message: "Product succesfully deleted"
        };
      }
    ),
    deleteStudent: combineResolvers(
      isSenseiOfDojo,
      async (parent, { dojoSlug, student }, { db }) => {
        // Dojo we're handling
        const dojo = await db.dojo.findOne({ where: { handle: dojoSlug } });

        try {
          await stripe.customers.del(student, {
            stripe_account: dojo.stripeId
          });
        } catch (e) {
          return {
            result: false,
            message: e.message
          };
        }

        return {
          result: true,
          message: "Student succesfully deleted"
        };
      }
    )
  }
};
