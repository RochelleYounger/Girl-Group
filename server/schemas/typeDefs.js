const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    token: String
  }

  type Journey {
    id: ID
    # username: String
    title: String
    purpose: String
    # createdAt: String
  }

  type Goal {
    id: ID
    # completedby: [users]
    goalName: String
  }
  
  type Query {
    hello: String
    helloJ: String
    helloG: String

    getUsers: [User]
    getUser(userId: ID!): User

    getJourneys: [Journey]
    getJourney(journeyId: ID!): Journey

    getGoals: [Goal]
    getGoal(goalId: ID!): Goal
  }

  # input userInput {
  #   username: String
  #   email: String
  #   password: String
  # }

  # input loginInput {
  #   email: String
  #   password: String
  # }

  # input journeyInput {
  # 
  # }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    deleteUser(id: ID!): String
    updateUser(id: ID!, username: String, email: String, password: String): User
    createJourney(title: String!, purpose: String!): Journey
    deleteJourney(id: ID!): String
    updateJourney(id: ID!, title: String, purpose: String): Journey
    createGoal(goalName: String!): Goal
    deleteGoal(id: ID!): String
    updateGoal(id: ID!, goalName: String): Goal
  }
`

module.exports = typeDefs;