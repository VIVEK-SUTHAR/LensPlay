import { gql } from "@apollo/client";

export default gql`
	mutation CreateSetProfileMetadataViaDispatcher($profileId: ProfileId!, $metadata: Url!) {
		createSetProfileMetadataViaDispatcher(request: { profileId: $profileId, metadata: $metadata }) {
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