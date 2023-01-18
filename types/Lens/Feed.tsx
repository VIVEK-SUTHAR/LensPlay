export interface Feed {
  data: Data;
}

export interface Data {
  feed: FeedClass;
}

export interface FeedClass {
  items: FeedItem[];
  pageInfo: PageInfo;
}

export interface FeedItem {
  root: Root;
  electedMirror: ElectedMirror | null;
  mirrors: Mirror[];
  collects: any[];
  reactions: any[];
  comments: any[];
}

export interface ElectedMirror {
  mirrorID: string;
  profile: ElectedMirrorProfile;
  timestamp: Date;
}

export interface ElectedMirrorProfile {
  id: string;
  handle: string;
}

export interface Mirror {
  profile: ElectedMirrorProfile;
  timestamp: Date;
}

export interface Root {
  id: string;
  profile: RootProfile;
  stats: RootStats;
  metadata: Metadata;
  createdAt: Date;
  collectModule: CollectModule;
  referenceModule: Module | null;
  appID: "";
  hidden: boolean;
  reaction: null | string;
  mirrors: any[];
  hasCollectedByMe: boolean;
}

export interface CollectModule {
  typename: string;
  type: string;
  collectLimit?: string;
  amount?: Amount;
  recipient?: string;
  referralFee?: number;
  endTimestamp?: Date;
  followerOnly?: boolean;
  contractAddress?: "";
}

export interface Amount {
  asset: Asset;
  value: string;
}

export interface Asset {
  name: "";
  symbol: "";
  decimals: number;
  address: "";
}

export interface Metadata {
  name: string;
  description: string;
  content: string;
  media: Picture[];
  cover: string;
  attributes: Attribute[];
}

export interface Attribute {
  displayType: Type | null;
  traitType: Type | null;
  value: string;
  key?: string;
}

export enum Type {
  App = "app",
  Boolean = "boolean",
  DurationInSeconds = "durationInSeconds",
  Handle = "handle",
  JSON = "json",
  Location = "location",
  String = "string",
  Twitter = "twitter",
  Website = "website",
}

export interface Picture {
  original: Original;
}

export interface Original {
  url: string;
  mimeType: MIMEType | null;
}

export enum MIMEType {
  VideoMp4 = "video/mp4",
  VideoQuicktime = "video/quicktime",
}

export interface RootProfile {
  id: string;
  name: string;
  bio: null | string;
  attributes: Attribute[];
  isFollowedByMe: boolean;
  isFollowing: boolean;
  followNftAddress: string;
  metadata: string;
  isDefault: boolean;
  handle: string;
  picture: Picture;
  coverPicture: Picture | null;
  ownedBy: string;
  dispatcher: Dispatcher | null;
  stats: ProfileStats;
  followModule: Module | null;
}

export interface Dispatcher {
  address: "";
  canUseRelay: boolean;
}

export interface Module {
  type: string;
  contractAddress: string;
}

export interface ProfileStats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
}

export interface RootStats {
  totalAmountOfMirrors: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
  totalUpvotes: number;
  totalDownvotes: number;
}

export interface PageInfo {
  prev: string;
  next: string;
  totalCount: null;
}
