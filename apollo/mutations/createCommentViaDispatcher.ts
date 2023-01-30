import { gql } from "@apollo/client";

export default gql`
  mutation CreateCommentViaDispatcher(
    $profileId: ProfileId!
    $publicationId: InternalPublicationId!
    $uri: Url!
  ) {
    createCommentViaDispatcher(
      request: {
        profileId: $profileId
        publicationId: $publicationId
        contentURI: $uri
        collectModule: { revertCollectModule: true }
        referenceModule: { followerOnlyReferenceModule: false }
      }
    ) {
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
