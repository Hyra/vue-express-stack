import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
    me: User
  }

  extend type Mutation {
    signUp(
      title: String!
      handle: String!
      country: String!
      email: String!
      password: String!
    ): Token!
    signIn(email: String!, password: String!): Token!
    forgotPassword(email: String!): Boolean!
    validateResetPasswordToken(userId: Int!, token: String!): Boolean!
    resetPassword(userId: Int!, token: String!, newPassword: String!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
  }
`;
