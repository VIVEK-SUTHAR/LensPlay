import { gql } from "@apollo/client";

export default gql`
	query Search($query: Search!) {
		search(request: { query: $query, type: PROFILE }) {
			... on ProfileSearchResult {
				__typename
				items {
					... on Profile {
						...ProfileFields
					}
				}
				pageInfo {
					prev
					totalCount
					next
				}
			}
		}
	}

	fragment MediaFields on Media {
		url
		mimeType
	}

	fragment ProfileFields on Profile {
		profileId: id
		name
		bio
		id
		attributes {
			displayType
			traitType
			key
			value
		}
		isFollowedByMe
		isFollowing(who: null)
		followNftAddress
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
			}
		}
		ownedBy
		dispatcher {
			address
			canUseRelay
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
				contractAddress
			}
			... on RevertFollowModuleSettings {
				type
				contractAddress
			}
			... on UnknownFollowModuleSettings {
				type
				contractAddress
				followModuleReturnData
			}
		}
	}
`;
