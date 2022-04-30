const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    token: String
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

  input loginInput {
    email: String
    password: String
  }

  type Mutation {
    createUser(user: userInput): User
    deleteUser(id: ID): String
    updateUser(id: ID, user: userInput): User
    loginUser(user: loginInput): User
  }
`

module.exports = typeDefs;