import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://zamzamwelfaretrust.com/paighamtv/graphql", 
  cache: new InMemoryCache(),
});

export default apolloClient;
