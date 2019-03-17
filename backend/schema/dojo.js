import { gql } from "apollo-server-express";

export default gql`
  type Availability {
    available: Boolean!
  }

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
    product: BillingProduct
  }

  type BoolMessage {
    result: Boolean
    message: String
  }

  type Subscription {
    id: ID!
    created: String
    days_until_due: Int
    current_period_start: Int
    current_period_end: Int
    plan: Plan
  }

  extend type Query {
    dojos: [Dojo!]!
    isHandleAvailable(handle: String!): Availability
    getStudents(dojoSlug: String!): [Profile]!
    getStudent(dojoSlug: String!, student: String!): Profile!
    getBillingProducts(dojoSlug: String!): [BillingProduct]!
    getPlans(dojoSlug: String!): [Plan]!
    listStudentSubscriptions(
      dojoSlug: String!
      student: String!
      status: String
    ): [Subscription]!
  }

  extend type Mutation {
    newStudent(
      dojoSlug: String!
      email: String!
      firstName: String!
      lastName: String!
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
    addStudentSubscription(
      dojoSlug: String!
      student: String!
      plan: String!
      start: String
    ): BoolMessage!
    deleteStudentSubscription(dojoSlug: String!, plan: String!): BoolMessage!
    deleteStudent(dojoSlug: String!, student: String!): BoolMessage!
  }
`;
