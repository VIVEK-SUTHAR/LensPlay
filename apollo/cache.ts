import { InMemoryCache } from "@apollo/client";
import cursorBasedPagination from "./curserBasedPagination";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: cursorBasedPagination(["request", ["profileId", "metadata"]]),
        explorePublications: cursorBasedPagination([
          "request",
          ["sortCriteria", "noRandomize", "profileId", "metadata"],
        ]),
        notifications: cursorBasedPagination([
          "request",
          ["profileId", "notificationTypes", "highSignalFilter"],
        ]),
      },
    },
  },
});
export default cache;
