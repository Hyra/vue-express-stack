import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    dojos: combineResolvers(
      isAuthenticated,
      async (parent, args, { db, me }) => {
        const userDojos = await db.user.findById(me.id);
        return await userDojos.getDojos();
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
    }
  }
};
