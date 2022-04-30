const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }
  
  type Query {
    hello: String

    getAllUsers: [User]

    getUser(id: ID): User
  }

  input userInput {
    username: String
    email: String
    password: String
  }

  type Mutation {
    createUser(user: userInput): User
    deleteUser(id: ID): String
    updateUser(id: ID, user: userInput): User
  }
`

module.exports = typeDefs;