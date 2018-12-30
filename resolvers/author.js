export default {
  Query: {
    authors: (parent, args, { db }, info) => db.author.findAll(),
    author: (parent, { id }, { db }, info) => db.author.findById(id)
  },
  Author: {
    posts: (parent, args, context, info) => parent.getPosts()
  }
};
