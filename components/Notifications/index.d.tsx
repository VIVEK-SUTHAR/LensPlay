export default interface NotificationCardProps {
  navigation: any;
  notification: Item;
}

export interface Item {
  __typename: string;
  createdAt: Date;
  profile?: Profile;
  comment?: CollectedPublication;
  wallet?: Wallet;
  collectedPublication?: CollectedPublication;
  isFollowedByMe?: boolean;
  publication?: CollectedPublication;
}

export interface CollectedPublication {
  typename?: string;
  id: string;
  stats: Stats;
  metadata: Metadata;
  profile: Profile;
  collectedBy: Wallet | null;
  createdAt: Date;
  commentOn?: CollectedPublication;
}

export interface Wallet {
  address: string;
  defaultProfile: Profile | null;
}

export interface Profile {
  id: string;
  name: null;
  handle: string;
  picture: Picture;
}

export interface Picture {
  original: Original;
  small: null;
  medium: null;
}

export interface Original {
  url: string;
  width: null;
  height: null;
  mimeType: null;
}

export interface Metadata {
  name: string;
  description: string;
  content: string;
  media: any[];
}

export interface Stats {
  totalAmountOfMirrors: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
}

export interface PageInfo {
  prev: string;
  next: string;
  totalCount: number;
}
export enum NotificationTypes {
  COMMENT_NOTIFICATION = "NewCommentNotification",
  REACTION_NOTIFICATION = "NewReactionNotification",
  FOLLOW_NOTIFICATION = "NewFollowerNotification",
  MIRROR_NOTIFICATION = "NewMirrorNotification",
  COLLECT_NOTIFICATION = "NewCollectNotification",
}
