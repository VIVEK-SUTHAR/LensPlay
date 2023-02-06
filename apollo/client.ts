import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";


const getAccessToken = async () => {
	const JsonData = await AsyncStorage.getItem("@storage_Key");
	if (JsonData) {
		const tokens = await JSON.parse(JsonData);
		return `Bearer ${tokens.accessToken}`
	}
	return "";
}

const authLink = setContext((_, { headers }) => {
	const token = getAccessToken();
	return {
		headers: {
			...headers,
			authorization: token,
		}
	}
})

const httpLink = createHttpLink({
	uri: "https://api.lens.dev"
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
export { client };
