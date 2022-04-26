const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
    journeys: [Journey]
  }

  type Journey {
    _id: ID
    journeyTitle: String
    journeyDescription: String
    createdAt: String
    username: String
    goals: [Goal]
  }

  type Goal {
    _id: ID
    goalBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
