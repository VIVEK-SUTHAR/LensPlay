import { gql } from "@apollo/client";

export default gql`
	query Publication($pubid: InternalPublicationId!, $id: ProfileId) {
		publication(request: { publicationId: $pubid }) {
			__typename
			... on Post {
				mirrors(by: $id)
			}
		}
	}
`;
