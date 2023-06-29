import { gql } from "@apollo/client";

export default gql`
  query ProxyActionStatus($id: ProxyActionId) {
    proxyActionStatus(proxyActionId: $id) {
      ... on ProxyActionStatusResult {
        txHash
        txId
        status
      }
      ... on ProxyActionError {
        reason
        lastKnownTxId
      }
      ... on ProxyActionQueued {
        queuedAt
      }
    }
  }
`;
