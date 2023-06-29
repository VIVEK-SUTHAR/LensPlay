import { gql } from "@apollo/client";

export default gql`
  mutation CreateFollowTypedData($id:ProfileId!) {
    createFollowTypedData(
      request: { follow: [{ profile: $id, followModule: null }] }
    ) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`;
