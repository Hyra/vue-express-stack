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
    signUp: async (
      parent,
      { country, title, handle, email, password },
      { db, secret }
    ) => {
      // if (password.length < 10) {
      //   throw new UserInputError("Password too short");
      // }

      const user = await db.user.create({ email: email, password: password });

      const dojo = await db.dojo.create({
        title: title,
        country: country,
        handle: handle
      });

      await user.setDojo(dojo);
      await dojo.setUsers(user);

      // const d = await db.dojo.findById(1, { include: [db.user] });

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
