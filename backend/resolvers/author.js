import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    authors: combineResolvers(isAuthenticated, async (parent, args, { db }) => {
      return await db.author.findAll();
    }),
    author: (parent, { id }, { db }) => db.author.findById(id)
  },
  Author: {
    posts: parent => parent.getPosts()
  }
};
