import { gql } from "@apollo/client"


export default gql`
  query Challenge($ethAddress:EthereumAddress!) {
    challenge(
      request: { address: $ethAddress }
    ) {
      text
    }
  }
`;