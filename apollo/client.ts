import { ApolloClient, InMemoryCache } from "@apollo/client";
import cursorBasedPagination from "./curserBasedPagination";
const client = new ApolloClient({
  uri: "https://api-mumbai.lens.dev",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: cursorBasedPagination(["request", ["profileId", "metadata"]]),
          explorePublications: cursorBasedPagination([
            "request",
            ["sortCriteria", "noRandomize", "profileId", "metadata"],
          ]),
          Notifications: cursorBasedPagination(["request", ["profileId"]]),
        },
      },
    },
  }),
});
export { client };
