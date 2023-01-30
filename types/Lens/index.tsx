/**
 * Profile Types For Lens APIs
 */
export interface Profile {
  id: string;
  name?: string;
  bio?: string;
  attributes?: Attribute[];
  followNftAddress?: string;
  metadata?: string;
  isDefault?: boolean;
  isFollowedByMe?: boolean;
  picture: Picture;
  handle: string;
  coverPicture?: Picture;
  ownedBy: string;
  dispatcher?: Dispatcher | null;
  stats?: Stats;
  followModule?: null;
}
export interface Dispatcher {
  address: string;
  canUseRelay: boolean;
}
export interface Attribute {
  displayType: null;
  traitType: string;
  key: string;
  value: string;
}

export interface Picture {
  original: Original;
  typename?: string;
}

export interface Original {
  url: string;
  mimeType?: null;
}

export interface Stats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
}

