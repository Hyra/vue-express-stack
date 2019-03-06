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

  type BoolMessage {
    result: Boolean
    message: String
  }

  type Subscription {
    id: ID!
    created: String
  }

  extend type Query {
    dojos: [Dojo!]!
    isHandleAvailable(handle: String!): Availability
    getStudents(dojoSlug: String!): [Profile]!
    getBillingProducts(dojoSlug: String!): [BillingProduct]!
    getPlans(dojoSlug: String!): [Plan]!
    listStudentSubscriptions(
      dojoSlug: String!
      student: String!
    ): [Subscription]!
  }

  extend type Mutation {
    newStudent(
      dojoSlug: String!
      email: String!
      firstname: String!
      lastname: String!
    ): Profile!
    newBillingProduct(dojoSlug: String!, name: String!): BillingProduct!
    newPlan(
      dojoSlug: String!
      product: String!
      nickname: String!
      interval: String!
      interval_count: Int!
      amount: String!
    ): Plan!
    deletePlan(dojoSlug: String!, plan: String!): BoolMessage!
    deleteBillingProduct(dojoSlug: String!, product: String!): BoolMessage!
  }

  type Availability {
    available: Boolean!
  }
`;
