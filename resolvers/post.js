import pubsub, { EVENTS } from "../subscription";

export default {
  Query: {
    posts: async (parent, { authorId }, { db }, info) =>
      await db.post.findAll({ where: { authorId }, offset: 2 }),
    post: (parent, { id }, { db }, info) => db.post.findById(id)
  },
  Mutation: {
    createPost: async (
      parent,
      { title, content, authorId },
      { db, me },
      info
    ) => {
      const post = await db.post.create({
        title: title,
        content: content,
        authorId: authorId
      });
      pubsub.publish(EVENTS.POST.CREATED, {
        postCreated: { post }
      });
      return post;
    },
    updatePost: (parent, { title, content, id }, { db }, info) =>
      db.post.update(
        {
          title: title,
          content: content
        },
        {
          where: {
            id: id
          }
        }
      ),
    deletePost: (parent, { id }, { db }, info) =>
      db.post.destroy({
        where: {
          id: id
        }
      })
  },
  Post: {
    author: (parent, args, context, info) => parent.getAuthor()
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.POST.CREATED)
    }
  }
};
