const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// const mongoose = require('mongoose');

// const startServer = async () => {
//   const app = express ();
//   const apolloServer = new ApolloServer({typeDefs, resolvers });

//   await apolloServer.start();

//   apolloServer.applyMiddleware({ app });

//   app.use((req, res) => {
//     res.send('Hello from express apollo server');
//   })

//   await db;

//   console.log('Mongoose connected...')

//   app.listen(3001, () => console.log('App listening on port 3001!'));
// }

// startServer();

// // db.once('open', () => {
// //   app.listen(PORT, () => {
// //     console.log(`API server running on port ${PORT}!`);
// //   });
// // });

// console.log ('2_______________________________________________');


const PORT = process.env.PORT || 3001;
const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
const startApolloServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}


// Call the async function to start the server
startApolloServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
})


// // Call the async function to start the server
// startApolloServer(typeDefs, resolvers);