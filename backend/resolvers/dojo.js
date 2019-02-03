import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "./authorization";
import { isSenseiOfDojo } from "./authorization";

export default {
  Query: {
    dojos: combineResolvers(
      // isAuthenticated,
      async (parent, args, { db, req }) => {
        const currentUser = await db.user.findById(req.session.userId);
        const profiles = await currentUser.getProfiles();

        const dojos = profiles.map(async profile => {
          let dojo = await profile.getDojo();
          return dojo;
        });

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
            const profile = await db.profile.create({
              stripeId: 616
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
          const profile = await db.profile.create({
            stripeId: 616,
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
