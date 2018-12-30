import { gql } from "apollo-server-express";

import postSchema from "./post";
import authorSchema from "./author";

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

export default [linkSchema, postSchema, authorSchema];
