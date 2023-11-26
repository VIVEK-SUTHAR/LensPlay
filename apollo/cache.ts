import { InMemoryCache } from "@apollo/client";
import result from "customTypes/generated";

import cursorBasedPagination from "./curserBasedPagination";

const cache = new InMemoryCache({
	possibleTypes: result.possibleTypes,
	typePolicies: {
		Query: {
			fields: {
				feed: cursorBasedPagination(["request", ["where"]]),
				explorePublications: cursorBasedPagination(["request", ["orderBy", "limit", "where"]]),
				publicationsProfileBookmarks: cursorBasedPagination([
					"request",
					["orderBy", "limit", "where"],
				]),
				publications: cursorBasedPagination(["request", ["orderBy", "limit", "where"]]),
				notifications: cursorBasedPagination(["request", ["where"]]),
				followers: cursorBasedPagination(["request", ["limit", "of"]]),
				following: cursorBasedPagination(["request", ["limit", "for"]]),
				searchProfiles: cursorBasedPagination(["request", ["limit", "query", "where"]]),
				searchPublications: cursorBasedPagination(["request", ["limit", "query", "where"]]),
				profiles: cursorBasedPagination(["request", ["limit", "where"]]),
				profileManagers: cursorBasedPagination(["request", ["cursor", "for"]]),
				profilesManaged: cursorBasedPagination(["request", ["cursor", "for"]]),
			},
		},
	},
});

export default cache;
