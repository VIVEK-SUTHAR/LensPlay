import { gql } from "@apollo/client";

export default gql`
mutation CreateSetDispatcherTypedData($id:ProfileId!) {
    createSetDispatcherTypedData(request:{
      profileId: $id
    }) {
      id
      expiresAt
      typedData {
        types {
          SetDispatcherWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          dispatcher
        }
      }
    }
  }`;