import jwt from "jsonwebtoken";

const createToken = async user => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username });
};

export default {
  Query: {
    users: (parent, args, { db }, info) => db.user.findAll(),
    user: (parent, { id }, { db }, info) => db.user.findById(id)
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { db }) => {
      const user = await db.user.create({
        username,
        email,
        password
      });

      return { token: createToken(user) };
    }
  }
};
