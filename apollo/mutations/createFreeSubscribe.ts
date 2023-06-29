import { gql } from "@apollo/client";

export default gql`
  mutation ProxyAction($id: ProfileId!) {
    proxyAction(request: { follow: { freeFollow: { profileId: $id } } })
  }
`;
