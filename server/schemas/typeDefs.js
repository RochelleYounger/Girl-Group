const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    bio: String
    journeys: [Journey]
    media: [Media]
    token: String
    password: String
  }

  type Permission {
    user: User
    token: ID!
  }

  type Journey {
    id: ID
    creatorId: String
    title: String
    purpose: String
    goals: [Goal]
    members: [User]
    createdAt: String
  }

  type Goal {
    id: ID
    journeyId: [Journey]
    goalName: String
    completedby: [User]
  }
  type Media{
    id: ID
    userId: String
    mediaName: String
    mediaInfo: String
    mediaRef: String
    mediaType: String
  }
  
  type Query {
    hello: String
    helloJ: String
    helloG: String
    helloM: String

    client: User
    getUsers: [User]
    getUser(userId: ID!): User

    getJourneys: [Journey]
    getJourney(journeyId: ID!): Journey

    ########### the queries below are kinda unecessary
    # getGoals: [Goal]
    # getGoal(goalId: ID!): Goal

    # getMedia: [Media]
    # getMedium(mediaId: ID!): Media
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Permission
    loginUser(email: String!, password: String!): Permission
    deleteUser(id: ID!): String
    updateUser(id: ID!, username: String, email: String, password: String, bio: String): User

    # createJourney(title: String!, purpose: String!): Journey
    deleteJourney(id: ID!): String
    updateJourney(id: ID!, title: String, purpose: String): Journey

    # createGoal(goalName: String!): Goal
    deleteGoal(id: ID!): String
    # updateGoal(id: ID!, goalName: String): Goal

    # createMedia(mediaName: String!, mediaInfo: String!, mediaRef: String!, mediaType: String!): Media
    deleteMedia(id: ID!): String
    # updateMedia(id: ID!, mediaName: String, mediaInfo: String, mediaRef: String, mediaType: String): Media
    

    ########### more specific queries
    #### journey resolvers
    # add member to journey
    addMember(memberId: ID!, journeyId: ID!): Journey
    # addMember: Journey
    # remove member from journey
    dropMember(memberId: ID!): User
    
    # add goal to journey
    addGoal(goalName: String!, journeyId: ID!): Journey
    # remove goal from journey
    # removeGoal(goalId: ID!): Goal

    #### user resolvers
    # add media
    addMedia(mediaName: String!, mediaInfo: String!, mediaRef: String!, mediaType: String!): Media
    # # remove media
    # removeMedia(media: ID!): Media
    # add journey
    addJourney(title: String!, purpose: String!): Journey
  }
`

module.exports = typeDefs;