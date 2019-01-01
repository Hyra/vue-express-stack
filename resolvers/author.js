import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    authors: combineResolvers(
      isAuthenticated,
      async (parent, args, { db }, info) => {
        return await db.author.findAll();
      }
    ),
    author: (parent, { id }, { db }, info) => db.author.findById(id)
  },
  Author: {
    posts: (parent, args, context, info) => parent.getPosts()
  }
};
