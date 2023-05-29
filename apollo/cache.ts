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
        publications: cursorBasedPagination([
          "request",
          ["profileId", "publicationTypes", "sources", "collectedBy", "commentsOf"],
        ]),
        notifications: cursorBasedPagination([
          "request",
          ["profileId", "notificationTypes", "highSignalFilter"],
        ]),
        followers: cursorBasedPagination(["request", ["profileId"]]),
        following: cursorBasedPagination(["request", ["address"]]),
      },
    },
  },
});
export default cache;
