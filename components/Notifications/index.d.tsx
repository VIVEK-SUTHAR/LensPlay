export default interface NotificationCardProps {
	__typename?: string;
	createdAt?: Date;
	navigation: any;
	notification: Item;
	mentionPublication?: MentionedPublication;
}

export interface INotifications {
	result: Result;
}

export interface Data {
	result: Result;
}

export interface Result {
	items: Item[];
	pageInfo: PageInfo;
}

export interface Item {
	mentionPublication?: MentionedPublication;
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
	__typename?: string;
	id: string;
	stats: Stats;
	metadata: Metadata;
	profile: Profile;
	collectedBy: Wallet | null;
	createdAt: Date;
	commentOn?: CollectedPublication;
}

export interface MentionedPublication {
	__typename: string;
	collectedBy: Wallet | null;
	createdAt: Date;
	metadata: Metadata;
	profile: Profile;
	notificationId: string;
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
	__typename: string;
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
	MENTION_NOTIFICATION = "NewMentionNotification",
}
