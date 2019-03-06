import { gql } from "apollo-server-express";

export default gql`
  type Dojo {
    id: ID!
    title: String
    handle: String!
    country: String!
  }

  type BillingProduct {
    id: ID!
    name: String
    plans: [Plan]
  }

  type Plan {
    id: ID!
    nickname: String
    interval: String
    interval_count: Int
    amount: String
    currency: String
  }

  extend type Query {
    dojos: [Dojo!]!
    isHandleAvailable(handle: String!): Availability
    getStudents(dojoSlug: String!): [Profile]!
    getBillingProducts(dojoSlug: String!): [BillingProduct]!
    getPlans(dojoSlug: String!): [Plan]!
  }

  extend type Mutation {
    newStudent(
      dojoSlug: String!
      email: String!
      firstname: String!
      lastname: String!
    ): Profile!
  }

  type Availability {
    available: Boolean!
  }
`;
