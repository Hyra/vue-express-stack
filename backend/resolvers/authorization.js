import { ForbiddenError } from "apollo-server-express";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

export const isSenseiOfDojo = async (parent, { dojoSlug }, { db, req }) => {
  const dojo = await db.dojo.find({
    where: {
      handle: dojoSlug
    }
  });
  if (!dojo) {
    return new ForbiddenError("No access");
  } else {
    const profiles = await dojo.getProfiles({
      include: [
        {
          model: db.user
        }
      ]
    });
    const isSenseiOfDojo = profiles.filter(profile => {
      return profile.user.id === req.session.userId && profile.isSensei;
    });
    if (isSenseiOfDojo.length) {
      return skip;
    } else {
      return new ForbiddenError("No access");
    }
  }
};
