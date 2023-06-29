import { gql } from "@apollo/client";

export default gql`
	mutation CreateSetProfileImageURIViaDispatcher($profileId: ProfileId!, $url: Url!) {
		createSetProfileImageURIViaDispatcher(request: { profileId: $profileId, url: $url }) {
			... on RelayerResult {
				txHash
				txId
			}
			... on RelayError {
				reason
			}
		}
	}
`;
