import { gql } from "apollo-server-express";

export default gql`
  type Profile {
    id: ID!
    stripeId: String
    isSensei: Boolean
    dojo: Dojo!
    user: User!
  }

  extend type Query {
    profiles: [Profile!]!
  }
`;
