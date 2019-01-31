import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "./authorization";

export default {
  Query: {
    profiles: combineResolvers(
      // isAuthenticated,
      async (parent, args, { db, req }) => {
        const currentUser = await db.user.findById(req.session.userId);
        const profiles = await currentUser.getProfiles({
          include: [
            {
              model: db.dojo
            }
          ]
        });
        console.log(profiles);
        // const dojos = profiles.map(async profile => {
        //   let dojo = await profile.getDojo();
        //   return dojo;
        // });

        return profiles;
      }
    )
  }
};
