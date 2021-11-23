import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider } from '@apollo/client';
import {useState} from "react";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "apollo-link-http";

import Homepage from "./pages/Homepage"
import Matches from "./pages/Matches"
import Swipe from "./pages/Swipe"
import Header from "./components/Header"
import UserProvider from "./hooks/userContext"

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: "http://localhost:1337/graphql",
//   cache: new InMemoryCache(),
// })


function App() {

  const [user, setUser] = useState({a:1, b:2})  
 
  return (
    <Router>
      <ApolloProvider client = {client}>
        <div className="App">
          <Header />
          <UserProvider>
          <Routes>
            <Route path="/" element={<Homepage setUser={setUser}/>} />
            <Route path="/restaurants/:id" element={<Swipe userData={user}/>} />
            <Route path="/restaurnt" element={<Matches />} />
          </Routes>
          </UserProvider>   
        </div>
        </ApolloProvider>
    </Router>
  );
}

export default App;
