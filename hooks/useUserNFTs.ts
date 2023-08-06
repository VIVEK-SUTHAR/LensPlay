import { gql } from "@apollo/client";
import AirStackClient from "apollo/airStackClient";
import { useState } from "react";
import { useProfile } from "store/Store";
const useUserNFTLazyQuery = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [error, setError] = useState<Error>();

	const { currentProfile } = useProfile();

	const fetchUserNFTs = async () => {
		try {
			const result = await AirStackClient.query({
				query: gql``,
				variables: {},
			});
			if (result.data) {
				setData(result.data);
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
		} finally {
			setLoading(false);
		}
	};

	return { fetchUserNFTs, data, loading, error };
};

export default useUserNFTLazyQuery;
