import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AIRSTACK_KEY } from "constants/index";
import Logger from "utils/logger";
import cursorBasedPagination from "./curserBasedPagination";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				TokenBalances: {
					keyArgs: [],
					merge(existing = [], incoming) {
						return [...existing, ...incoming.TokenBalance];
					},
				},
			},
		},
	},
});

const AirStackClient = new ApolloClient({
	cache:cache,
	uri: "https://api.airstack.xyz/gql",
	headers: {
		authorization: AIRSTACK_KEY,
	},
});
export default AirStackClient;
