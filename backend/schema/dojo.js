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
    currency: String!
    currency_symbol: String!
    currency_zerodecimal: Boolean!
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
    billing: String
    status: String
    current_period_start: Int
    current_period_end: Int
    plan: Plan!
    customer: User
  }

  extend type Query {
    dojos: [Dojo!]!
    getDojo(dojoSlug: String!): Dojo
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
    getSubscriptions(dojoSlug: String!): [Subscription]!
  }

  extend type Mutation {
    newStudent(
      dojoSlug: String!
      email: String!
      firstName: String!
      lastName: String!
    ): Profile!
    editStudent(
      dojoSlug: String!
      student: String!
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
      amount: Int!
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
    editProduct(
      dojoSlug: String!
      product: String!
      name: String!
    ): BoolMessage!
    editPlan(dojoSlug: String!, plan: String!, nickname: String!): BoolMessage!
  }
`;
