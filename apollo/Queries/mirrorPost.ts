import { gql } from "@apollo/client";

export default gql`
  mutation CreateMirrorViaDispatcher(
    $pid: ProfileId!
    $pubId: InternalPublicationId!
  ) {
    createMirrorViaDispatcher(
      request: {
        profileId: $pid
        publicationId: $pubId
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
