import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { AuthenticationError, UserInputError } from "apollo-server-express";

const stripe = Stripe("sk_test_HjMDt0IGY1gapAtwisALNOuf");

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
      { db, req, secret }
    ) => {
      // if (password.length < 10) {
      //   throw new UserInputError("Password too short");
      // }

      const user = await db.user.create({ email: email, password: password });

      const stripeAccount = await stripe.accounts.create({
        country: country,
        type: "custom",
        email: email,
        business_name: title,
        legal_entity: {
          type: "company",
          business_name: title
        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: req.connection.remoteAddress // Assumes you're not using a proxy
        }
      });

      const stripeCustomer = await stripe.customers.create(
        {
          email: email
        },
        {
          stripe_account: stripeAccount.id
        }
      );

      const dojo = await db.dojo.create({
        title: title,
        country: country,
        currency: stripeAccount.default_currency,
        handle: handle,
        stripeId: stripeAccount.id
      });

      const profile = await db.profile.create({
        stripeId: stripeCustomer.id,
        isSensei: true
      });

      await profile.setDojo(dojo);
      await user.addProfile(profile);

      // await dojo.addSensei(user);
      // await dojo.setUsers(user);

      // const d = await db.dojo.findById(1, { include: [db.user] });

      req.session.userId = user.id;
      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (parent, { email, password }, { db, req, secret }) => {
      const user = await db.user
        .scope("withPassword")
        .findOne({ where: { email } });
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
    },
    forgotPassword: async (parent, { email }, { db }) => {
      const user = await db.user.scope("withPassword").findOne({
        where: { email }
      });
      if (user) {
        const payload = {
          id: user.id,
          email
        };
        const secret = user.password + "-" + new Date(user.updatedAt).getTime();
        const token = require("jsonwebtoken").sign(payload, secret);
        console.log(`/reset-password/${user.id}/${token}`);
      }
      return true;
    },
    validateResetPasswordToken: async (parent, { userId, token }, { db }) => {
      const user = await db.user.scope("withPassword").findOne({
        where: { id: userId }
      });
      if (user) {
        var secret = user.password + "-" + new Date(user.updatedAt).getTime();
        const verify = await require("jsonwebtoken").verify(
          token,
          secret,
          err => {
            // (err, decoded)
            if (err) {
              return false;
            } else {
              // res.redirect(`/reset-password/${decoded.id}/${req.params.token}`);
              return true;
            }
          }
        );
        return verify;
      }
    },
    resetPassword: async (parent, { userId, token, newPassword }, { db }) => {
      const user = await db.user.scope("withPassword").findOne({
        where: { id: userId }
      });
      if (user) {
        var secret = user.password + "-" + new Date(user.updatedAt).getTime();
        const verified = await require("jsonwebtoken").verify(
          token,
          secret,
          err => {
            // (err, decoded)
            if (err) {
              return false;
            } else {
              // res.redirect(`/reset-password/${decoded.id}/${req.params.token}`);
              return true;
            }
          }
        );
        if (verified) {
          // Reset the password
          user.password = newPassword;
          await user.save();
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
