import { LENS_API_ENDPOINT } from "../constants";
/**
 *
 * @param profileId profile-id of user ex: 0x5c59
 * @param accesToken Accesstoken of Signed-in Lens user
 * @returns `onfullfilled`:All notificatons of user in Array Format `onrejected`:error message with valid reason
 */
async function fetchNotifications(profileId: string | undefined, accesToken: string): Promise<any> {
	try {
		let headersList = {
			Authorization: "Bearer " + accesToken,
			"Content-Type": "application/json",
		};

		let gqlBody = {
			query: NOTIFICATIONS_QUERY,
			variables: { pid: profileId },
		};

		let bodyContent = JSON.stringify(gqlBody);

		let response = await fetch(LENS_API_ENDPOINT, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		let data = await response.json();
		return data?.data?.result?.items;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
export default fetchNotifications;

const NOTIFICATIONS_QUERY = `
 query Notifications($pid: ProfileId!) {
    result: notifications(request: { profileId: $pid }) {
      items {
        ... on NewFollowerNotification {
          notificationId
          ...NewFollowerNotificationFields
        }

        ... on NewMirrorNotification {
          notificationId
          ...NewMirrorNotificationFields
        }

        ... on NewCollectNotification {
          notificationId
          ...NewCollectNotificationFields
        }

        ... on NewCommentNotification {
          notificationId
          ...NewCommentNotificationFields
        }

        ... on NewMentionNotification {
          notificationId
          ...NewMentionNotificationFields
        }
        ... on NewReactionNotification {
          notificationId
          ...NewReactionNotificationFields
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }

  fragment CommentWithCommentedPublicationFields on Comment {
    ...CompactComment
    commentOn {
      __typename
      ... on Post {
        ...CompactPost
      }
      ... on Mirror {
        ...CompactMirror
      }
      ... on Comment {
        ...CompactComment
      }
    }
  }

  fragment NewFollowerNotificationFields on NewFollowerNotification {
    __typename
    createdAt
    isFollowedByMe
    wallet {
      ...Wallet
    }
  }

  fragment NewCollectNotificationFields on NewCollectNotification {
    __typename
    createdAt
    wallet {
      ...Wallet
    }
    collectedPublication {
      __typename
      ... on Post {
        ...CompactPost
      }

      ... on Mirror {
        ...CompactMirror
      }

      ... on Comment {
        ...CompactComment
      }
    }
  }

  fragment NewMirrorNotificationFields on NewMirrorNotification {
    __typename
    createdAt
    profile {
      ...CompactProfile
    }
    publication {
      ... on Post {
        ...CompactPost
      }
      ... on Comment {
        ...CompactComment
      }
    }
  }

  fragment NewCommentNotificationFields on NewCommentNotification {
    __typename
    createdAt
    profile {
      ...CompactProfile
    }
    comment {
      ...CommentWithCommentedPublicationFields
    }
  }

  fragment NewMentionNotificationFields on NewMentionNotification {
    __typename
    mentionPublication {
      ... on Post {
        ...CompactPost
      }
      ... on Comment {
        ...CompactComment
      }
    }
    createdAt
  }

  fragment NewReactionNotificationFields on NewReactionNotification {
    __typename
    createdAt
    profile {
      ...CompactProfile
    }
    reaction
    publication {
      ... on Post {
        __typename
        ...CompactPost
      }
      ... on Mirror {
        __typename
        ...CompactMirror
      }
      ... on Comment {
        __typename
        ...CompactComment
      }
    }
  }

  fragment CompactPublicationStats on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment CompactMetadata on MetadataOutput {
    name
    description
    content
    media {
      ...ProfileMediaFields
    }
  }

  fragment CompactPost on Post {
    id
    stats {
      ...CompactPublicationStats
    }
    metadata {
      ...CompactMetadata
    }
    profile {
      ...CompactProfile
    }
    collectedBy {
      ...Wallet
    }
    createdAt
  }

  fragment CompactMirror on Mirror {
    id
    stats {
      ...CompactPublicationStats
    }
    metadata {
      ...CompactMetadata
    }
    profile {
      ...CompactProfile
    }
    createdAt
  }

  fragment CompactComment on Comment {
    id
    stats {
      ...CompactPublicationStats
    }
    metadata {
      ...CompactMetadata
    }
    profile {
      ...CompactProfile
    }
    collectedBy {
      ...Wallet
    }
    createdAt
  }

  fragment CommonPaginatedResultInfo on PaginatedResultInfo {
    prev
    next
    totalCount
  }

  fragment MediaFields on Media {
    url
    width
    height
    mimeType
  }

  fragment ProfileMediaFields on ProfileMedia {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }

    ... on MediaSet {
      original {
        ...MediaFields
      }

      small {
        ...MediaFields
      }

      medium {
        ...MediaFields
      }
    }
  }

  fragment Wallet on Wallet {
    address
    defaultProfile {
      ...CompactProfile
    }
  }

  fragment CompactProfile on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
`;
