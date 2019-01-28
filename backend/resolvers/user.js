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
    user: (parent, { id }, { db }) => db.user.findById(id),
    me: async (parent, args, { db, req }) => {
      console.log(req.session);
      return await db.user.findById(req.session.userId);
    }
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

      const profile = await db.profile.create({
        stripe_id: Math.floor(Math.random() * 100000)
      });
      profile.setDojo(dojo);
      await user.addProfile(profile);

      // await dojo.addSensei(user);
      // await dojo.setUsers(user);

      // const d = await db.dojo.findById(1, { include: [db.user] });

      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (parent, { email, password }, { db, req, secret }) => {
      const user = await db.user.findByLogin(email);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      // Check if we are a sensei
      // const isSensei = await db.dojo.findOne({
      //   include: [
      //     {
      //       model: db.user,
      //       as: "senseis",
      //       where: { email: user.email }
      //     }
      //   ]
      // });
      // if (!isSensei) {
      //   throw new UserInputError("No user found with this login credentials.");
      // }

      req.session.userId = user.id;

      return { token: createToken(user, secret, "30m") };
    }
  }
};
