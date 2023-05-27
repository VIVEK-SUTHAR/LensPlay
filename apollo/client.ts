import { ApolloClient, from, HttpLink } from "@apollo/client";
import cache from "./cache";

const httpLink = new HttpLink({
	uri: "https://api.lens.dev",
	fetch,
});

const client = new ApolloClient({
	link: from([httpLink]),
	cache,
});
export { client };
