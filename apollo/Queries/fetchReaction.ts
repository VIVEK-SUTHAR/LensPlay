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
    }
    reaction(request: {profileId:$id})
  }
  fragment CommentFields on Comment {
    
   reaction(request: {profileId:$id})
  }
  fragment MirrorFields on Mirror {
    stats{
      totalUpvotes
    }
    reaction(request: {profileId:$id})
  }
`;