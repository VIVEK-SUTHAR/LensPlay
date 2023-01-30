import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
const client = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});
export { client };
