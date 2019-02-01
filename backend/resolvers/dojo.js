import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "./authorization";
import { ForbiddenError } from "apollo-server-express";

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
    getStudents: async (parent, { dojoSlug }, { db, req }) => {
      // TODO: Check if we have permission for this dojo (isSensei of dojo)
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
      // Check if we have permission to this dojo
      const userId = req.session.userId;
      const isSenseiOfDojo = profiles.filter(profile => {
        console.log(profile.user.id, "vs", userId, "and", profile.isSensei);
        return profile.user.id === userId && profile.isSensei;
      });
      if (isSenseiOfDojo.length) {
        return profiles;
      } else {
        throw new ForbiddenError("No access");
      }
    }
  }
};
