import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://api-mumbai.lens.dev",
  cache: new InMemoryCache({
    typePolicies: {
      Profile: {
        fields: {
          dispatcher: {
            merge(existing = [], incoming: any) {
              return { ...existing, ...incoming };
            },
          },
          stats: {
            merge(existing = [], incoming: any) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
});
export { client };
