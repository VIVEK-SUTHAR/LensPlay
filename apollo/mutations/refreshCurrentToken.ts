import { gql } from "@apollo/client";

export default gql`
  mutation Refresh($rtoken: Jwt!) {
    refresh(request: { refreshToken: $rtoken }) {
      accessToken
      refreshToken
    }
  }
`;
