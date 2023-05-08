import { gql } from "@apollo/client";

export default gql`
query Publication($id: ProfileId!, $pubId: InternalPublicationId ) {
  publication(request: {
    publicationId: $pubId
  }) {
   __typename 
    ... on Post {
      ...PostFields
    }
    ... on Comment {
      ...CommentFields
    }
    ... on Mirror {
      ...MirrorFields
    }
  }
}
fragment PostFields on Post {
    stats{
    totalUpvotes
    totalAmountOfCollects
    totalAmountOfMirrors
  }
  reaction(request: {profileId:$id})
  hasCollectedByMe
  mirrors(by: $id)
}
fragment CommentFields on Comment {
  
 reaction(request: {profileId:$id})
}
fragment MirrorFields on Mirror {
  stats{
    totalUpvotes
    totalAmountOfMirrors
    totalAmountOfCollects
  }
  reaction(request: {profileId:$id})
  hasCollectedByMe
}
`;