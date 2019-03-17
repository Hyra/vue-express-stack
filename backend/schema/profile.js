import { gql } from "apollo-server-express";

export default gql`
  type Profile {
    id: ID!
    stripeId: String
    isSensei: Boolean
    firstName: String
    lastName: String
    dojo: Dojo!
    user: User!
    createdAt: String!
  }

  extend type Query {
    profiles: [Profile!]!
  }
`;
