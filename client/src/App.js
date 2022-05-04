import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import WelcomePage from './pages/WelcomePage';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import Journeys from './pages/Journeys';
// import SingleJourney from './pages/SingleJourney';
import './App.css';

// taken from module 21 deep thoughts ********/
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
/***************************************/

function App() {
  return (
    // <ApolloProvider client={client}>
    //   <Router>
    //     <>
    //       <Navbar />
    //       <Switch>
    //         <Route exact path='/' component={WelcomePage} />
    //         <Route exact path='/journeys' component={Journeys} />
    //         <Route exact path='/journey/:id' component={SingleJourney} />
    //         <Route exact path='/login' component={Login} />
    //         <Route exact path='/signup' component={SignUp} />
    //         <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
    //       </Switch>
    //     </>
    //   </Router>
    // </ApolloProvider>
    <WelcomePage></WelcomePage>
  );
}

export default App;
