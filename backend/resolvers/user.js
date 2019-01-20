import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-express";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn
  });
};

export default {
  Query: {
    users: (parent, args, { db }) => db.user.findAll(),
    user: (parent, { id }, { db }) => db.user.findById(id)
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { db, secret }) => {
      const user = await db.user.create({
        username,
        email,
        password
      });

      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (parent, { login, password }, { db, secret }) => {
      const user = await db.user.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "30m") };
    }
  }
};
