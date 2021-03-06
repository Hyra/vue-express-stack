import pubsub, { EVENTS } from "../subscription";

export default {
  Query: {
    posts: async (parent, { authorId }, { db }) =>
      await db.post.findAll({ where: { authorId }, offset: 2 }),
    post: (parent, { id }, { db }) => db.post.findById(id)
  },
  Mutation: {
    createPost: async (parent, { title, content, authorId }, { db }) => {
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
    updatePost: (parent, { title, content, id }, { db }) =>
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
    deletePost: (parent, { id }, { db }) =>
      db.post.destroy({
        where: {
          id: id
        }
      })
  },
  Post: {
    author: parent => parent.getAuthor()
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.POST.CREATED)
    }
  }
};
