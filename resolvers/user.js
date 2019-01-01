import jwt from "jsonwebtoken";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn
  });
};

export default {
  Query: {
    users: (parent, args, { db }, info) => db.user.findAll(),
    user: (parent, { id }, { db }, info) => db.user.findById(id)
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { db, secret }) => {
      const user = await db.user.create({
        username,
        email,
        password
      });

      return { token: createToken(user, secret, "30m") };
    }
  }
};
