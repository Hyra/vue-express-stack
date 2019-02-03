import { gql } from "apollo-server-express";

export default gql`
  type Dojo {
    id: ID!
    title: String
    handle: String!
    country: String!
  }

  extend type Query {
    dojos: [Dojo!]!
    isHandleAvailable(handle: String!): Availability
    getStudents(dojoSlug: String!): [Profile]!
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
