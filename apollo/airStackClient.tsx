import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AIRSTACK_KEY } from "constants/index";

const AirStackClient = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://api.airstack.xyz/gql",
	headers: {
		authorization: AIRSTACK_KEY,
	},
});
export default AirStackClient;
