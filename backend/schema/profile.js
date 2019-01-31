import { gql } from "apollo-server-express";

export default gql`
  type Profile {
    id: ID!
    stripeId: String
    isSensei: Boolean
    dojo: Dojo!
  }

  extend type Query {
    profiles: [Profile!]!
  }
`;
