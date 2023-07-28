import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://shop-smart-api-1c3c0f010f3b.herokuapp.com/query', 
  cache: new InMemoryCache(),
  
});

export default client;