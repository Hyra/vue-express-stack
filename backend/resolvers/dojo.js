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
  }
};
