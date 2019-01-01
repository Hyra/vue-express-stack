import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: ID!
    title: String
    content: String!
    authorId: ID!
    author: Author!
  }
  extend type Query {
    posts(authorId: Int): [Post!]!
    post(id: ID!): Post
  }
  extend type Mutation {
    createPost(title: String, content: String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, content: String!): [Int!]!
    deletePost(id: ID!): Int!
  }
  extend type Subscription {
    postCreated: PostCreated!
  }
  type PostCreated {
    post: Post!
  }
`;
