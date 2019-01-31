import { gql } from "apollo-server-express";

import postSchema from "./post";
import authorSchema from "./author";
import userSchema from "./user";
import dojoSchema from "./dojo";
import profileSchema from "./profile";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  postSchema,
  authorSchema,
  userSchema,
  dojoSchema,
  profileSchema
];
