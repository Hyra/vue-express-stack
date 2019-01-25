import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    isHandleAvailable(handle: String!): Availability
  }

  type Availability {
    available: Boolean!
  }
`;
