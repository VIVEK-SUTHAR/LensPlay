import { gql } from "@apollo/client";

export default gql`
  query Query($token: Jwt!) {
    verify(request: { accessToken: $token })
  }
`;
