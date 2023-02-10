import { gql } from "@apollo/client";

export default gql`
mutation ReportPublication {
  reportPublication(request: {
    publicationId: "0x01-0x01",
    reason: {
      sensitiveReason: {
        reason: SENSITIVE,
        subreason: OFFENSIVE
      }
    },
    additionalComments: "Dislike this post"
  })
}
`;
