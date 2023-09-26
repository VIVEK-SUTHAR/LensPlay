import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AppId: any;
  BlockchainData: any;
  BroadcastId: any;
  ChainId: any;
  ChallengeId: any;
  ContentEncryptionKey: any;
  CreateHandle: any;
  Cursor: any;
  DateTime: any;
  EncryptableDateTime: any;
  EncryptableMarkdown: any;
  EncryptableString: any;
  EncryptableTxHash: any;
  EncryptableURI: any;
  EncryptedPath: any;
  EncryptedValue: any;
  Ens: any;
  EvmAddress: any;
  Handle: any;
  ImageSizeTransform: any;
  Jwt: any;
  Locale: any;
  Markdown: any;
  MimeType: any;
  MomokaId: any;
  MomokaProof: any;
  NftGalleryId: any;
  NftGalleryName: any;
  Nonce: any;
  OnchainPublicationId: any;
  PoapEventId: any;
  ProfileId: any;
  PublicationId: any;
  Signature: any;
  TokenId: any;
  TxHash: any;
  TxId: any;
  URI: any;
  URL: any;
  UUID: any;
  UnixTimestamp: any;
  Void: any;
};

export type AccessCondition = AndCondition | CollectCondition | EoaOwnershipCondition | Erc20OwnershipCondition | FollowCondition | NftOwnershipCondition | OrCondition | ProfileOwnershipCondition;

export type ActOnOpenActionInput = {
  multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

/** The lens manager will only support FREE open action modules, if you want your unknown module allowed to be signless please contact us */
export type ActOnOpenActionLensManagerInput = {
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

export type ActOnOpenActionLensManagerRequest = {
  actOn: ActOnOpenActionLensManagerInput;
  for?: InputMaybe<Scalars['PublicationId']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActOnOpenActionRequest = {
  actOn: ActOnOpenActionInput;
  for: Scalars['PublicationId'];
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActedNotification = {
  __typename?: 'ActedNotification';
  actions: Array<OpenActionProfileActed>;
  id: Scalars['UUID'];
  publication: AnyPublication;
};

export type AlreadyInvitedCheckRequest = {
  for: Scalars['EvmAddress'];
};

export type Amount = {
  __typename?: 'Amount';
  /** The asset */
  asset: Asset;
  rate?: Maybe<FiatAmount>;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};


export type AmountRateArgs = {
  request: RateRequest;
};

export type AmountInput = {
  /** The currency */
  currency: Scalars['EvmAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type AndCondition = {
  __typename?: 'AndCondition';
  criteria: Array<AccessCondition>;
};

export type AnyPublication = Comment | Mirror | Post | Quote;

export type App = {
  __typename?: 'App';
  id: Scalars['AppId'];
};

export type ApprovedAllowanceAmountResult = {
  __typename?: 'ApprovedAllowanceAmountResult';
  allowance: Amount;
  moduleContract: NetworkAddress;
  moduleName: Scalars['String'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  currencies: Array<Scalars['EvmAddress']>;
  followModules?: InputMaybe<Array<FollowModuleType>>;
  openActionModules?: InputMaybe<Array<OpenActionModuleType>>;
  referenceModules?: InputMaybe<Array<ReferenceModuleType>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
  unknownOpenActionModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
};

export type ArticleMetadataV3 = {
  __typename?: 'ArticleMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
  /** The title of the article. Empty if not set. */
  title: Scalars['String'];
};

export type Asset = Erc20;

export type Attribute = {
  __typename?: 'Attribute';
  /** Identifier of this attribute, used for updating */
  key: Scalars['String'];
  /** The type of the attribute */
  type?: Maybe<AttributeType>;
  /** Value of the attribute */
  value: Scalars['String'];
};

export enum AttributeType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Json = 'JSON',
  Number = 'NUMBER',
  String = 'STRING'
}

export type Audio = {
  __typename?: 'Audio';
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['URI'];
};

export type AudioMetadataV3 = {
  __typename?: 'AudioMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  asset: PublicationMetadataMediaAudio;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
  /** The title of the audio. Empty if not set. */
  title: Scalars['String'];
};

export type AudioSet = {
  __typename?: 'AudioSet';
  optimized?: Maybe<Audio>;
  raw: Audio;
};

export type AuthChallengeResult = {
  __typename?: 'AuthChallengeResult';
  id: Scalars['ChallengeId'];
  /** The text that needs to be signed */
  text: Scalars['String'];
};

/** The authentication result */
export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  /** The access token */
  accessToken: Scalars['Jwt'];
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export type BlockRequest = {
  profiles: Array<Scalars['ProfileId']>;
};

export type BroadcastMomokaResult = CreateMomokaPublicationResult | RelayError;

export type BroadcastRequest = {
  id: Scalars['BroadcastId'];
  signature: Scalars['Signature'];
};

export type CanDecryptResponse = {
  __typename?: 'CanDecryptResponse';
  extraDetails?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<DecryptFailReasonType>>;
  result: Scalars['Boolean'];
};

export type ChallengeRequest = {
  /** The profile ID to initiate a challenge */
  for: Scalars['ProfileId'];
  /** The Ethereum address that will sign the challenge */
  signedBy: Scalars['EvmAddress'];
};

export type ChangeProfileManager = {
  action: ChangeProfileManagerActionType;
  address: Scalars['EvmAddress'];
};

export enum ChangeProfileManagerActionType {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type ChangeProfileManagersRequest = {
  approveLensManager?: InputMaybe<Scalars['Boolean']>;
  changeManagers?: InputMaybe<Array<ChangeProfileManager>>;
};

export type CheckingInMetadataV3 = {
  __typename?: 'CheckingInMetadataV3';
  address?: Maybe<PhysicalAddress>;
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  geographic?: Maybe<GeoLocation>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  location: Scalars['EncryptableString'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ClaimProfileRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']>;
  id: Scalars['String'];
};

export enum ClaimProfileStatusType {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED'
}

export type ClaimableProfilesResult = {
  __typename?: 'ClaimableProfilesResult';
  canMintProfileWithFreeTextHandle: Scalars['Boolean'];
  reserved: Array<ReservedClaimable>;
};

export type CollectActionModuleInput = {
  multirecipientCollectOpenAction?: InputMaybe<MultirecipientFeeCollectModuleInput>;
  simpleCollectOpenAction?: InputMaybe<SimpleCollectOpenActionModuleInput>;
};

export type CollectCondition = {
  __typename?: 'CollectCondition';
  publicationId: Scalars['PublicationId'];
  thisPublication: Scalars['Boolean'];
};

export enum CollectOpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule'
}

export type Comment = {
  __typename?: 'Comment';
  by: Profile;
  commentOn: PrimaryPublication;
  createdAt: Scalars['DateTime'];
  firstComment?: Maybe<Comment>;
  id: Scalars['PublicationId'];
  isHidden: Scalars['Boolean'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules?: Maybe<Array<OpenActionModule>>;
  operations: PublicationOperations;
  publishedOn?: Maybe<App>;
  referenceModule?: Maybe<ReferenceModule>;
  root: Post;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']>;
};


export type CommentStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type CommentNotification = {
  __typename?: 'CommentNotification';
  comment: Comment;
  id: Scalars['UUID'];
};

export enum CommentRankingFilterType {
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT'
}

export enum ComparisonOperatorConditionType {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL'
}

export type CreateActOnOpenActionBroadcastItemResult = {
  __typename?: 'CreateActOnOpenActionBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateActOnOpenActionEip712TypedData;
};

export type CreateActOnOpenActionEip712TypedData = {
  __typename?: 'CreateActOnOpenActionEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateActOnOpenActionEip712TypedDataTypes;
  /** The values */
  value: CreateActOnOpenActionEip712TypedDataValue;
};

export type CreateActOnOpenActionEip712TypedDataTypes = {
  __typename?: 'CreateActOnOpenActionEIP712TypedDataTypes';
  Act: Array<Eip712TypedDataField>;
};

export type CreateActOnOpenActionEip712TypedDataValue = {
  __typename?: 'CreateActOnOpenActionEIP712TypedDataValue';
  actionModuleAddress: Scalars['EvmAddress'];
  actionModuleData: Scalars['BlockchainData'];
  actorProfileId: Scalars['ProfileId'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  publicationActedId: Scalars['OnchainPublicationId'];
  publicationActedProfileId: Scalars['ProfileId'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateBlockProfilesBroadcastItemResult = {
  __typename?: 'CreateBlockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateBlockProfilesEip712TypedData;
};

export type CreateBlockProfilesEip712TypedData = {
  __typename?: 'CreateBlockProfilesEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateBlockProfilesEip712TypedDataTypes;
  /** The values */
  value: CreateBlockProfilesEip712TypedDataValue;
};

export type CreateBlockProfilesEip712TypedDataTypes = {
  __typename?: 'CreateBlockProfilesEIP712TypedDataTypes';
  SetBlockStatus: Array<Eip712TypedDataField>;
};

export type CreateBlockProfilesEip712TypedDataValue = {
  __typename?: 'CreateBlockProfilesEIP712TypedDataValue';
  blockStatus: Array<Scalars['Boolean']>;
  byProfileId: Scalars['ProfileId'];
  deadline: Scalars['UnixTimestamp'];
  idsOfProfilesToSetBlockStatus: Array<Scalars['ProfileId']>;
  nonce: Scalars['Nonce'];
};

export type CreateChangeProfileManagersBroadcastItemResult = {
  __typename?: 'CreateChangeProfileManagersBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateChangeProfileManagersEip712TypedData;
};

export type CreateChangeProfileManagersEip712TypedData = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateChangeProfileManagersEip712TypedDataTypes;
  /** The values */
  value: CreateChangeProfileManagersEip712TypedDataValue;
};

export type CreateChangeProfileManagersEip712TypedDataTypes = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedDataTypes';
  ChangeDelegatedExecutorsConfig: Array<Eip712TypedDataField>;
};

export type CreateChangeProfileManagersEip712TypedDataValue = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedDataValue';
  approvals: Array<Scalars['Boolean']>;
  configNumber: Scalars['Int'];
  deadline: Scalars['UnixTimestamp'];
  delegatedExecutors: Array<Scalars['EvmAddress']>;
  delegatorProfileId: Scalars['ProfileId'];
  nonce: Scalars['Nonce'];
  switchToGivenConfig: Scalars['Boolean'];
};

export type CreateFollowBroadcastItemResult = {
  __typename?: 'CreateFollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateFollowEip712TypedData;
};

/** The create follow eip 712 typed data */
export type CreateFollowEip712TypedData = {
  __typename?: 'CreateFollowEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateFollowEip712TypedDataTypes;
  /** The values */
  value: CreateFollowEip712TypedDataValue;
};

/** The create follow eip 712 typed data types */
export type CreateFollowEip712TypedDataTypes = {
  __typename?: 'CreateFollowEIP712TypedDataTypes';
  Follow: Array<Eip712TypedDataField>;
};

/** The create follow eip 712 typed data value */
export type CreateFollowEip712TypedDataValue = {
  __typename?: 'CreateFollowEIP712TypedDataValue';
  datas: Array<Scalars['BlockchainData']>;
  deadline: Scalars['UnixTimestamp'];
  followTokenIds: Array<Scalars['TokenId']>;
  followerProfileId: Scalars['ProfileId'];
  idsOfProfilesToFollow: Array<Scalars['ProfileId']>;
  nonce: Scalars['Nonce'];
};

export type CreateHandleLinkToProfileBroadcastItemResult = {
  __typename?: 'CreateHandleLinkToProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateHandleLinkToProfileEip712TypedData;
};

export type CreateHandleLinkToProfileEip712TypedData = {
  __typename?: 'CreateHandleLinkToProfileEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateHandleLinkToProfileEip712TypedDataTypes;
  /** The values */
  value: CreateHandleLinkToProfileEip712TypedDataValue;
};

export type CreateHandleLinkToProfileEip712TypedDataTypes = {
  __typename?: 'CreateHandleLinkToProfileEIP712TypedDataTypes';
  Link: Array<Eip712TypedDataField>;
};

export type CreateHandleLinkToProfileEip712TypedDataValue = {
  __typename?: 'CreateHandleLinkToProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  handleId: Scalars['TokenId'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateHandleUnlinkFromProfileBroadcastItemResult = {
  __typename?: 'CreateHandleUnlinkFromProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateHandleUnlinkFromProfileEip712TypedData;
};

export type CreateHandleUnlinkFromProfileEip712TypedData = {
  __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateHandleUnlinkFromProfileEip712TypedDataTypes;
  /** The values */
  value: CreateHandleUnlinkFromProfileEip712TypedDataValue;
};

export type CreateHandleUnlinkFromProfileEip712TypedDataTypes = {
  __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedDataTypes';
  Unlink: Array<Eip712TypedDataField>;
};

export type CreateHandleUnlinkFromProfileEip712TypedDataValue = {
  __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  handleId: Scalars['TokenId'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateLegacyCollectBroadcastItemResult = {
  __typename?: 'CreateLegacyCollectBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateActOnOpenActionEip712TypedData;
};

export type CreateMomokaCommentBroadcastItemResult = {
  __typename?: 'CreateMomokaCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateMomokaCommentEip712TypedData;
};

export type CreateMomokaCommentEip712TypedData = {
  __typename?: 'CreateMomokaCommentEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaCommentEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaCommentEip712TypedDataValue;
};

export type CreateMomokaCommentEip712TypedDataTypes = {
  __typename?: 'CreateMomokaCommentEIP712TypedDataTypes';
  Comment: Array<Eip712TypedDataField>;
};

export type CreateMomokaCommentEip712TypedDataValue = {
  __typename?: 'CreateMomokaCommentEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleData: Scalars['BlockchainData'];
  referenceModuleInitData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateMomokaMirrorBroadcastItemResult = {
  __typename?: 'CreateMomokaMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateMomokaMirrorEip712TypedData;
};

export type CreateMomokaMirrorEip712TypedData = {
  __typename?: 'CreateMomokaMirrorEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaMirrorEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaMirrorEip712TypedDataValue;
};

export type CreateMomokaMirrorEip712TypedDataTypes = {
  __typename?: 'CreateMomokaMirrorEIP712TypedDataTypes';
  Mirror: Array<Eip712TypedDataField>;
};

export type CreateMomokaMirrorEip712TypedDataValue = {
  __typename?: 'CreateMomokaMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  metadataURI: Scalars['String'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModuleData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateMomokaPostBroadcastItemResult = {
  __typename?: 'CreateMomokaPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateMomokaPostEip712TypedData;
};

export type CreateMomokaPostEip712TypedData = {
  __typename?: 'CreateMomokaPostEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaPostEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaPostEip712TypedDataValue;
};

export type CreateMomokaPostEip712TypedDataTypes = {
  __typename?: 'CreateMomokaPostEIP712TypedDataTypes';
  Post: Array<Eip712TypedDataField>;
};

export type CreateMomokaPostEip712TypedDataValue = {
  __typename?: 'CreateMomokaPostEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleInitData: Scalars['BlockchainData'];
};

export type CreateMomokaPublicationResult = {
  __typename?: 'CreateMomokaPublicationResult';
  id: Scalars['PublicationId'];
  momokaId: Scalars['MomokaId'];
  proof: Scalars['MomokaProof'];
};

export type CreateMomokaQuoteBroadcastItemResult = {
  __typename?: 'CreateMomokaQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateMomokaQuoteEip712TypedData;
};

export type CreateMomokaQuoteEip712TypedData = {
  __typename?: 'CreateMomokaQuoteEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaQuoteEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaQuoteEip712TypedDataValue;
};

export type CreateMomokaQuoteEip712TypedDataTypes = {
  __typename?: 'CreateMomokaQuoteEIP712TypedDataTypes';
  Quote: Array<Eip712TypedDataField>;
};

export type CreateMomokaQuoteEip712TypedDataValue = {
  __typename?: 'CreateMomokaQuoteEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleData: Scalars['BlockchainData'];
  referenceModuleInitData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainCommentBroadcastItemResult = {
  __typename?: 'CreateOnchainCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateOnchainCommentEip712TypedData;
};

export type CreateOnchainCommentEip712TypedData = {
  __typename?: 'CreateOnchainCommentEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainCommentEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainCommentEip712TypedDataValue;
};

export type CreateOnchainCommentEip712TypedDataTypes = {
  __typename?: 'CreateOnchainCommentEIP712TypedDataTypes';
  Comment: Array<Eip712TypedDataField>;
};

export type CreateOnchainCommentEip712TypedDataValue = {
  __typename?: 'CreateOnchainCommentEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleData: Scalars['BlockchainData'];
  referenceModuleInitData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainMirrorBroadcastItemResult = {
  __typename?: 'CreateOnchainMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateOnchainMirrorEip712TypedData;
};

export type CreateOnchainMirrorEip712TypedData = {
  __typename?: 'CreateOnchainMirrorEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainMirrorEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainMirrorEip712TypedDataValue;
};

export type CreateOnchainMirrorEip712TypedDataTypes = {
  __typename?: 'CreateOnchainMirrorEIP712TypedDataTypes';
  Mirror: Array<Eip712TypedDataField>;
};

export type CreateOnchainMirrorEip712TypedDataValue = {
  __typename?: 'CreateOnchainMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  metadataURI: Scalars['String'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModuleData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainPostBroadcastItemResult = {
  __typename?: 'CreateOnchainPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateOnchainPostEip712TypedData;
};

export type CreateOnchainPostEip712TypedData = {
  __typename?: 'CreateOnchainPostEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainPostEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainPostEip712TypedDataValue;
};

export type CreateOnchainPostEip712TypedDataTypes = {
  __typename?: 'CreateOnchainPostEIP712TypedDataTypes';
  Post: Array<Eip712TypedDataField>;
};

export type CreateOnchainPostEip712TypedDataValue = {
  __typename?: 'CreateOnchainPostEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleInitData: Scalars['BlockchainData'];
};

export type CreateOnchainQuoteBroadcastItemResult = {
  __typename?: 'CreateOnchainQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateOnchainQuoteEip712TypedData;
};

export type CreateOnchainQuoteEip712TypedData = {
  __typename?: 'CreateOnchainQuoteEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainQuoteEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainQuoteEip712TypedDataValue;
};

export type CreateOnchainQuoteEip712TypedDataTypes = {
  __typename?: 'CreateOnchainQuoteEIP712TypedDataTypes';
  Quote: Array<Eip712TypedDataField>;
};

export type CreateOnchainQuoteEip712TypedDataValue = {
  __typename?: 'CreateOnchainQuoteEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  pointedProfileId: Scalars['ProfileId'];
  pointedPubId: Scalars['OnchainPublicationId'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['EvmAddress'];
  referenceModuleData: Scalars['BlockchainData'];
  referenceModuleInitData: Scalars['BlockchainData'];
  referrerProfileIds: Array<Scalars['ProfileId']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainSetProfileMetadataBroadcastItemResult = {
  __typename?: 'CreateOnchainSetProfileMetadataBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateOnchainSetProfileMetadataEip712TypedData;
};

export type CreateOnchainSetProfileMetadataEip712TypedData = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainSetProfileMetadataEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainSetProfileMetadataEip712TypedDataValue;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataTypes = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataTypes';
  SetProfileMetadataURI: Array<Eip712TypedDataField>;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataValue = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  metadataURI: Scalars['URI'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export enum CreateProfileWithHandleErrorReasonType {
  Failed = 'FAILED',
  HandleTaken = 'HANDLE_TAKEN'
}

export type CreateProfileWithHandleErrorResult = {
  __typename?: 'CreateProfileWithHandleErrorResult';
  reason: CreateProfileWithHandleErrorReasonType;
};

export type CreateProfileWithHandleRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  handle: Scalars['CreateHandle'];
  to: Scalars['EvmAddress'];
};

export type CreateProfileWithHandleResult = CreateProfileWithHandleErrorResult | RelaySuccess;

export type CreateSetFollowModuleBroadcastItemResult = {
  __typename?: 'CreateSetFollowModuleBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateSetFollowModuleEip712TypedData;
};

export type CreateSetFollowModuleEip712TypedData = {
  __typename?: 'CreateSetFollowModuleEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateSetFollowModuleEip712TypedDataTypes;
  /** The values */
  value: CreateSetFollowModuleEip712TypedDataValue;
};

export type CreateSetFollowModuleEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataTypes';
  SetFollowModule: Array<Eip712TypedDataField>;
};

export type CreateSetFollowModuleEip712TypedDataValue = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  followModule: Scalars['EvmAddress'];
  followModuleInitData: Scalars['BlockchainData'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateUnblockProfilesBroadcastItemResult = {
  __typename?: 'CreateUnblockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateUnblockProfilesEip712TypedData;
};

export type CreateUnblockProfilesEip712TypedData = {
  __typename?: 'CreateUnblockProfilesEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateUnblockProfilesEip712TypedDataTypes;
  /** The values */
  value: CreateUnblockProfilesEip712TypedDataValue;
};

export type CreateUnblockProfilesEip712TypedDataTypes = {
  __typename?: 'CreateUnblockProfilesEIP712TypedDataTypes';
  SetBlockStatus: Array<Eip712TypedDataField>;
};

export type CreateUnblockProfilesEip712TypedDataValue = {
  __typename?: 'CreateUnblockProfilesEIP712TypedDataValue';
  blockStatus: Array<Scalars['Boolean']>;
  byProfileId: Scalars['ProfileId'];
  deadline: Scalars['UnixTimestamp'];
  idsOfProfilesToSetBlockStatus: Array<Scalars['ProfileId']>;
  nonce: Scalars['Nonce'];
};

export type CreateUnfollowBroadcastItemResult = {
  __typename?: 'CreateUnfollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The typed data */
  typedData: CreateUnfollowEip712TypedData;
};

export type CreateUnfollowEip712TypedData = {
  __typename?: 'CreateUnfollowEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateUnfollowEip712TypedDataTypes;
  /** The values */
  value: CreateUnfollowEip712TypedDataValue;
};

export type CreateUnfollowEip712TypedDataTypes = {
  __typename?: 'CreateUnfollowEIP712TypedDataTypes';
  Unfollow: Array<Eip712TypedDataField>;
};

export type CreateUnfollowEip712TypedDataValue = {
  __typename?: 'CreateUnfollowEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  idsOfProfilesToUnfollow: Array<Scalars['ProfileId']>;
  nonce: Scalars['Nonce'];
  unfollowerProfileId: Scalars['ProfileId'];
};

export enum CustomFiltersType {
  Gardeners = 'GARDENERS'
}

export enum DecryptFailReasonType {
  CanNotDecrypt = 'CAN_NOT_DECRYPT',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  NotLoggedIn = 'NOT_LOGGED_IN',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  PublicationIsNotGated = 'PUBLICATION_IS_NOT_GATED',
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE'
}

export type DegreesOfSeparationReferenceModuleInput = {
  commentsRestricted: Scalars['Boolean'];
  degreesOfSeparation: Scalars['Int'];
  mirrorsRestricted: Scalars['Boolean'];
  quotesRestricted: Scalars['Boolean'];
};

export type DegreesOfSeparationReferenceModuleSettings = {
  __typename?: 'DegreesOfSeparationReferenceModuleSettings';
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean'];
  contract: NetworkAddress;
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean'];
  /** Applied to quotes */
  quotesRestricted: Scalars['Boolean'];
};

export type DismissRecommendedProfilesRequest = {
  dismiss: Array<Scalars['ProfileId']>;
};

export type DoesFollowRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  followers: Array<Scalars['ProfileId']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type DoesFollowResult = {
  __typename?: 'DoesFollowResult';
  followerProfileId: Scalars['ProfileId'];
  status: OptimisticStatusResult;
};

/** The eip 712 typed data domain */
export type Eip712TypedDataDomain = {
  __typename?: 'EIP712TypedDataDomain';
  /** The chainId */
  chainId: Scalars['ChainId'];
  /** The name of the typed data domain */
  name: Scalars['String'];
  /** The verifying contract */
  verifyingContract: Scalars['EvmAddress'];
  /** The version */
  version: Scalars['String'];
};

/** The eip 712 typed data field */
export type Eip712TypedDataField = {
  __typename?: 'EIP712TypedDataField';
  /** The name of the typed data field */
  name: Scalars['String'];
  /** The type of the typed data field */
  type: Scalars['String'];
};

export type EmbedMetadataV3 = {
  __typename?: 'EmbedMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  embed: Scalars['EncryptableURI'];
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type EncryptableAudio = {
  __typename?: 'EncryptableAudio';
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['EncryptableURI'];
};

export type EncryptableAudioSet = {
  __typename?: 'EncryptableAudioSet';
  optimized?: Maybe<Audio>;
  raw: EncryptableAudio;
};

export type EncryptableImage = {
  __typename?: 'EncryptableImage';
  /** Height of the image */
  height?: Maybe<Scalars['Int']>;
  /** MIME type of the image */
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['EncryptableURI'];
  /** Width of the image */
  width?: Maybe<Scalars['Int']>;
};

export type EncryptableImageSet = {
  __typename?: 'EncryptableImageSet';
  optimized?: Maybe<Image>;
  raw: EncryptableImage;
  transformed?: Maybe<Image>;
};


export type EncryptableImageSetTransformedArgs = {
  request: ImageTransform;
};

export type EncryptableVideo = {
  __typename?: 'EncryptableVideo';
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['EncryptableURI'];
};

export type EncryptableVideoSet = {
  __typename?: 'EncryptableVideoSet';
  optimized?: Maybe<Video>;
  raw: EncryptableVideo;
};

export type EncryptedMedia = {
  __typename?: 'EncryptedMedia';
  altTag?: Maybe<Scalars['EncryptedValue']>;
  cover?: Maybe<Scalars['EncryptedValue']>;
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['URI'];
};

export type EnsOnchainIdentity = {
  __typename?: 'EnsOnchainIdentity';
  /** The default ens mapped to this address */
  name?: Maybe<Scalars['Ens']>;
};

export type EoaOwnershipCondition = {
  __typename?: 'EoaOwnershipCondition';
  address: Scalars['EvmAddress'];
};

/** The erc20 type */
export type Erc20 = {
  __typename?: 'Erc20';
  /** The erc20 address */
  contract: NetworkAddress;
  /** Decimal places for the token */
  decimals: Scalars['Int'];
  /** Name of the symbol */
  name: Scalars['String'];
  /** Symbol for the token */
  symbol: Scalars['String'];
};

export type Erc20OwnershipCondition = {
  __typename?: 'Erc20OwnershipCondition';
  amount: Amount;
  condition: ComparisonOperatorConditionType;
};

export type EventMetadataV3 = {
  __typename?: 'EventMetadataV3';
  address?: Maybe<PhysicalAddress>;
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  endsAt: Scalars['EncryptableDateTime'];
  geographic?: Maybe<GeoLocation>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  links?: Maybe<Array<Scalars['EncryptableURI']>>;
  locale: Scalars['Locale'];
  location: Scalars['EncryptableString'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  startsAt: Scalars['EncryptableDateTime'];
  tags?: Maybe<Array<Scalars['String']>>;
};

/** Possible sort criteria for exploring profiles */
export enum ExploreProfilesOrderByType {
  CreatedOn = 'CREATED_ON',
  LatestCreated = 'LATEST_CREATED',
  MostCollects = 'MOST_COLLECTS',
  MostComments = 'MOST_COMMENTS',
  MostFollowers = 'MOST_FOLLOWERS',
  MostMirrors = 'MOST_MIRRORS',
  MostPosts = 'MOST_POSTS',
  MostPublication = 'MOST_PUBLICATION'
}

export type ExploreProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Order criteria for exploring profiles */
  orderBy: ExploreProfilesOrderByType;
  /** Filtering criteria for exploring profiles */
  where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  /** Array of custom filters for exploring profiles */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter profiles created since the specified timestamp */
  since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type ExplorePublication = Post | Quote;

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy: ExplorePublicationsOrderByType;
  where?: InputMaybe<ExplorePublicationsWhere>;
};

export enum ExplorePublicationType {
  Post = 'POST',
  Quote = 'QUOTE'
}

export enum ExplorePublicationsOrderByType {
  Latest = 'LATEST',
  LensCurated = 'LENS_CURATED',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED'
}

export type ExplorePublicationsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<ExplorePublicationType>>;
  since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type FeeFollowModuleInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress'];
};

export type FeeFollowModuleSettings = {
  __typename?: 'FeeFollowModuleSettings';
  /** The amount info */
  amount: Amount;
  contract: NetworkAddress;
  /** The module recipient address */
  recipient: Scalars['EvmAddress'];
};

export enum FeedEventItemType {
  Acted = 'ACTED',
  Collect = 'COLLECT',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  Reaction = 'REACTION'
}

export type FeedHighlight = Post | Quote;

export type FeedHighlightWhere = {
  for?: InputMaybe<Scalars['ProfileId']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<FeedHighlightWhere>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  acted: Array<OpenActionProfileActed>;
  comments: Array<Comment>;
  id: Scalars['String'];
  mirrors: Array<Mirror>;
  reactions: Array<ReactionEvent>;
  root: PrimaryPublication;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  for?: InputMaybe<Scalars['ProfileId']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type Fiat = {
  __typename?: 'Fiat';
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type FiatAmount = {
  __typename?: 'FiatAmount';
  asset: Fiat;
  value: Scalars['String'];
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemInput>;
  profileId: Scalars['ProfileId'];
};

export type FollowCondition = {
  __typename?: 'FollowCondition';
  follow: Scalars['ProfileId'];
};

export type FollowLensManager = {
  followModule?: InputMaybe<FollowLensManagerModuleRedeemInput>;
  profileId: Scalars['ProfileId'];
};

/** The lens manager will only support FREE follow modules, if you want your unknown module allowed to be signless please contact us */
export type FollowLensManagerModuleRedeemInput = {
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export type FollowLensManagerRequest = {
  follow: Array<FollowLensManager>;
};

export type FollowModule = FeeFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings;

export type FollowModuleInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleInput>;
  freeFollowModule?: InputMaybe<Scalars['Boolean']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  feeFollowModule?: InputMaybe<Scalars['Boolean']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export enum FollowModuleType {
  FeeFollowModule = 'FeeFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule'
}

export type FollowNotification = {
  __typename?: 'FollowNotification';
  followers: Array<Profile>;
  id: Scalars['UUID'];
};

export type FollowOnlyReferenceModuleSettings = {
  __typename?: 'FollowOnlyReferenceModuleSettings';
  contract: NetworkAddress;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowRevenueRequest = {
  for: Scalars['ProfileId'];
};

export type FollowRevenueResult = {
  __typename?: 'FollowRevenueResult';
  revenues: Array<RevenueAggregate>;
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  of: Scalars['ProfileId'];
};

export type FollowingRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type FraudReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  allowance: AmountInput;
  module: ModuleCurrencyApproval;
};

export type GenerateModuleCurrencyApprovalResult = {
  __typename?: 'GenerateModuleCurrencyApprovalResult';
  data: Scalars['BlockchainData'];
  from: Scalars['EvmAddress'];
  to: Scalars['EvmAddress'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  /** `null` when `rawURI` is encrypted */
  latitude?: Maybe<Scalars['Float']>;
  /** `null` when `rawURI` is encrypted */
  longitude?: Maybe<Scalars['Float']>;
  /** The raw Geo URI of the location. If encrypted `latitude` and `longitude` will be `null` */
  rawURI: Scalars['EncryptableURI'];
};

export type GetProfileMetadataArgs = {
  /** The app id to query the profile's metadata */
  appId?: InputMaybe<Scalars['AppId']>;
  /** If true, will fallback to global profile metadata, if there is no metadata set for that specific app id */
  useFallback?: InputMaybe<Scalars['Boolean']>;
};

export type HandleLinkToProfileRequest = {
  handle: Scalars['Handle'];
};

export type HandleResult = {
  __typename?: 'HandleResult';
  handle: Scalars['Handle'];
};

export type HandleUnlinkFromProfileRequest = {
  handle: Scalars['Handle'];
};

export type HidePublicationRequest = {
  for: Scalars['PublicationId'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS'
}

export type IllegalReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type Image = {
  __typename?: 'Image';
  /** Height of the image */
  height?: Maybe<Scalars['Int']>;
  /** MIME type of the image */
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['URI'];
  /** Width of the image */
  width?: Maybe<Scalars['Int']>;
};

export type ImageMetadataV3 = {
  __typename?: 'ImageMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  asset: PublicationMetadataMediaImage;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
  /** The title of the image. Empty if not set. */
  title: Scalars['String'];
};

export type ImageSet = {
  __typename?: 'ImageSet';
  optimized?: Maybe<Image>;
  raw: Image;
  transformed?: Maybe<Image>;
};


export type ImageSetTransformedArgs = {
  request: ImageTransform;
};

export type ImageTransform = {
  /** Set the transformed image's height */
  height?: InputMaybe<Scalars['ImageSizeTransform']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  keepAspectRatio?: InputMaybe<Scalars['Boolean']>;
  /** Set the transformed image's width */
  width?: InputMaybe<Scalars['ImageSizeTransform']>;
};

export type InviteRequest = {
  invites: Array<Scalars['EvmAddress']>;
  secret: Scalars['String'];
};

export type InvitedResult = {
  __typename?: 'InvitedResult';
  by: Scalars['EvmAddress'];
  profileMinted?: Maybe<Profile>;
  when: Scalars['DateTime'];
};

export type KnownCollectOpenActionResult = {
  __typename?: 'KnownCollectOpenActionResult';
  type: CollectOpenActionModuleType;
};

export type KnownSupportedModule = {
  __typename?: 'KnownSupportedModule';
  contract: NetworkAddress;
  moduleInput: Array<ModuleInfo>;
  moduleName: Scalars['String'];
  redeemInput: Array<ModuleInfo>;
  returnDataInput: Array<ModuleInfo>;
};

export type LegacyAaveFeeCollectModuleSettings = {
  __typename?: 'LegacyAaveFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress'];
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float'];
};

export type LegacyAudioItem = {
  __typename?: 'LegacyAudioItem';
  /** Alternative text for the audio */
  altTag?: Maybe<Scalars['String']>;
  audio: AudioSet;
  cover?: Maybe<ImageSet>;
};

export type LegacyCollectRequest = {
  on: Scalars['PublicationId'];
  referrer?: InputMaybe<Scalars['PublicationId']>;
};

export type LegacyErc4626FeeCollectModuleSettings = {
  __typename?: 'LegacyERC4626FeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** The recipient of the ERC4626 vault shares */
  recipient: Scalars['EvmAddress'];
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float'];
  /** The ERC4626 vault address */
  vault: NetworkAddress;
};

export type LegacyFeeCollectModuleSettings = {
  __typename?: 'LegacyFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LegacyFreeCollectModuleSettings = {
  __typename?: 'LegacyFreeCollectModuleSettings';
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type LegacyImageItem = {
  __typename?: 'LegacyImageItem';
  /** Alternative text for the image */
  altTag?: Maybe<Scalars['String']>;
  image: ImageSet;
};

export type LegacyLimitedFeeCollectModuleSettings = {
  __typename?: 'LegacyLimitedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect module limit. */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LegacyLimitedTimedFeeCollectModuleSettings = {
  __typename?: 'LegacyLimitedTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect module limit */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LegacyMediaItem = LegacyAudioItem | LegacyImageItem | LegacyVideoItem;

export type LegacyMultirecipientFeeCollectModuleSettings = {
  __typename?: 'LegacyMultirecipientFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  recipients: Array<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float'];
};

export type LegacyPublicationMetadata = {
  __typename?: 'LegacyPublicationMetadata';
  appId?: Maybe<Scalars['AppId']>;
  /**
   * Always defined with `mainContentFocus` value(s): `ARTICLE`, `LINK`, `TEXT_ONLY`.
   * Empty string if not set.
   *
   * If encrypted it contains a placeholder human readable text
   */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataV2Encryption>;
  id: Scalars['String'];
  locale: Scalars['Locale'];
  /** This is provided for backwards compatibility with legacy v1 and v2 publications. For new publications the nature of the content is explicit in their type. With new publications you SHOULD use __typename to discriminate specific fields. */
  mainContentFocus: LegacyPublicationMetadataMainFocusType;
  marketplace?: Maybe<MarketplaceMetadata>;
  /**
   * Depends on `mainContentFocus`
   *
   * - Not empty for: `AUDIO`, `IMAGE`, `VIDEO`
   * - `null` for `TEXT_ONLY`
   * - Optional otherwise.
   */
  media?: Maybe<Array<LegacyMediaItem>>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export enum LegacyPublicationMetadataMainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO'
}

export type LegacyRevertCollectModuleSettings = {
  __typename?: 'LegacyRevertCollectModuleSettings';
  contract: NetworkAddress;
};

export type LegacySimpleCollectModuleSettings = {
  __typename?: 'LegacySimpleCollectModuleSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LegacyTimedFeeCollectModuleSettings = {
  __typename?: 'LegacyTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LegacyVideoItem = {
  __typename?: 'LegacyVideoItem';
  /** Alternative text for the video */
  altTag?: Maybe<Scalars['String']>;
  cover?: Maybe<ImageSet>;
  video: VideoSet;
};

export type LensProfileManagerRelayError = {
  __typename?: 'LensProfileManagerRelayError';
  reason: LensProfileManagerRelayErrorReasonType;
};

export enum LensProfileManagerRelayErrorReasonType {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Failed = 'FAILED',
  NoLensManagerEnabled = 'NO_LENS_MANAGER_ENABLED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE'
}

export type LensProfileManagerRelayResult = LensProfileManagerRelayError | RelaySuccess;

export enum LensTransactionFailureType {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED'
}

export type LensTransactionResult = {
  __typename?: 'LensTransactionResult';
  extraInfo?: Maybe<Scalars['String']>;
  reason?: Maybe<LensTransactionFailureType>;
  status: LensTransactionStatusType;
  txHash: Scalars['TxHash'];
};

export type LensTransactionStatusRequest = {
  /** Transaction hash for retrieving transaction status */
  forTxHash?: InputMaybe<Scalars['TxHash']>;
  /** Transaction ID for retrieving transaction status when using the broadcaster */
  forTxId?: InputMaybe<Scalars['TxId']>;
};

export enum LensTransactionStatusType {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  OptimisticallyUpdated = 'OPTIMISTICALLY_UPDATED',
  Processing = 'PROCESSING'
}

export enum LimitType {
  Fifty = 'Fifty',
  Ten = 'Ten',
  TwentyFive = 'TwentyFive'
}

export type LinkMetadataV3 = {
  __typename?: 'LinkMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  sharingLink: Scalars['EncryptableURI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type LiveStreamMetadataV3 = {
  __typename?: 'LiveStreamMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  checkLiveAPI?: Maybe<Scalars['EncryptableURI']>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  /** Optional end time. Empty if not set. */
  endsAt: Scalars['EncryptableDateTime'];
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  liveURL: Scalars['EncryptableURI'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  playbackURL: Scalars['EncryptableURI'];
  rawURI: Scalars['URI'];
  startsAt: Scalars['EncryptableDateTime'];
  tags?: Maybe<Array<Scalars['String']>>;
  /** The title of the live-stream. Empty if not set. */
  title: Scalars['String'];
};

export type MarketplaceMetadata = {
  __typename?: 'MarketplaceMetadata';
  animationUrl?: Maybe<Scalars['URI']>;
  attributes?: Maybe<Array<PublicationMarketplaceMetadataAttribute>>;
  description?: Maybe<Scalars['Markdown']>;
  externalURL?: Maybe<Scalars['URL']>;
  image?: Maybe<ImageSet>;
  name?: Maybe<Scalars['String']>;
};

export enum MarketplaceMetadataAttributeDisplayType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING'
}

export type MentionNotification = {
  __typename?: 'MentionNotification';
  id: Scalars['UUID'];
  publication: PrimaryPublication;
};

export type MintMetadataV3 = {
  __typename?: 'MintMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  mintLink: Scalars['EncryptableURI'];
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Mirror = {
  __typename?: 'Mirror';
  by: Profile;
  createdAt: Scalars['DateTime'];
  id: Scalars['PublicationId'];
  isHidden: Scalars['Boolean'];
  mirrorOn: MirrorablePublication;
  momoka?: Maybe<MomokaInfo>;
  publishedOn?: Maybe<App>;
  txHash?: Maybe<Scalars['TxHash']>;
};

export type MirrorNotification = {
  __typename?: 'MirrorNotification';
  id: Scalars['UUID'];
  mirrors: Array<ProfileMirrorResult>;
  publication: PrimaryPublication;
};

export type MirrorablePublication = Comment | Post | Quote;

export type ModuleCurrencyApproval = {
  followModule?: InputMaybe<FollowModuleType>;
  openActionModule?: InputMaybe<OpenActionModuleType>;
  referenceModule?: InputMaybe<ReferenceModuleType>;
  unknownFollowModule?: InputMaybe<Scalars['EvmAddress']>;
  unknownOpenActionModule?: InputMaybe<Scalars['EvmAddress']>;
  unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']>;
};

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type MomokaCommentRequest = {
  commentOn: Scalars['PublicationId'];
  contentURI: Scalars['URI'];
};

export type MomokaCommentTransaction = {
  __typename?: 'MomokaCommentTransaction';
  app?: Maybe<App>;
  commentOn: PrimaryPublication;
  createdAt: Scalars['DateTime'];
  publication: Comment;
  submitter: Scalars['EvmAddress'];
  transactionId: Scalars['String'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaInfo = {
  __typename?: 'MomokaInfo';
  proof: Scalars['MomokaProof'];
};

export type MomokaMirrorRequest = {
  mirrorOn: Scalars['PublicationId'];
};

export type MomokaMirrorTransaction = {
  __typename?: 'MomokaMirrorTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime'];
  mirrorOn: PrimaryPublication;
  publication: Mirror;
  submitter: Scalars['EvmAddress'];
  transactionId: Scalars['String'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaPostRequest = {
  contentURI: Scalars['URI'];
};

export type MomokaPostTransaction = {
  __typename?: 'MomokaPostTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime'];
  publication: Post;
  submitter: Scalars['EvmAddress'];
  transactionId: Scalars['String'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaQuoteRequest = {
  contentURI: Scalars['URI'];
  quoteOn: Scalars['PublicationId'];
};

export type MomokaQuoteTransaction = {
  __typename?: 'MomokaQuoteTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime'];
  publication: Quote;
  quoteOn: PrimaryPublication;
  submitter: Scalars['EvmAddress'];
  transactionId: Scalars['String'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaSubmitterResult = {
  __typename?: 'MomokaSubmitterResult';
  address: Scalars['EvmAddress'];
  name: Scalars['String'];
  totalTransactions: Scalars['Int'];
};

export type MomokaSubmittersResult = {
  __typename?: 'MomokaSubmittersResult';
  items: Array<MomokaSubmitterResult>;
  pageInfo: PaginatedResultInfo;
};

export type MomokaSummaryResult = {
  __typename?: 'MomokaSummaryResult';
  totalTransactions: Scalars['Int'];
};

export type MomokaTransaction = MomokaCommentTransaction | MomokaMirrorTransaction | MomokaPostTransaction | MomokaQuoteTransaction;

export type MomokaTransactionRequest = {
  /** The momoka transaction id or internal publication id */
  for: Scalars['String'];
};

export type MomokaTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for?: InputMaybe<Scalars['ProfileId']>;
  limit?: InputMaybe<LimitType>;
};

export type MomokaTransactionsResult = {
  __typename?: 'MomokaTransactionsResult';
  items: Array<MomokaTransaction>;
  pageInfo: PaginatedResultInfo;
};

export enum MomokaValidatorError {
  BlockCantBeReadFromNode = 'BLOCK_CANT_BE_READ_FROM_NODE',
  BlockTooFar = 'BLOCK_TOO_FAR',
  CanNotConnectToBundlr = 'CAN_NOT_CONNECT_TO_BUNDLR',
  ChainSignatureAlreadyUsed = 'CHAIN_SIGNATURE_ALREADY_USED',
  DataCantBeReadFromNode = 'DATA_CANT_BE_READ_FROM_NODE',
  EventMismatch = 'EVENT_MISMATCH',
  GeneratedPublicationIdMismatch = 'GENERATED_PUBLICATION_ID_MISMATCH',
  InvalidEventTimestamp = 'INVALID_EVENT_TIMESTAMP',
  InvalidFormattedTypedData = 'INVALID_FORMATTED_TYPED_DATA',
  InvalidPointerSetNotNeeded = 'INVALID_POINTER_SET_NOT_NEEDED',
  InvalidSignatureSubmitter = 'INVALID_SIGNATURE_SUBMITTER',
  InvalidTxId = 'INVALID_TX_ID',
  InvalidTypedDataDeadlineTimestamp = 'INVALID_TYPED_DATA_DEADLINE_TIMESTAMP',
  NotClosestBlock = 'NOT_CLOSEST_BLOCK',
  NoSignatureSubmitter = 'NO_SIGNATURE_SUBMITTER',
  PointerFailedVerification = 'POINTER_FAILED_VERIFICATION',
  PotentialReorg = 'POTENTIAL_REORG',
  PublicationNonceInvalid = 'PUBLICATION_NONCE_INVALID',
  PublicationNoneDa = 'PUBLICATION_NONE_DA',
  PublicationNoPointer = 'PUBLICATION_NO_POINTER',
  PublicationSignerNotAllowed = 'PUBLICATION_SIGNER_NOT_ALLOWED',
  SimulationFailed = 'SIMULATION_FAILED',
  SimulationNodeCouldNotRun = 'SIMULATION_NODE_COULD_NOT_RUN',
  TimestampProofInvalidDaId = 'TIMESTAMP_PROOF_INVALID_DA_ID',
  TimestampProofInvalidSignature = 'TIMESTAMP_PROOF_INVALID_SIGNATURE',
  TimestampProofInvalidType = 'TIMESTAMP_PROOF_INVALID_TYPE',
  TimestampProofNotSubmitter = 'TIMESTAMP_PROOF_NOT_SUBMITTER',
  Unknown = 'UNKNOWN'
}

export type MomokaVerificationStatus = MomokaVerificationStatusFailure | MomokaVerificationStatusSuccess;

export type MomokaVerificationStatusFailure = {
  __typename?: 'MomokaVerificationStatusFailure';
  status: MomokaValidatorError;
};

export type MomokaVerificationStatusSuccess = {
  __typename?: 'MomokaVerificationStatusSuccess';
  verified: Scalars['Boolean'];
};

export type MultirecipientFeeCollectModuleInput = {
  amount: AmountInput;
  collectLimit?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['DateTime']>;
  followerOnly?: InputMaybe<Scalars['Boolean']>;
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']>;
};

export type MultirecipientFeeCollectOpenActionSettings = {
  __typename?: 'MultirecipientFeeCollectOpenActionSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  recipients: Array<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  actOnOpenAction: LensProfileManagerRelayResult;
  addProfileInterests?: Maybe<Scalars['Void']>;
  addPublicationBookmark?: Maybe<Scalars['Void']>;
  addPublicationNotInterested?: Maybe<Scalars['Void']>;
  addReaction?: Maybe<Scalars['Void']>;
  authenticate: AuthenticationResult;
  block: LensProfileManagerRelayResult;
  broadcastOnMomoka: BroadcastMomokaResult;
  broadcastOnchain: RelayResult;
  claimProfile: CreateProfileWithHandleResult;
  commentOnMomoka: RelayMomokaResult;
  commentOnchain: LensProfileManagerRelayResult;
  createActOnOpenActionTypedData: CreateActOnOpenActionBroadcastItemResult;
  createBlockProfilesTypedData: CreateBlockProfilesBroadcastItemResult;
  createChangeProfileManagersTypedData: CreateChangeProfileManagersBroadcastItemResult;
  createFollowTypedData: CreateFollowBroadcastItemResult;
  createHandleLinkToProfileTypedData: CreateHandleLinkToProfileBroadcastItemResult;
  createHandleUnlinkFromProfileTypedData: CreateHandleUnlinkFromProfileBroadcastItemResult;
  createLegacyCollectTypedData: CreateLegacyCollectBroadcastItemResult;
  createMomokaCommentTypedData: CreateMomokaCommentBroadcastItemResult;
  createMomokaMirrorTypedData: CreateMomokaMirrorBroadcastItemResult;
  createMomokaPostTypedData: CreateMomokaPostBroadcastItemResult;
  createMomokaQuoteTypedData: CreateMomokaQuoteBroadcastItemResult;
  createNftGallery: Scalars['NftGalleryId'];
  createOnchainCommentTypedData: CreateOnchainCommentBroadcastItemResult;
  createOnchainMirrorTypedData: CreateOnchainMirrorBroadcastItemResult;
  createOnchainPostTypedData: CreateOnchainPostBroadcastItemResult;
  createOnchainQuoteTypedData: CreateOnchainQuoteBroadcastItemResult;
  createOnchainSetProfileMetadataTypedData: CreateOnchainSetProfileMetadataBroadcastItemResult;
  createProfileWithHandle: CreateProfileWithHandleResult;
  createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  createUnblockProfilesTypedData: CreateUnblockProfilesBroadcastItemResult;
  createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  deleteNftGallery?: Maybe<Scalars['Void']>;
  dismissRecommendedProfiles?: Maybe<Scalars['Void']>;
  follow: LensProfileManagerRelayResult;
  handleLinkToProfile: LensProfileManagerRelayResult;
  handleUnlinkFromProfile: LensProfileManagerRelayResult;
  hidePublication?: Maybe<Scalars['Void']>;
  idKitPhoneVerifyWebhook: IdKitPhoneVerifyWebhookResultStatusType;
  inviteProfile?: Maybe<Scalars['Void']>;
  legacyCollect: LensProfileManagerRelayResult;
  mirrorOnMomoka: RelayMomokaResult;
  mirrorOnchain: LensProfileManagerRelayResult;
  nftOwnershipChallenge: NftOwnershipChallengeResult;
  postOnMomoka: RelayMomokaResult;
  postOnchain: LensProfileManagerRelayResult;
  quoteOnMomoka: RelayMomokaResult;
  quoteOnchain: LensProfileManagerRelayResult;
  refresh: AuthenticationResult;
  refreshPublicationMetadata: RefreshPublicationMetadataResult;
  removeProfileInterests?: Maybe<Scalars['Void']>;
  removePublicationBookmark?: Maybe<Scalars['Void']>;
  removeReaction?: Maybe<Scalars['Void']>;
  reportPublication?: Maybe<Scalars['Void']>;
  setFollowModule: LensProfileManagerRelayResult;
  setProfileMetadata: LensProfileManagerRelayResult;
  unblock: LensProfileManagerRelayResult;
  undoPublicationNotInterested?: Maybe<Scalars['Void']>;
  unfollow: LensProfileManagerRelayResult;
  updateNftGalleryInfo?: Maybe<Scalars['Void']>;
  updateNftGalleryItems?: Maybe<Scalars['Void']>;
  updateNftGalleryOrder?: Maybe<Scalars['Void']>;
};


export type MutationActOnOpenActionArgs = {
  request: ActOnOpenActionLensManagerRequest;
};


export type MutationAddProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};


export type MutationAddPublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};


export type MutationAddPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};


export type MutationAddReactionArgs = {
  request: ReactionRequest;
};


export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};


export type MutationBlockArgs = {
  request: BlockRequest;
};


export type MutationBroadcastOnMomokaArgs = {
  request: BroadcastRequest;
};


export type MutationBroadcastOnchainArgs = {
  request: BroadcastRequest;
};


export type MutationClaimProfileArgs = {
  request: ClaimProfileRequest;
};


export type MutationCommentOnMomokaArgs = {
  request: MomokaCommentRequest;
};


export type MutationCommentOnchainArgs = {
  request: OnchainCommentRequest;
};


export type MutationCreateActOnOpenActionTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ActOnOpenActionRequest;
};


export type MutationCreateBlockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: BlockRequest;
};


export type MutationCreateChangeProfileManagersTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ChangeProfileManagersRequest;
};


export type MutationCreateFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: FollowRequest;
};


export type MutationCreateHandleLinkToProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: HandleLinkToProfileRequest;
};


export type MutationCreateHandleUnlinkFromProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: HandleUnlinkFromProfileRequest;
};


export type MutationCreateLegacyCollectTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: LegacyCollectRequest;
};


export type MutationCreateMomokaCommentTypedDataArgs = {
  request: MomokaCommentRequest;
};


export type MutationCreateMomokaMirrorTypedDataArgs = {
  request: MomokaMirrorRequest;
};


export type MutationCreateMomokaPostTypedDataArgs = {
  request: MomokaPostRequest;
};


export type MutationCreateMomokaQuoteTypedDataArgs = {
  request: MomokaQuoteRequest;
};


export type MutationCreateNftGalleryArgs = {
  request: NftGalleryCreateRequest;
};


export type MutationCreateOnchainCommentTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainCommentRequest;
};


export type MutationCreateOnchainMirrorTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainMirrorRequest;
};


export type MutationCreateOnchainPostTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainPostRequest;
};


export type MutationCreateOnchainQuoteTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainQuoteRequest;
};


export type MutationCreateOnchainSetProfileMetadataTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainSetProfileMetadataRequest;
};


export type MutationCreateProfileWithHandleArgs = {
  request: CreateProfileWithHandleRequest;
};


export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: SetFollowModuleRequest;
};


export type MutationCreateUnblockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnblockRequest;
};


export type MutationCreateUnfollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnfollowRequest;
};


export type MutationDeleteNftGalleryArgs = {
  request: NftGalleryDeleteRequest;
};


export type MutationDismissRecommendedProfilesArgs = {
  request: DismissRecommendedProfilesRequest;
};


export type MutationFollowArgs = {
  request: FollowLensManagerRequest;
};


export type MutationHandleLinkToProfileArgs = {
  request: HandleLinkToProfileRequest;
};


export type MutationHandleUnlinkFromProfileArgs = {
  request: HandleUnlinkFromProfileRequest;
};


export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};


export type MutationIdKitPhoneVerifyWebhookArgs = {
  request: IdKitPhoneVerifyWebhookRequest;
};


export type MutationInviteProfileArgs = {
  request: InviteRequest;
};


export type MutationLegacyCollectArgs = {
  request: LegacyCollectRequest;
};


export type MutationMirrorOnMomokaArgs = {
  request: MomokaMirrorRequest;
};


export type MutationMirrorOnchainArgs = {
  request: OnchainMirrorRequest;
};


export type MutationNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};


export type MutationPostOnMomokaArgs = {
  request: MomokaPostRequest;
};


export type MutationPostOnchainArgs = {
  request: OnchainPostRequest;
};


export type MutationQuoteOnMomokaArgs = {
  request: MomokaQuoteRequest;
};


export type MutationQuoteOnchainArgs = {
  request: OnchainQuoteRequest;
};


export type MutationRefreshArgs = {
  request: RefreshRequest;
};


export type MutationRefreshPublicationMetadataArgs = {
  request: RefreshPublicationMetadataRequest;
};


export type MutationRemoveProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};


export type MutationRemovePublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};


export type MutationRemoveReactionArgs = {
  request: ReactionRequest;
};


export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};


export type MutationSetFollowModuleArgs = {
  request: SetFollowModuleRequest;
};


export type MutationSetProfileMetadataArgs = {
  request: OnchainSetProfileMetadataRequest;
};


export type MutationUnblockArgs = {
  request: UnblockRequest;
};


export type MutationUndoPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};


export type MutationUnfollowArgs = {
  request: UnfollowRequest;
};


export type MutationUpdateNftGalleryInfoArgs = {
  request: NftGalleryUpdateInfoRequest;
};


export type MutationUpdateNftGalleryItemsArgs = {
  request: NftGalleryUpdateItemsRequest;
};


export type MutationUpdateNftGalleryOrderArgs = {
  request: NftGalleryUpdateItemOrderRequest;
};

export type MutualFollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId'];
  viewing: Scalars['ProfileId'];
};

/** Mutual NFT collections request */
export type MutualNftCollectionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Profile id of the first user */
  observer: Scalars['ProfileId'];
  /** Profile id of the second user */
  viewing: Scalars['ProfileId'];
};

export type MutualPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId'];
  viewing: Scalars['ProfileId'];
};

export type NetworkAddress = {
  __typename?: 'NetworkAddress';
  address: Scalars['EvmAddress'];
  chainId: Scalars['ChainId'];
};

export type NetworkAddressInput = {
  address: Scalars['EvmAddress'];
  chainId: Scalars['ChainId'];
};

export type Nft = {
  __typename?: 'Nft';
  collection: NftCollection;
  contentURI: Scalars['URI'];
  contract: NetworkAddress;
  contractType: NftContractType;
  metadata: NftMetadata;
  owner: Owner;
  tokenId: Scalars['TokenId'];
  totalSupply: Scalars['String'];
};

/** Nft Collection type */
export type NftCollection = {
  __typename?: 'NftCollection';
  /** Collection base URI for token metadata */
  baseUri?: Maybe<Scalars['URI']>;
  /** The contract info, address and chain id */
  contract: NetworkAddress;
  /** Collection ERC type */
  contractType: NftContractType;
  /** Collection name */
  name: Scalars['String'];
  /** Collection symbol */
  symbol: Scalars['String'];
  /** Collection verified status */
  verified: Scalars['Boolean'];
};

export enum NftCollectionOwnersOrder {
  FollowersFirst = 'FollowersFirst',
  None = 'None'
}

/** NFT collection owners request */
export type NftCollectionOwnersRequest = {
  /** The profile id to use when ordering by followers */
  by?: InputMaybe<Scalars['ProfileId']>;
  /** The chain id */
  chainId: Scalars['ChainId'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The contract address */
  for: Scalars['EvmAddress'];
  limit?: InputMaybe<LimitType>;
  /** The ordering of Nft collection owners */
  order?: InputMaybe<NftCollectionOwnersOrder>;
};

/** A wrapper object containing an Nft collection, the total number of Lens profiles that own it, and optional field resolvers */
export type NftCollectionWithOwners = {
  __typename?: 'NftCollectionWithOwners';
  /** The Nft collection */
  collection: NftCollection;
  /** The total number of Lens profile owners that have at least 1 NFT from this collection */
  totalOwners: Scalars['Float'];
};

/** NFT collections request */
export type NftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  for?: InputMaybe<Scalars['ProfileId']>;
  /** Filter by owner address */
  forAddress?: InputMaybe<Scalars['EvmAddress']>;
  limit?: InputMaybe<LimitType>;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export type NftGalleriesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type NftGallery = {
  __typename?: 'NftGallery';
  createdAt: Scalars['DateTime'];
  id: Scalars['NftGalleryId'];
  items: Array<Nft>;
  name: Scalars['NftGalleryName'];
  owner: Scalars['ProfileId'];
  updatedAt: Scalars['DateTime'];
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['NftGalleryName'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId'];
  name: Scalars['NftGalleryName'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId'];
  updates?: InputMaybe<Array<NftUpdateItemOrder>>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftImage = {
  __typename?: 'NftImage';
  /** The contract address of the NFT collection */
  collection: NetworkAddress;
  /** The image set for the NFT */
  image: ImageSet;
  /** The token ID of the NFT */
  tokenId: Scalars['TokenId'];
  /** Indicates whether the NFT is from a verified collection or not */
  verified: Scalars['Boolean'];
};

export type NftInput = {
  contract: NetworkAddressInput;
  tokenId: Scalars['TokenId'];
};

export type NftMetadata = {
  __typename?: 'NftMetadata';
  animationUrl?: Maybe<Scalars['URI']>;
  attributes?: Maybe<Array<PublicationMarketplaceMetadataAttribute>>;
  description?: Maybe<Scalars['Markdown']>;
  externalURL?: Maybe<Scalars['URL']>;
  image?: Maybe<ImageSet>;
  name?: Maybe<Scalars['String']>;
};

export type NftOwnershipChallengeRequest = {
  for: Scalars['EvmAddress'];
  nfts: Array<NftInput>;
};

export type NftOwnershipChallengeResult = {
  __typename?: 'NftOwnershipChallengeResult';
  info?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type NftOwnershipCondition = {
  __typename?: 'NftOwnershipCondition';
  contract: NetworkAddress;
  contractType: NftContractType;
  tokenIds?: Maybe<Array<Scalars['TokenId']>>;
};

export type NftUpdateItemOrder = {
  contract: NetworkAddressInput;
  newOrder: Scalars['Int'];
  tokenId: Scalars['TokenId'];
};

export type NftsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<NftsRequestWhere>;
};

export type NftsRequestWhere = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  excludeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Exclude follower NFTs from the search */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  forAddress?: InputMaybe<Scalars['EvmAddress']>;
  /** Profile ID of the owner */
  forProfileId?: InputMaybe<Scalars['ProfileId']>;
  includeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Search query. Has to be part of a collection name */
  query?: InputMaybe<Scalars['String']>;
};

export type Notification = ActedNotification | CommentNotification | FollowNotification | MentionNotification | MirrorNotification | QuoteNotification | ReactionNotification;

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  where?: InputMaybe<NotificationWhere>;
};

export type NotificationSubscriptionRequest = {
  for: Scalars['ProfileId'];
};

export enum NotificationType {
  Acted = 'ACTED',
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Mentioned = 'MENTIONED',
  Mirrored = 'MIRRORED',
  Quoted = 'QUOTED',
  Reacted = 'REACTED'
}

export type NotificationWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type OnchainCommentRequest = {
  commentOn: Scalars['PublicationId'];
  commentOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  metadataURI?: InputMaybe<Scalars['URI']>;
  mirrorOn: Scalars['PublicationId'];
  mirrorReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainPostRequest = {
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type OnchainQuoteRequest = {
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  quoteOn: Scalars['PublicationId'];
  quoteOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainReferrer = {
  profileId?: InputMaybe<Scalars['ProfileId']>;
  publicationId?: InputMaybe<Scalars['PublicationId']>;
};

export type OnchainSetProfileMetadataRequest = {
  metadataURI: Scalars['URI'];
};

export enum OpenActionCategoryType {
  Collect = 'COLLECT'
}

export type OpenActionFilter = {
  address?: InputMaybe<Scalars['EvmAddress']>;
  category?: InputMaybe<OpenActionCategoryType>;
  type?: InputMaybe<OpenActionModuleType>;
};

export type OpenActionModule = LegacyAaveFeeCollectModuleSettings | LegacyErc4626FeeCollectModuleSettings | LegacyFeeCollectModuleSettings | LegacyFreeCollectModuleSettings | LegacyLimitedFeeCollectModuleSettings | LegacyLimitedTimedFeeCollectModuleSettings | LegacyMultirecipientFeeCollectModuleSettings | LegacyRevertCollectModuleSettings | LegacySimpleCollectModuleSettings | LegacyTimedFeeCollectModuleSettings | MultirecipientFeeCollectOpenActionSettings | SimpleCollectOpenActionSettings | UnknownOpenActionModuleSettings;

export type OpenActionModuleInput = {
  collectOpenAction?: InputMaybe<CollectActionModuleInput>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionModuleInput>;
};

export enum OpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule'
}

export type OpenActionProfileActed = {
  __typename?: 'OpenActionProfileActed';
  actedAt: Scalars['DateTime'];
  action: OpenActionResult;
  by: Profile;
};

export type OpenActionResult = KnownCollectOpenActionResult | UnknownOpenActionResult;

export type OptimisticStatusResult = {
  __typename?: 'OptimisticStatusResult';
  isFinalisedOnchain: Scalars['Boolean'];
  value: Scalars['Boolean'];
};

export type OrCondition = {
  __typename?: 'OrCondition';
  criteria: Array<AccessCondition>;
};

export type OwnedHandlesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve owned handles */
  for: Scalars['EvmAddress'];
  limit?: InputMaybe<LimitType>;
};

export type Owner = {
  __typename?: 'Owner';
  address: Scalars['EvmAddress'];
  amount: Scalars['String'];
};

export type PaginatedCurrenciesResult = {
  __typename?: 'PaginatedCurrenciesResult';
  items: Array<Erc20>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedExplorePublicationResult = {
  __typename?: 'PaginatedExplorePublicationResult';
  items: Array<ExplorePublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedHighlightsResult = {
  __typename?: 'PaginatedFeedHighlightsResult';
  items: Array<FeedHighlight>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedResult = {
  __typename?: 'PaginatedFeedResult';
  items: Array<FeedItem>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedHandlesResult = {
  __typename?: 'PaginatedHandlesResult';
  items: Array<HandleResult>;
  pageInfo: PaginatedResultInfo;
};

/** Nft collections paginated result */
export type PaginatedNftCollectionsResult = {
  __typename?: 'PaginatedNftCollectionsResult';
  items: Array<NftCollection>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNftGalleriesResult = {
  __typename?: 'PaginatedNftGalleriesResult';
  items: Array<NftGallery>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNftsResult = {
  __typename?: 'PaginatedNftsResult';
  items: Array<Nft>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNotificationResult = {
  __typename?: 'PaginatedNotificationResult';
  items: Array<Notification>;
  pageInfo: PaginatedResultInfo;
};

/** Pagination with Offset fields  */
export type PaginatedOffsetRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

/** The paginated Poap Events result */
export type PaginatedPoapEventResult = {
  __typename?: 'PaginatedPoapEventResult';
  items: Array<PoapEvent>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated Poap Token Results */
export type PaginatedPoapTokenResult = {
  __typename?: 'PaginatedPoapTokenResult';
  items: Array<PoapToken>;
  pageInfo: PaginatedResultInfo;
};

/** Popular Nft collections paginated result */
export type PaginatedPopularNftCollectionsResult = {
  __typename?: 'PaginatedPopularNftCollectionsResult';
  items: Array<NftCollectionWithOwners>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedProfileActionHistoryResult = {
  __typename?: 'PaginatedProfileActionHistoryResult';
  items: Array<ProfileActionHistory>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated profile managers result */
export type PaginatedProfileManagersResult = {
  __typename?: 'PaginatedProfileManagersResult';
  items: Array<ProfilesManagedResult>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated profile result */
export type PaginatedProfileResult = {
  __typename?: 'PaginatedProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationPrimaryResult = {
  __typename?: 'PaginatedPublicationPrimaryResult';
  items: Array<PrimaryPublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsResult = {
  __typename?: 'PaginatedPublicationsResult';
  items: Array<AnyPublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsTagsResult = {
  __typename?: 'PaginatedPublicationsTagsResult';
  items: Array<TagResult>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated result info */
export type PaginatedResultInfo = {
  __typename?: 'PaginatedResultInfo';
  /** Cursor to query next results */
  next?: Maybe<Scalars['Cursor']>;
  /** Cursor to query the actual results */
  prev?: Maybe<Scalars['Cursor']>;
};

export type PaginatedRevenueFromPublicationsResult = {
  __typename?: 'PaginatedRevenueFromPublicationsResult';
  items: Array<PublicationRevenue>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedSupportedModules = {
  __typename?: 'PaginatedSupportedModules';
  items: Array<SupportedModule>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoReactedResult = {
  __typename?: 'PaginatedWhoReactedResult';
  items: Array<ProfileWhoReactedResult>;
  pageInfo: PaginatedResultInfo;
};

export type PhysicalAddress = {
  __typename?: 'PhysicalAddress';
  /** The country name component. */
  country: Scalars['EncryptableString'];
  /** The full mailing address formatted for display. */
  formatted?: Maybe<Scalars['EncryptableString']>;
  /** The city or locality. */
  locality: Scalars['EncryptableString'];
  /** The zip or postal code. */
  postalCode?: Maybe<Scalars['EncryptableString']>;
  /** The state or region. */
  region?: Maybe<Scalars['EncryptableString']>;
  /** The street address including house number, street name, P.O. Box, apartment or unit number and extended multi-line address information. */
  streetAddress?: Maybe<Scalars['EncryptableString']>;
};

/** The POAP Event result */
export type PoapEvent = {
  __typename?: 'PoapEvent';
  animationUrl?: Maybe<Scalars['URL']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  eventTemplateId?: Maybe<Scalars['Int']>;
  eventUrl?: Maybe<Scalars['URL']>;
  expiryDate?: Maybe<Scalars['DateTime']>;
  fancyId?: Maybe<Scalars['String']>;
  fromAdmin?: Maybe<Scalars['Boolean']>;
  id: Scalars['PoapEventId'];
  imageUrl?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  privateEvent?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  virtualEvent?: Maybe<Scalars['Boolean']>;
  year?: Maybe<Scalars['Int']>;
};

export type PoapEventQueryRequest = {
  eventId: Scalars['PoapEventId'];
};

export type PoapHoldersQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  eventId: Scalars['PoapEventId'];
  limit?: InputMaybe<LimitType>;
};

/** The Poap Token Event */
export type PoapToken = {
  __typename?: 'PoapToken';
  created: Scalars['DateTime'];
  event: PoapEvent;
  /** Poap Event Id */
  eventId: Scalars['PoapEventId'];
  /** Which network the token is: L1 (eth) or L2 (Gnosis) */
  layer: PoapTokenLayerType;
  /** migrated to L1 at */
  migrated?: Maybe<Scalars['DateTime']>;
  owner: NetworkAddress;
  tokenId: Scalars['TokenId'];
};

export enum PoapTokenLayerType {
  Layer1 = 'Layer1',
  Layer2 = 'Layer2'
}

export enum PopularNftCollectionsOrder {
  TotalLensProfileOwners = 'TotalLensProfileOwners',
  TotalOwners = 'TotalOwners'
}

/** Popular NFT collections request */
export type PopularNftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
  /** Include only verified collections */
  onlyVerified?: InputMaybe<Scalars['Boolean']>;
  /** The ordering of Nft collection owners. Defaults to Total Lens Profile owners */
  orderBy?: InputMaybe<PopularNftCollectionsOrder>;
};

export type Post = {
  __typename?: 'Post';
  by: Profile;
  createdAt: Scalars['DateTime'];
  id: Scalars['PublicationId'];
  isHidden: Scalars['Boolean'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules?: Maybe<Array<OpenActionModule>>;
  operations: PublicationOperations;
  publishedOn?: Maybe<App>;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']>;
};


export type PostStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type PrimaryPublication = Comment | Post | Quote;

/** The Profile */
export type Profile = {
  __typename?: 'Profile';
  /** When the profile was created */
  createdAt: Scalars['DateTime'];
  /** The follow module */
  followModule?: Maybe<FollowModule>;
  /** The profile follow nft address */
  followNftAddress?: Maybe<NetworkAddress>;
  guardian?: Maybe<ProfileGuardianResult>;
  /** The profile handle - a profile may not have one */
  handle?: Maybe<Scalars['Handle']>;
  /** The profile id */
  id: Scalars['ProfileId'];
  interests: Array<Scalars['String']>;
  invitedBy?: Maybe<Profile>;
  /** The number of invites left */
  invitesLeft?: Maybe<Scalars['Int']>;
  /** If the profile has got the lens manager enabled - supports signless experience */
  lensManager: Scalars['Boolean'];
  /** The profile metadata. You can optionally query profile metadata by app id.  */
  metadata?: Maybe<ProfileMetadata>;
  /** The on chain identity */
  onchainIdentity: ProfileOnchainIdentity;
  operations: ProfileOperations;
  /** Who owns the profile */
  ownedBy: NetworkAddress;
  /** If lens API will sponsor this persons for gasless experience */
  sponsor: Scalars['Boolean'];
  stats: ProfileStats;
  txHash: Scalars['TxHash'];
};


/** The Profile */
export type ProfileMetadataArgs = {
  request?: InputMaybe<GetProfileMetadataArgs>;
};


/** The Profile */
export type ProfileStatsArgs = {
  request?: InputMaybe<ProfileStatsArg>;
};

/** The Profile */
export type ProfileActionHistory = {
  __typename?: 'ProfileActionHistory';
  actionType: ProfileActionHistoryType;
  actionedOn: Scalars['DateTime'];
  id: Scalars['Float'];
  txHash?: Maybe<Scalars['TxHash']>;
  who: Scalars['EvmAddress'];
};

export type ProfileActionHistoryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

/** Profile action history type */
export enum ProfileActionHistoryType {
  Acted = 'ACTED',
  Blocked = 'BLOCKED',
  Collected = 'COLLECTED',
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  LinkHandle = 'LINK_HANDLE',
  LoggedIn = 'LOGGED_IN',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  RefreshAuthToken = 'REFRESH_AUTH_TOKEN',
  SetProfileMetadata = 'SET_PROFILE_METADATA',
  SetProfileModule = 'SET_PROFILE_MODULE',
  Unblocked = 'UNBLOCKED',
  Unfollow = 'UNFOLLOW',
  UnlinkHandle = 'UNLINK_HANDLE'
}

export type ProfileGuardianResult = {
  __typename?: 'ProfileGuardianResult';
  cooldownEndsOn?: Maybe<Scalars['DateTime']>;
  protected: Scalars['Boolean'];
};

/** Profile interests types */
export enum ProfileInterestTypes {
  ArtEntertainment = 'ART_ENTERTAINMENT',
  ArtEntertainmentAnime = 'ART_ENTERTAINMENT__ANIME',
  ArtEntertainmentArt = 'ART_ENTERTAINMENT__ART',
  ArtEntertainmentBooks = 'ART_ENTERTAINMENT__BOOKS',
  ArtEntertainmentDesign = 'ART_ENTERTAINMENT__DESIGN',
  ArtEntertainmentFashion = 'ART_ENTERTAINMENT__FASHION',
  ArtEntertainmentFilmTv = 'ART_ENTERTAINMENT__FILM_TV',
  ArtEntertainmentMemes = 'ART_ENTERTAINMENT__MEMES',
  ArtEntertainmentMusic = 'ART_ENTERTAINMENT__MUSIC',
  ArtEntertainmentPhotography = 'ART_ENTERTAINMENT__PHOTOGRAPHY',
  Business = 'BUSINESS',
  BusinessCreatorEconomy = 'BUSINESS__CREATOR_ECONOMY',
  BusinessFinance = 'BUSINESS__FINANCE',
  BusinessMarketing = 'BUSINESS__MARKETING',
  Career = 'CAREER',
  Crypto = 'CRYPTO',
  CryptoBitcoin = 'CRYPTO__BITCOIN',
  CryptoDaos = 'CRYPTO__DAOS',
  CryptoDefi = 'CRYPTO__DEFI',
  CryptoEthereum = 'CRYPTO__ETHEREUM',
  CryptoGm = 'CRYPTO__GM',
  CryptoGovernance = 'CRYPTO__GOVERNANCE',
  CryptoL1 = 'CRYPTO__L1',
  CryptoL2 = 'CRYPTO__L2',
  CryptoMetaverse = 'CRYPTO__METAVERSE',
  CryptoNft = 'CRYPTO__NFT',
  CryptoRekt = 'CRYPTO__REKT',
  CryptoScaling = 'CRYPTO__SCALING',
  CryptoWeb3 = 'CRYPTO__WEB3',
  CryptoWeb3Social = 'CRYPTO__WEB3_SOCIAL',
  Education = 'EDUCATION',
  FamilyParenting = 'FAMILY_PARENTING',
  FoodDrink = 'FOOD_DRINK',
  FoodDrinkBeer = 'FOOD_DRINK__BEER',
  FoodDrinkCocktails = 'FOOD_DRINK__COCKTAILS',
  FoodDrinkCooking = 'FOOD_DRINK__COOKING',
  FoodDrinkRestaurants = 'FOOD_DRINK__RESTAURANTS',
  FoodDrinkWine = 'FOOD_DRINK__WINE',
  HealthFitness = 'HEALTH_FITNESS',
  HealthFitnessBiohacking = 'HEALTH_FITNESS__BIOHACKING',
  HealthFitnessExercise = 'HEALTH_FITNESS__EXERCISE',
  HobbiesInterests = 'HOBBIES_INTERESTS',
  HobbiesInterestsArtsCrafts = 'HOBBIES_INTERESTS__ARTS_CRAFTS',
  HobbiesInterestsCars = 'HOBBIES_INTERESTS__CARS',
  HobbiesInterestsCollecting = 'HOBBIES_INTERESTS__COLLECTING',
  HobbiesInterestsGaming = 'HOBBIES_INTERESTS__GAMING',
  HobbiesInterestsSports = 'HOBBIES_INTERESTS__SPORTS',
  HobbiesInterestsTravel = 'HOBBIES_INTERESTS__TRAVEL',
  HomeGarden = 'HOME_GARDEN',
  HomeGardenAnimals = 'HOME_GARDEN__ANIMALS',
  HomeGardenGardening = 'HOME_GARDEN__GARDENING',
  HomeGardenHomeImprovement = 'HOME_GARDEN__HOME_IMPROVEMENT',
  HomeGardenNature = 'HOME_GARDEN__NATURE',
  LawGovernmentPolitics = 'LAW_GOVERNMENT_POLITICS',
  LawGovernmentPoliticsRegulation = 'LAW_GOVERNMENT_POLITICS__REGULATION',
  Lens = 'LENS',
  News = 'NEWS',
  Nsfw = 'NSFW',
  Technology = 'TECHNOLOGY',
  TechnologyAiMl = 'TECHNOLOGY__AI_ML',
  TechnologyBiotech = 'TECHNOLOGY__BIOTECH',
  TechnologyProgramming = 'TECHNOLOGY__PROGRAMMING',
  TechnologyScience = 'TECHNOLOGY__SCIENCE',
  TechnologyTools = 'TECHNOLOGY__TOOLS'
}

export type ProfileInterestsRequest = {
  interests: Array<ProfileInterestTypes>;
};

export type ProfileManagersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile ID for which to retrieve managers */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type ProfileMetadata = {
  __typename?: 'ProfileMetadata';
  /** The app that this metadata is displayed on */
  app?: Maybe<Scalars['AppId']>;
  /** Metadata custom attributes */
  attributes: Array<Attribute>;
  /** The bio for the profile */
  bio?: Maybe<Scalars['Markdown']>;
  /** The cover picture for the profile */
  coverPicture?: Maybe<ImageSet>;
  /** The display name for the profile */
  displayName?: Maybe<Scalars['String']>;
  /** The picture for the profile */
  picture?: Maybe<ProfilePicture>;
  /** The raw uri for the which the profile metadata was set as */
  rawURI: Scalars['URI'];
};

export type ProfileMirrorResult = {
  __typename?: 'ProfileMirrorResult';
  mirrorId: Scalars['PublicationId'];
  mirroredAt: Scalars['DateTime'];
  profile: Profile;
};

export type ProfileOnchainIdentity = {
  __typename?: 'ProfileOnchainIdentity';
  /** The ens information */
  ens?: Maybe<EnsOnchainIdentity>;
  /** The POH status */
  proofOfHumanity: Scalars['Boolean'];
  /** The sybil dot org information */
  sybilDotOrg: SybilDotOrgIdentity;
  /** The worldcoin identity */
  worldcoin: WorldcoinIdentity;
};

export type ProfileOperations = {
  __typename?: 'ProfileOperations';
  canBlock: Scalars['Boolean'];
  canFollow: TriStateValue;
  canUnblock: Scalars['Boolean'];
  canUnfollow: Scalars['Boolean'];
  id: Scalars['ProfileId'];
  isBlockedByMe: OptimisticStatusResult;
  isFollowedByMe: OptimisticStatusResult;
  isFollowingMe: OptimisticStatusResult;
};

export type ProfileOwnershipCondition = {
  __typename?: 'ProfileOwnershipCondition';
  profileId: Scalars['ProfileId'];
};

export type ProfilePicture = ImageSet | NftImage;

export type ProfileReactedResult = {
  __typename?: 'ProfileReactedResult';
  profile: Profile;
  reactions: Array<ReactedResult>;
};

/** The reaction details for a publication */
export type ProfileReactionResult = {
  __typename?: 'ProfileReactionResult';
  /** The reaction */
  reaction: PublicationReactionType;
  /** The reaction date */
  reactionAt: Scalars['DateTime'];
};

export type ProfileRecommendationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Disable machine learning recommendations (default: false) */
  disableML?: InputMaybe<Scalars['Boolean']>;
  /** Filter based on a specific profile ID */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
  /** Shuffle the recommendations (default: false) */
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileRequest = {
  /** The handle for profile you want to fetch */
  forHandle?: InputMaybe<Scalars['Handle']>;
  /** The profile you want to fetch */
  forProfileId?: InputMaybe<Scalars['ProfileId']>;
};

export type ProfileSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Query for the profile search */
  query: Scalars['String'];
  /** Filtering criteria for profile search */
  where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  /** Array of custom filters for profile search */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
};

/** The Profile Stats */
export type ProfileStats = {
  __typename?: 'ProfileStats';
  comments: Scalars['Int'];
  countOpenActions: Scalars['Int'];
  followers: Scalars['Int'];
  following: Scalars['Int'];
  id: Scalars['ProfileId'];
  mirrors: Scalars['Int'];
  posts: Scalars['Int'];
  publications: Scalars['Int'];
  quotes: Scalars['Int'];
  /** How many times a profile has reacted on something */
  reacted: Scalars['Int'];
  /** How many times other profiles have reacted on something this profile did */
  reactions: Scalars['Int'];
};


/** The Profile Stats */
export type ProfileStatsCountOpenActionsArgs = {
  request?: InputMaybe<ProfileStatsCountOpenActionArgs>;
};


/** The Profile Stats */
export type ProfileStatsReactedArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};


/** The Profile Stats */
export type ProfileStatsReactionsArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};

export type ProfileStatsArg = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  forApps?: InputMaybe<Array<Scalars['AppId']>>;
};

export type ProfileStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type ProfileStatsReactionArgs = {
  type: PublicationReactionType;
};

export type ProfileWhoReactedResult = {
  __typename?: 'ProfileWhoReactedResult';
  profile: Profile;
  reactions: Array<ProfileReactionResult>;
};

export type ProfilesManagedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve managed profiles */
  for: Scalars['EvmAddress'];
  includeOwned?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
};

export type ProfilesManagedResult = {
  __typename?: 'ProfilesManagedResult';
  address: Scalars['EvmAddress'];
};

export type ProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** The where clause to use to filter on what you are looking for */
  where: ProfilesRequestWhere;
};

export type ProfilesRequestWhere = {
  /** Pass in an array of handles to get the profile entities */
  handles?: InputMaybe<Array<Scalars['Handle']>>;
  /** Pass in an array of evm address to get the profile entities they own */
  ownedBy?: InputMaybe<Array<Scalars['EvmAddress']>>;
  /** Pass in an array of profile ids to get the profile entities */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  /** Pass the publication id and get a list of the profiles who commented on it */
  whoCommentedOn?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who mirrored it */
  whoMirroredPublication?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who quoted it */
  whoQuotedPublication?: InputMaybe<Scalars['PublicationId']>;
};

export type PublicationBookmarkRequest = {
  on: Scalars['PublicationId'];
};

export type PublicationBookmarksRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<PublicationBookmarksWhere>;
};

export type PublicationBookmarksWhere = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationCommentOn = {
  commentsRankingFilter?: InputMaybe<CommentRankingFilterType>;
  id: Scalars['PublicationId'];
};

export enum PublicationContentWarningType {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER'
}

export type PublicationMarketplaceMetadataAttribute = {
  __typename?: 'PublicationMarketplaceMetadataAttribute';
  displayType?: Maybe<MarketplaceMetadataAttributeDisplayType>;
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type PublicationMetadata = ArticleMetadataV3 | AudioMetadataV3 | CheckingInMetadataV3 | EmbedMetadataV3 | EventMetadataV3 | ImageMetadataV3 | LegacyPublicationMetadata | LinkMetadataV3 | LiveStreamMetadataV3 | MintMetadataV3 | SpaceMetadataV3 | StoryMetadataV3 | TextOnlyMetadataV3 | ThreeDMetadataV3 | TransactionMetadataV3 | VideoMetadataV3;

export type PublicationMetadataContentWarningFilter = {
  oneOf: Array<PublicationContentWarningType>;
};

export type PublicationMetadataEncryptionStrategy = PublicationMetadataV3LitEncryption;

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<Array<PublicationMetadataMainFocusType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export enum PublicationMetadataLicenseType {
  Cco = 'CCO',
  CcBy = 'CC_BY',
  CcByNc = 'CC_BY_NC',
  CcByNd = 'CC_BY_ND',
  TbnlCDtsaNplLedger = 'TBNL_C_DTSA_NPL_Ledger',
  TbnlCDtsaNplLegal = 'TBNL_C_DTSA_NPL_Legal',
  TbnlCDtsaPlLedger = 'TBNL_C_DTSA_PL_Ledger',
  TbnlCDtsaPlLegal = 'TBNL_C_DTSA_PL_Legal',
  TbnlCDtNplLedger = 'TBNL_C_DT_NPL_Ledger',
  TbnlCDtNplLegal = 'TBNL_C_DT_NPL_Legal',
  TbnlCDtPlLedger = 'TBNL_C_DT_PL_Ledger',
  TbnlCDtPlLegal = 'TBNL_C_DT_PL_Legal',
  TbnlCDNplLedger = 'TBNL_C_D_NPL_Ledger',
  TbnlCDNplLegal = 'TBNL_C_D_NPL_Legal',
  TbnlCDPlLedger = 'TBNL_C_D_PL_Ledger',
  TbnlCDPlLegal = 'TBNL_C_D_PL_Legal',
  TbnlCNdNplLedger = 'TBNL_C_ND_NPL_Ledger',
  TbnlCNdNplLegal = 'TBNL_C_ND_NPL_Legal',
  TbnlCNdPlLedger = 'TBNL_C_ND_PL_Ledger',
  TbnlCNdPlLegal = 'TBNL_C_ND_PL_Legal',
  TbnlNcDtsaNplLedger = 'TBNL_NC_DTSA_NPL_Ledger',
  TbnlNcDtsaNplLegal = 'TBNL_NC_DTSA_NPL_Legal',
  TbnlNcDtsaPlLedger = 'TBNL_NC_DTSA_PL_Ledger',
  TbnlNcDtsaPlLegal = 'TBNL_NC_DTSA_PL_Legal',
  TbnlNcDtNplLedger = 'TBNL_NC_DT_NPL_Ledger',
  TbnlNcDtNplLegal = 'TBNL_NC_DT_NPL_Legal',
  TbnlNcDtPlLedger = 'TBNL_NC_DT_PL_Ledger',
  TbnlNcDtPlLegal = 'TBNL_NC_DT_PL_Legal',
  TbnlNcDNplLedger = 'TBNL_NC_D_NPL_Ledger',
  TbnlNcDNplLegal = 'TBNL_NC_D_NPL_Legal',
  TbnlNcDPlLedger = 'TBNL_NC_D_PL_Ledger',
  TbnlNcDPlLegal = 'TBNL_NC_D_PL_Legal',
  TbnlNcNdNplLedger = 'TBNL_NC_ND_NPL_Ledger',
  TbnlNcNdNplLegal = 'TBNL_NC_ND_NPL_Legal',
  TbnlNcNdPlLedger = 'TBNL_NC_ND_PL_Ledger',
  TbnlNcNdPlLegal = 'TBNL_NC_ND_PL_Legal'
}

export enum PublicationMetadataMainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  CheckingIn = 'CHECKING_IN',
  Embed = 'EMBED',
  Event = 'EVENT',
  Image = 'IMAGE',
  Link = 'LINK',
  Livestream = 'LIVESTREAM',
  Mint = 'MINT',
  ShortVideo = 'SHORT_VIDEO',
  Space = 'SPACE',
  Story = 'STORY',
  TextOnly = 'TEXT_ONLY',
  ThreeD = 'THREE_D',
  Transaction = 'TRANSACTION',
  Video = 'VIDEO'
}

export type PublicationMetadataMedia = PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo;

export type PublicationMetadataMediaAudio = {
  __typename?: 'PublicationMetadataMediaAudio';
  artist?: Maybe<Scalars['EncryptableString']>;
  audio: EncryptableAudioSet;
  cover?: Maybe<EncryptableImageSet>;
  credits?: Maybe<Scalars['EncryptableString']>;
  duration?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['EncryptableString']>;
  license?: Maybe<PublicationMetadataLicenseType>;
  lyrics?: Maybe<Scalars['EncryptableString']>;
  recordLabel?: Maybe<Scalars['EncryptableString']>;
};

export type PublicationMetadataMediaImage = {
  __typename?: 'PublicationMetadataMediaImage';
  /** Alternative text for the image */
  altTag?: Maybe<Scalars['EncryptableString']>;
  image: EncryptableImageSet;
  license?: Maybe<PublicationMetadataLicenseType>;
};

export type PublicationMetadataMediaVideo = {
  __typename?: 'PublicationMetadataMediaVideo';
  /** Alternative text for the video */
  altTag?: Maybe<Scalars['EncryptableString']>;
  cover?: Maybe<EncryptableImageSet>;
  duration?: Maybe<Scalars['Int']>;
  license?: Maybe<PublicationMetadataLicenseType>;
  video: EncryptableVideoSet;
};

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']>>;
  oneOf?: InputMaybe<Array<Scalars['String']>>;
};

export enum PublicationMetadataTransactionType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER'
}

export type PublicationMetadataV2EncryptedFields = {
  __typename?: 'PublicationMetadataV2EncryptedFields';
  animationUrl?: Maybe<Scalars['EncryptedValue']>;
  content?: Maybe<Scalars['EncryptedValue']>;
  externalUrl?: Maybe<Scalars['EncryptedValue']>;
  image?: Maybe<Scalars['EncryptedValue']>;
  media?: Maybe<Array<EncryptedMedia>>;
};

export type PublicationMetadataV2Encryption = {
  __typename?: 'PublicationMetadataV2Encryption';
  accessCondition: AccessCondition;
  encryptedFields: PublicationMetadataV2EncryptedFields;
  encryptionKey: Scalars['ContentEncryptionKey'];
};

export type PublicationMetadataV3Attribute = {
  __typename?: 'PublicationMetadataV3Attribute';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type PublicationMetadataV3LitEncryption = {
  __typename?: 'PublicationMetadataV3LitEncryption';
  accessCondition: AccessCondition;
  encryptedPaths: Array<Scalars['EncryptedPath']>;
  encryptionKey: Scalars['ContentEncryptionKey'];
};

export type PublicationNotInterestedRequest = {
  on: Scalars['PublicationId'];
};

export type PublicationOperations = {
  __typename?: 'PublicationOperations';
  actedOn: Array<OpenActionResult>;
  canAct: TriStateValue;
  canComment: TriStateValue;
  canDecrypt: CanDecryptResponse;
  canMirror: TriStateValue;
  hasActed: OptimisticStatusResult;
  hasBookmarked: Scalars['Boolean'];
  hasMirrored: Scalars['Boolean'];
  hasReacted: Scalars['Boolean'];
  hasReported: Scalars['Boolean'];
  isNotInterested: Scalars['Boolean'];
};


export type PublicationOperationsActedOnArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsCanActArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsHasActedArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsHasReactedArgs = {
  request?: InputMaybe<PublicationOperationsReactionArgs>;
};

export type PublicationOperationsActedArgs = {
  filter?: InputMaybe<OpenActionFilter>;
};

export type PublicationOperationsReactionArgs = {
  type?: InputMaybe<PublicationReactionType>;
};

export enum PublicationReactionType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM'
}

export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  DirectThreat = 'DIRECT_THREAT',
  HumanAbuse = 'HUMAN_ABUSE',
  ThreatIndividual = 'THREAT_INDIVIDUAL',
  Violence = 'VIOLENCE'
}

export enum PublicationReportingReason {
  Fraud = 'FRAUD',
  Illegal = 'ILLEGAL',
  Sensitive = 'SENSITIVE',
  Spam = 'SPAM'
}

export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE'
}

export enum PublicationReportingSpamSubreason {
  FakeEngagement = 'FAKE_ENGAGEMENT',
  LowSignal = 'LOW_SIGNAL',
  ManipulationAlgo = 'MANIPULATION_ALGO',
  Misleading = 'MISLEADING',
  MisuseHashtags = 'MISUSE_HASHTAGS',
  Repetitive = 'REPETITIVE',
  SomethingElse = 'SOMETHING_ELSE',
  Unrelated = 'UNRELATED'
}

export type PublicationRequest = {
  forId?: InputMaybe<Scalars['PublicationId']>;
  forTxHash?: InputMaybe<Scalars['TxHash']>;
};

export type PublicationRevenue = {
  __typename?: 'PublicationRevenue';
  publication: AnyPublication;
  revenue: Array<RevenueAggregate>;
};

export type PublicationSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  query: Scalars['String'];
  where?: InputMaybe<PublicationSearchWhere>;
};

export type PublicationSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationStats = {
  __typename?: 'PublicationStats';
  bookmarks: Scalars['Int'];
  comments: Scalars['Int'];
  countOpenActions: Scalars['Int'];
  id: Scalars['PublicationId'];
  mirrors: Scalars['Int'];
  quotes: Scalars['Int'];
  reactions: Scalars['Int'];
};


export type PublicationStatsCountOpenActionsArgs = {
  request?: InputMaybe<PublicationStatsCountOpenActionArgs>;
};


export type PublicationStatsReactionsArgs = {
  request?: InputMaybe<PublicationStatsReactionArgs>;
};

export type PublicationStatsCountOpenActionArgs = {
  anyOf: Array<OpenActionFilter>;
};

export type PublicationStatsInput = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter the returned stats on apps and 1 of the following filters: tags, contentWarning, mainContentFocus, locale */
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationStatsReactionArgs = {
  type: PublicationReactionType;
};

export type PublicationStatsSubscriptionRequest = {
  for: Scalars['PublicationId'];
};

export enum PublicationType {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE'
}

export type PublicationValidateMetadataResult = {
  __typename?: 'PublicationValidateMetadataResult';
  reason?: Maybe<Scalars['String']>;
  valid: Scalars['Boolean'];
};

export enum PublicationsOrderByType {
  CommentOfQueryRanking = 'COMMENT_OF_QUERY_RANKING',
  Latest = 'LATEST'
}

export type PublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy?: InputMaybe<PublicationsOrderByType>;
  where: PublicationsWhere;
};

export type PublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy?: InputMaybe<TagSortCriteriaType>;
  where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type PublicationsWhere = {
  actedBy?: InputMaybe<Scalars['ProfileId']>;
  commentOn?: InputMaybe<PublicationCommentOn>;
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  from?: InputMaybe<Array<Scalars['ProfileId']>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mirrorOn?: InputMaybe<Scalars['PublicationId']>;
  publicationIds?: InputMaybe<Array<Scalars['PublicationId']>>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
  quoteOn?: InputMaybe<Scalars['PublicationId']>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type Query = {
  __typename?: 'Query';
  approvedModuleAllowanceAmount: Array<ApprovedAllowanceAmountResult>;
  challenge: AuthChallengeResult;
  claimableProfiles: ClaimableProfilesResult;
  claimableStatus: ClaimProfileStatusType;
  /** Get all enabled currencies */
  currencies: PaginatedCurrenciesResult;
  doesFollow: Array<DoesFollowResult>;
  exploreProfiles: PaginatedProfileResult;
  explorePublications: PaginatedExplorePublicationResult;
  feed: PaginatedFeedResult;
  feedHighlights: PaginatedFeedHighlightsResult;
  followRevenues: FollowRevenueResult;
  followers: PaginatedProfileResult;
  following: PaginatedProfileResult;
  generateModuleCurrencyApprovalData: GenerateModuleCurrencyApprovalResult;
  invitedProfiles: Array<InvitedResult>;
  lensTransactionStatus?: Maybe<LensTransactionResult>;
  momokaSubmitters: MomokaSubmittersResult;
  momokaSummary: MomokaSummaryResult;
  momokaTransaction?: Maybe<MomokaTransaction>;
  momokaTransactions: MomokaTransactionsResult;
  mutualFollowers: PaginatedProfileResult;
  /** Get the NFT collections that the given two profiles own at least one NFT of. */
  mutualNftCollections: PaginatedNftCollectionsResult;
  mutualPoaps: PaginatedPoapEventResult;
  /** Get the Lens Profiles that own NFTs from a given collection. */
  nftCollectionOwners: PaginatedProfileResult;
  /** Get the NFT collections that the given wallet or profileId owns at least one NFT of. Only supports Ethereum and Polygon NFTs. Note excludeFollowers is set to true by default, so the result will not include Lens Follower NFTsunless explicitly requested. */
  nftCollections: PaginatedNftCollectionsResult;
  nftGalleries: PaginatedNftGalleriesResult;
  nfts: PaginatedNftsResult;
  notifications: PaginatedNotificationResult;
  ownedHandles: PaginatedHandlesResult;
  ping: Scalars['String'];
  poapEvent?: Maybe<PoapEvent>;
  poapHolders: PaginatedProfileResult;
  poaps: PaginatedPoapTokenResult;
  /** Get the most popular NFT collections. Popularity is based on how many Lens Profiles own NFTs from a given collection. */
  popularNftCollections: PaginatedPopularNftCollectionsResult;
  profile?: Maybe<Profile>;
  profileActionHistory: PaginatedProfileActionHistoryResult;
  profileAlreadyInvited: Scalars['Boolean'];
  profileInterestsOptions: Array<Scalars['String']>;
  profileManagers: PaginatedProfileManagersResult;
  profileRecommendations: PaginatedProfileResult;
  profiles: PaginatedProfileResult;
  profilesManaged: PaginatedProfileResult;
  publication?: Maybe<AnyPublication>;
  publicationBookmarks: PaginatedPublicationsResult;
  publications: PaginatedPublicationsResult;
  publicationsTags: PaginatedPublicationsTagsResult;
  relayQueues: Array<RelayQueueResult>;
  revenueFromPublication: PublicationRevenue;
  revenueFromPublications: PaginatedRevenueFromPublicationsResult;
  searchProfiles: PaginatedProfileResult;
  searchPublications: PaginatedPublicationPrimaryResult;
  supportedFollowModules: PaginatedSupportedModules;
  supportedOpenActionCollectModules: PaginatedSupportedModules;
  supportedOpenActionModules: PaginatedSupportedModules;
  supportedReferenceModules: PaginatedSupportedModules;
  txIdToTxHash?: Maybe<Scalars['TxHash']>;
  userSigNonces: UserSigNonces;
  validatePublicationMetadata: PublicationValidateMetadataResult;
  verify: Scalars['Boolean'];
  whoActedOnPublication: PaginatedProfileResult;
  whoHaveBlocked: PaginatedProfileResult;
  whoReactedPublication: PaginatedWhoReactedResult;
};


export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};


export type QueryChallengeArgs = {
  request: ChallengeRequest;
};


export type QueryCurrenciesArgs = {
  request: PaginatedOffsetRequest;
};


export type QueryDoesFollowArgs = {
  request: DoesFollowRequest;
};


export type QueryExploreProfilesArgs = {
  request: ExploreProfilesRequest;
};


export type QueryExplorePublicationsArgs = {
  request: ExplorePublicationRequest;
};


export type QueryFeedArgs = {
  request: FeedRequest;
};


export type QueryFeedHighlightsArgs = {
  request: FeedHighlightsRequest;
};


export type QueryFollowRevenuesArgs = {
  request: FollowRevenueRequest;
};


export type QueryFollowersArgs = {
  request: FollowersRequest;
};


export type QueryFollowingArgs = {
  request: FollowingRequest;
};


export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};


export type QueryLensTransactionStatusArgs = {
  request: LensTransactionStatusRequest;
};


export type QueryMomokaTransactionArgs = {
  request: MomokaTransactionRequest;
};


export type QueryMomokaTransactionsArgs = {
  request: MomokaTransactionsRequest;
};


export type QueryMutualFollowersArgs = {
  request: MutualFollowersRequest;
};


export type QueryMutualNftCollectionsArgs = {
  request: MutualNftCollectionsRequest;
};


export type QueryMutualPoapsArgs = {
  request: MutualPoapsQueryRequest;
};


export type QueryNftCollectionOwnersArgs = {
  request: NftCollectionOwnersRequest;
};


export type QueryNftCollectionsArgs = {
  request: NftCollectionsRequest;
};


export type QueryNftGalleriesArgs = {
  request: NftGalleriesRequest;
};


export type QueryNftsArgs = {
  request: NftsRequest;
};


export type QueryNotificationsArgs = {
  request?: InputMaybe<NotificationRequest>;
};


export type QueryOwnedHandlesArgs = {
  request: OwnedHandlesRequest;
};


export type QueryPoapEventArgs = {
  request: PoapEventQueryRequest;
};


export type QueryPoapHoldersArgs = {
  request: PoapHoldersQueryRequest;
};


export type QueryPoapsArgs = {
  request: UserPoapsQueryRequest;
};


export type QueryPopularNftCollectionsArgs = {
  request: PopularNftCollectionsRequest;
};


export type QueryProfileArgs = {
  request: ProfileRequest;
};


export type QueryProfileActionHistoryArgs = {
  request: ProfileActionHistoryRequest;
};


export type QueryProfileAlreadyInvitedArgs = {
  request: AlreadyInvitedCheckRequest;
};


export type QueryProfileManagersArgs = {
  request: ProfileManagersRequest;
};


export type QueryProfileRecommendationsArgs = {
  request: ProfileRecommendationsRequest;
};


export type QueryProfilesArgs = {
  request: ProfilesRequest;
};


export type QueryProfilesManagedArgs = {
  request: ProfilesManagedRequest;
};


export type QueryPublicationArgs = {
  request: PublicationRequest;
};


export type QueryPublicationBookmarksArgs = {
  request?: InputMaybe<PublicationBookmarksRequest>;
};


export type QueryPublicationsArgs = {
  request: PublicationsRequest;
};


export type QueryPublicationsTagsArgs = {
  request?: InputMaybe<PublicationsTagsRequest>;
};


export type QueryRevenueFromPublicationArgs = {
  request: RevenueFromPublicationRequest;
};


export type QueryRevenueFromPublicationsArgs = {
  request: RevenueFromPublicationsRequest;
};


export type QuerySearchProfilesArgs = {
  request: ProfileSearchRequest;
};


export type QuerySearchPublicationsArgs = {
  request: PublicationSearchRequest;
};


export type QuerySupportedFollowModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedOpenActionCollectModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedOpenActionModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedReferenceModulesArgs = {
  request: SupportedModulesRequest;
};


export type QueryTxIdToTxHashArgs = {
  for: Scalars['TxId'];
};


export type QueryValidatePublicationMetadataArgs = {
  request: ValidatePublicationMetadataRequest;
};


export type QueryVerifyArgs = {
  request: VerifyRequest;
};


export type QueryWhoActedOnPublicationArgs = {
  request: WhoActedOnPublicationRequest;
};


export type QueryWhoHaveBlockedArgs = {
  request: WhoHaveBlockedRequest;
};


export type QueryWhoReactedPublicationArgs = {
  request: WhoReactedPublicationRequest;
};

export type Quote = {
  __typename?: 'Quote';
  by: Profile;
  createdAt: Scalars['DateTime'];
  id: Scalars['PublicationId'];
  isHidden: Scalars['Boolean'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules?: Maybe<Array<OpenActionModule>>;
  operations: PublicationOperations;
  publishedOn?: Maybe<App>;
  quoteOn: PrimaryPublication;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']>;
};


export type QuoteStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type QuoteNotification = {
  __typename?: 'QuoteNotification';
  id: Scalars['UUID'];
  quote: Quote;
};

export type RateRequest = {
  for: SupportedFiatType;
};

export type ReactedResult = {
  __typename?: 'ReactedResult';
  reactedAt: Scalars['DateTime'];
  reaction: PublicationReactionType;
};

export type ReactionEvent = {
  __typename?: 'ReactionEvent';
  by: Profile;
  createdAt: Scalars['DateTime'];
  reaction: PublicationReactionType;
};

export type ReactionNotification = {
  __typename?: 'ReactionNotification';
  id: Scalars['UUID'];
  publication: PrimaryPublication;
  reactions: Array<ProfileReactedResult>;
};

export type ReactionRequest = {
  for: Scalars['PublicationId'];
  reaction: PublicationReactionType;
};

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float'];
};

export type RecipientDataOutput = {
  __typename?: 'RecipientDataOutput';
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float'];
};

export type ReferenceModule = DegreesOfSeparationReferenceModuleSettings | FollowOnlyReferenceModuleSettings | UnknownReferenceModuleSettings;

export type ReferenceModuleInput = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModuleType {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule'
}

export type RefreshPublicationMetadataRequest = {
  for: Scalars['PublicationId'];
};

export type RefreshPublicationMetadataResult = {
  __typename?: 'RefreshPublicationMetadataResult';
  result: RefreshPublicationMetadataResultType;
};

export enum RefreshPublicationMetadataResultType {
  AlreadyPending = 'ALREADY_PENDING',
  Queued = 'QUEUED',
  ValidPublicationNotFound = 'VALID_PUBLICATION_NOT_FOUND'
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export type RelayError = {
  __typename?: 'RelayError';
  reason: RelayErrorReasonType;
};

export enum RelayErrorReasonType {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  RateLimited = 'RATE_LIMITED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED'
}

export type RelayMomokaResult = CreateMomokaPublicationResult | LensProfileManagerRelayError;

export type RelayQueueResult = {
  __typename?: 'RelayQueueResult';
  key: RelayRoleKey;
  queue: Scalars['Int'];
  relay: NetworkAddress;
};

export type RelayResult = RelayError | RelaySuccess;

export enum RelayRoleKey {
  CreateProfile = 'CREATE_PROFILE',
  LensManager_1 = 'LENS_MANAGER_1',
  LensManager_2 = 'LENS_MANAGER_2',
  LensManager_3 = 'LENS_MANAGER_3',
  LensManager_4 = 'LENS_MANAGER_4',
  LensManager_5 = 'LENS_MANAGER_5',
  LensManager_6 = 'LENS_MANAGER_6',
  LensManager_7 = 'LENS_MANAGER_7',
  LensManager_8 = 'LENS_MANAGER_8',
  LensManager_9 = 'LENS_MANAGER_9',
  LensManager_10 = 'LENS_MANAGER_10',
  LensManager_11 = 'LENS_MANAGER_11',
  LensManager_12 = 'LENS_MANAGER_12',
  LensManager_13 = 'LENS_MANAGER_13',
  LensManager_14 = 'LENS_MANAGER_14',
  LensManager_15 = 'LENS_MANAGER_15',
  LensManager_16 = 'LENS_MANAGER_16',
  LensManager_17 = 'LENS_MANAGER_17',
  LensManager_18 = 'LENS_MANAGER_18',
  LensManager_19 = 'LENS_MANAGER_19',
  LensManager_20 = 'LENS_MANAGER_20',
  WithSig_1 = 'WITH_SIG_1',
  WithSig_2 = 'WITH_SIG_2',
  WithSig_3 = 'WITH_SIG_3',
  WithSig_4 = 'WITH_SIG_4',
  WithSig_5 = 'WITH_SIG_5',
  WithSig_6 = 'WITH_SIG_6',
  WithSig_7 = 'WITH_SIG_7',
  WithSig_8 = 'WITH_SIG_8',
  WithSig_9 = 'WITH_SIG_9',
  WithSig_10 = 'WITH_SIG_10'
}

export type RelaySuccess = {
  __typename?: 'RelaySuccess';
  txHash?: Maybe<Scalars['TxHash']>;
  txId?: Maybe<Scalars['TxId']>;
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']>;
  for: Scalars['PublicationId'];
  reason: ReportingReasonInput;
};

export type ReportingReasonInput = {
  fraudReason?: InputMaybe<FraudReasonInput>;
  illegalReason?: InputMaybe<IllegalReasonInput>;
  sensitiveReason?: InputMaybe<SensitiveReasonInput>;
  spamReason?: InputMaybe<SpamReasonInput>;
};

export type ReservedClaimable = {
  __typename?: 'ReservedClaimable';
  expiry: Scalars['DateTime'];
  id: Scalars['String'];
  source: Scalars['AppId'];
  withHandle: Scalars['Handle'];
};

export type RevenueAggregate = {
  __typename?: 'RevenueAggregate';
  total: Amount;
};

export type RevenueFromPublicationRequest = {
  for: Scalars['PublicationId'];
};

export type RevenueFromPublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile to get revenue for */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type RevertFollowModuleSettings = {
  __typename?: 'RevertFollowModuleSettings';
  contract: NetworkAddress;
};

export type SensitiveReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetFollowModuleRequest = {
  followModule: FollowModuleInput;
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  id: Scalars['ChallengeId'];
  /** The signature */
  signature: Scalars['Signature'];
};

export type SimpleCollectOpenActionModuleInput = {
  amount?: InputMaybe<AmountInput>;
  collectLimit?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['DateTime']>;
  followerOnly?: InputMaybe<Scalars['Boolean']>;
  recipient?: InputMaybe<Scalars['EvmAddress']>;
  referralFee?: InputMaybe<Scalars['Float']>;
};

export type SimpleCollectOpenActionSettings = {
  __typename?: 'SimpleCollectOpenActionSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type SpaceMetadataV3 = {
  __typename?: 'SpaceMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  link: Scalars['EncryptableURI'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  startsAt: Scalars['EncryptableDateTime'];
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type SpamReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export type StoryMetadataV3 = {
  __typename?: 'StoryMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  asset: PublicationMetadataMedia;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMomokaTransaction: MomokaTransaction;
  newNotification: Notification;
  newPublicationStats: PublicationStats;
};


export type SubscriptionNewNotificationArgs = {
  request: NotificationSubscriptionRequest;
};


export type SubscriptionNewPublicationStatsArgs = {
  request: PublicationStatsSubscriptionRequest;
};

export enum SupportedFiatType {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export type SupportedModule = KnownSupportedModule | UnknownSupportedModule;

export type SupportedModulesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  includeUnknown?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
};

export type SybilDotOrgIdentity = {
  __typename?: 'SybilDotOrgIdentity';
  source?: Maybe<SybilDotOrgIdentitySource>;
  /** The sybil dot org status */
  verified: Scalars['Boolean'];
};

export type SybilDotOrgIdentitySource = {
  __typename?: 'SybilDotOrgIdentitySource';
  twitter: SybilDotOrgTwitterIdentity;
};

export type SybilDotOrgTwitterIdentity = {
  __typename?: 'SybilDotOrgTwitterIdentity';
  handle?: Maybe<Scalars['String']>;
};

export type TagResult = {
  __typename?: 'TagResult';
  tag: Scalars['String'];
  total: Scalars['Int'];
};

export enum TagSortCriteriaType {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR'
}

export type TextOnlyMetadataV3 = {
  __typename?: 'TextOnlyMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ThreeDMetadataV3 = {
  __typename?: 'ThreeDMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  assets: Array<ThreeDMetadataV3Asset>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ThreeDMetadataV3Asset = {
  __typename?: 'ThreeDMetadataV3Asset';
  format: Scalars['String'];
  license?: Maybe<PublicationMetadataLicenseType>;
  playerURL: Scalars['EncryptableURI'];
  uri: Scalars['EncryptableURI'];
  zipPath?: Maybe<Scalars['String']>;
};

export type TransactionMetadataV3 = {
  __typename?: 'TransactionMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  chainId: Scalars['ChainId'];
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
  txHash: Scalars['EncryptableTxHash'];
  type: PublicationMetadataTransactionType;
};

export enum TriStateValue {
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES'
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  overrideSigNonce: Scalars['Nonce'];
};

export type UnblockRequest = {
  profiles: Array<Scalars['ProfileId']>;
};

export type UnfollowRequest = {
  unfollow: Array<Scalars['ProfileId']>;
};

export type UnknownFollowModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleRedeemInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleSettings = {
  __typename?: 'UnknownFollowModuleSettings';
  contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  followModuleReturnData: Scalars['BlockchainData'];
};

export type UnknownOpenActionActRedeemInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownOpenActionModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownOpenActionModuleSettings = {
  __typename?: 'UnknownOpenActionModuleSettings';
  /** The collect nft address - only deployed on first collect and if its a collectable open action */
  collectNft?: Maybe<Scalars['EvmAddress']>;
  contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  openActionModuleReturnData?: Maybe<Scalars['BlockchainData']>;
};

export type UnknownOpenActionResult = {
  __typename?: 'UnknownOpenActionResult';
  address: Scalars['EvmAddress'];
  category?: Maybe<OpenActionCategoryType>;
  initReturnData?: Maybe<Scalars['BlockchainData']>;
};

export type UnknownReferenceModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownReferenceModuleSettings = {
  __typename?: 'UnknownReferenceModuleSettings';
  contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  referenceModuleReturnData: Scalars['BlockchainData'];
};

export type UnknownSupportedModule = {
  __typename?: 'UnknownSupportedModule';
  contract: NetworkAddress;
  moduleName: Scalars['String'];
};

export type UserPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type UserSigNonces = {
  __typename?: 'UserSigNonces';
  lensHubOnchainSigNonce: Scalars['Nonce'];
  lensTokenHandleRegistryOnchainSigNonce: Scalars['Nonce'];
};

export type ValidatePublicationMetadataRequest = {
  json?: InputMaybe<Scalars['String']>;
  rawURI?: InputMaybe<Scalars['URI']>;
};

export type VerifyRequest = {
  /** The access token to verify */
  accessToken: Scalars['Jwt'];
};

export type Video = {
  __typename?: 'Video';
  mimeType?: Maybe<Scalars['MimeType']>;
  uri: Scalars['URI'];
};

export type VideoMetadataV3 = {
  __typename?: 'VideoMetadataV3';
  appId?: Maybe<Scalars['AppId']>;
  asset: PublicationMetadataMediaVideo;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<PublicationMetadataV3Attribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean'];
  id: Scalars['String'];
  isShortVideo: Scalars['Boolean'];
  locale: Scalars['Locale'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI'];
  tags?: Maybe<Array<Scalars['String']>>;
  /** The title of the video. Empty if not set. */
  title: Scalars['String'];
};

export type VideoSet = {
  __typename?: 'VideoSet';
  optimized?: Maybe<Video>;
  raw: Video;
};

export type WhoActedOnPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  on: Scalars['PublicationId'];
  where?: InputMaybe<WhoActedOnPublicationWhere>;
};

export type WhoActedOnPublicationWhere = {
  anyOf: Array<OpenActionFilter>;
};

export type WhoHaveBlockedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['PublicationId'];
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  anyOf?: InputMaybe<Array<PublicationReactionType>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

export type WorldcoinIdentity = {
  __typename?: 'WorldcoinIdentity';
  /** If the profile has verified as a user */
  isHuman: Scalars['Boolean'];
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE'
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String'];
  signal: Scalars['EvmAddress'];
  signalType: WorldcoinPhoneVerifyType;
};

export type NetworkAddressFieldsFragment = { __typename?: 'NetworkAddress', address: any, chainId: any };

export type Erc20FieldsFragment = { __typename?: 'Erc20', name: string, symbol: string, decimals: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } };

export type AmountFieldsFragment = { __typename?: 'Amount', value: string, asset: { __typename?: 'Erc20', name: string, symbol: string, decimals: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } };

export type ImageSetFieldsFragment = { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null };

type MediaFields_LegacyAudioItem_Fragment = { __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } };

type MediaFields_LegacyImageItem_Fragment = { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } };

type MediaFields_LegacyVideoItem_Fragment = { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } };

export type MediaFieldsFragment = MediaFields_LegacyAudioItem_Fragment | MediaFields_LegacyImageItem_Fragment | MediaFields_LegacyVideoItem_Fragment;

export type LegacyPublicationMetadataFieldsFragment = { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null };

export type PublicationMetadataV3AttributeFieldsFragment = { __typename?: 'PublicationMetadataV3Attribute', key: string, value: string };

export type AudioFieldsFragment = { __typename?: 'Audio', uri: any, mimeType?: any | null };

export type ImageFieldsFragment = { __typename?: 'Image', uri: any, mimeType?: any | null };

export type VideoFieldsFragment = { __typename?: 'Video', uri: any, mimeType?: any | null };

export type EncryptableAudioFieldsFragment = { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null };

export type EncryptableImageFieldsFragment = { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null };

export type EncryptableVideoFieldsFragment = { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null };

export type EncryptableAudioSetFieldsFragment = { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null };

export type EncryptableImageSetFieldsFragment = { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null };

export type EncryptableVideoSetFieldsFragment = { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null };

export type PublicationMetadataMediaAudioFieldsFragment = { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null };

export type PublicationMetadataMediaImageFieldsFragment = { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } };

export type PublicationMetadataMediaVideoFieldsFragment = { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null };

export type ArticleMetadataV3FieldsFragment = { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type AudioMetadataV3FieldsFragment = { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

export type CheckingInMetadataV3FieldsFragment = { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type EmbedMetadataV3FieldsFragment = { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type EventMetadataV3FieldsFragment = { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type ImageMetadataV3FieldsFragment = { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } };

export type LinkMetadataV3FieldsFragment = { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type LiveStreamMetadataV3FieldsFragment = { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type MintMetadataV3FieldsFragment = { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type SpaceMetadataV3FieldsFragment = { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type StoryMetadataV3FieldsFragment = { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

export type TextOnlyMetadataV3FieldsFragment = { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type ThreeDMetadataV3FieldsFragment = { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type TransactionMetadataV3FieldsFragment = { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

export type VideoMetadataV3FieldsFragment = { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

type AnyPublicationMetadataFields_ArticleMetadataV3_Fragment = { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_AudioMetadataV3_Fragment = { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

type AnyPublicationMetadataFields_CheckingInMetadataV3_Fragment = { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_EmbedMetadataV3_Fragment = { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_EventMetadataV3_Fragment = { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_ImageMetadataV3_Fragment = { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } };

type AnyPublicationMetadataFields_LegacyPublicationMetadata_Fragment = { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null };

type AnyPublicationMetadataFields_LinkMetadataV3_Fragment = { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_LiveStreamMetadataV3_Fragment = { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_MintMetadataV3_Fragment = { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_SpaceMetadataV3_Fragment = { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_StoryMetadataV3_Fragment = { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

type AnyPublicationMetadataFields_TextOnlyMetadataV3_Fragment = { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_ThreeDMetadataV3_Fragment = { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_TransactionMetadataV3_Fragment = { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null };

type AnyPublicationMetadataFields_VideoMetadataV3_Fragment = { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } };

export type AnyPublicationMetadataFieldsFragment = AnyPublicationMetadataFields_ArticleMetadataV3_Fragment | AnyPublicationMetadataFields_AudioMetadataV3_Fragment | AnyPublicationMetadataFields_CheckingInMetadataV3_Fragment | AnyPublicationMetadataFields_EmbedMetadataV3_Fragment | AnyPublicationMetadataFields_EventMetadataV3_Fragment | AnyPublicationMetadataFields_ImageMetadataV3_Fragment | AnyPublicationMetadataFields_LegacyPublicationMetadata_Fragment | AnyPublicationMetadataFields_LinkMetadataV3_Fragment | AnyPublicationMetadataFields_LiveStreamMetadataV3_Fragment | AnyPublicationMetadataFields_MintMetadataV3_Fragment | AnyPublicationMetadataFields_SpaceMetadataV3_Fragment | AnyPublicationMetadataFields_StoryMetadataV3_Fragment | AnyPublicationMetadataFields_TextOnlyMetadataV3_Fragment | AnyPublicationMetadataFields_ThreeDMetadataV3_Fragment | AnyPublicationMetadataFields_TransactionMetadataV3_Fragment | AnyPublicationMetadataFields_VideoMetadataV3_Fragment;

export type ProfileFieldsFragment = { __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null };

type PrimaryPublicationFields_Comment_Fragment = { __typename?: 'Comment', id: any };

type PrimaryPublicationFields_Post_Fragment = { __typename?: 'Post', id: any };

type PrimaryPublicationFields_Quote_Fragment = { __typename?: 'Quote', id: any };

export type PrimaryPublicationFieldsFragment = PrimaryPublicationFields_Comment_Fragment | PrimaryPublicationFields_Post_Fragment | PrimaryPublicationFields_Quote_Fragment;

export type PublicationOperationFieldsFragment = { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } };

export type PostFieldsFragment = { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null };

export type QuoteFieldsFragment = { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null };

export type MirrorFieldsFragment = { __typename?: 'Mirror', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, mirrorOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any } };

export type CommentFieldsFragment = { __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null };

type ReferenceModuleFields_DegreesOfSeparationReferenceModuleSettings_Fragment = { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } };

type ReferenceModuleFields_FollowOnlyReferenceModuleSettings_Fragment = { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } };

type ReferenceModuleFields_UnknownReferenceModuleSettings_Fragment = { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } };

export type ReferenceModuleFieldsFragment = ReferenceModuleFields_DegreesOfSeparationReferenceModuleSettings_Fragment | ReferenceModuleFields_FollowOnlyReferenceModuleSettings_Fragment | ReferenceModuleFields_UnknownReferenceModuleSettings_Fragment;

export type AddPublicationBookmarkMutationVariables = Exact<{
  request: PublicationBookmarkRequest;
}>;


export type AddPublicationBookmarkMutation = { __typename?: 'Mutation', addPublicationBookmark?: any | null };

export type AddReactionMutationVariables = Exact<{
  request: ReactionRequest;
}>;


export type AddReactionMutation = { __typename?: 'Mutation', addReaction?: any | null };

export type AuthMutationVariables = Exact<{
  request: SignedAuthChallenge;
}>;


export type AuthMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthenticationResult', accessToken: any, refreshToken: any } };

export type CreateBlockProfilesTypedDataMutationVariables = Exact<{
  request: BlockRequest;
}>;


export type CreateBlockProfilesTypedDataMutation = { __typename?: 'Mutation', createBlockProfilesTypedData: { __typename?: 'CreateBlockProfilesBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateBlockProfilesEIP712TypedData', value: { __typename?: 'CreateBlockProfilesEIP712TypedDataValue', nonce: any, deadline: any, byProfileId: any, idsOfProfilesToSetBlockStatus: Array<any>, blockStatus: Array<boolean> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, types: { __typename?: 'CreateBlockProfilesEIP712TypedDataTypes', SetBlockStatus: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> } } } };

export type BlockMutationVariables = Exact<{
  request: BlockRequest;
}>;


export type BlockMutation = { __typename?: 'Mutation', block: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type BroadcastOnMomokaMutationVariables = Exact<{
  request: BroadcastRequest;
}>;


export type BroadcastOnMomokaMutation = { __typename?: 'Mutation', broadcastOnMomoka: { __typename?: 'CreateMomokaPublicationResult', id: any, proof: any, momokaId: any } | { __typename: 'RelayError', reason: RelayErrorReasonType } };

export type BroadcastOnchainMutationVariables = Exact<{
  request: BroadcastRequest;
}>;


export type BroadcastOnchainMutation = { __typename?: 'Mutation', broadcastOnchain: { __typename: 'RelayError', reason: RelayErrorReasonType } | { __typename: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateProfileMutationVariables = Exact<{
  request: CreateProfileWithHandleRequest;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfileWithHandle: { __typename: 'CreateProfileWithHandleErrorResult', reason: CreateProfileWithHandleErrorReasonType } | { __typename: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateFollowTypedDataMutationVariables = Exact<{
  request: FollowRequest;
}>;


export type CreateFollowTypedDataMutation = { __typename?: 'Mutation', createFollowTypedData: { __typename?: 'CreateFollowBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateFollowEIP712TypedData', domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, types: { __typename?: 'CreateFollowEIP712TypedDataTypes', Follow: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, value: { __typename?: 'CreateFollowEIP712TypedDataValue', nonce: any, deadline: any, followerProfileId: any, idsOfProfilesToFollow: Array<any>, followTokenIds: Array<any>, datas: Array<any> } } } };

export type FollowMutationVariables = Exact<{
  request: FollowLensManagerRequest;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateSetFollowModuleTypedDataMutationVariables = Exact<{
  request: SetFollowModuleRequest;
}>;


export type CreateSetFollowModuleTypedDataMutation = { __typename?: 'Mutation', createSetFollowModuleTypedData: { __typename?: 'CreateSetFollowModuleBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateSetFollowModuleEIP712TypedData', types: { __typename?: 'CreateSetFollowModuleEIP712TypedDataTypes', SetFollowModule: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateSetFollowModuleEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, followModule: any, followModuleInitData: any } } } };

export type SetFollowModuleMutationVariables = Exact<{
  request: SetFollowModuleRequest;
}>;


export type SetFollowModuleMutation = { __typename?: 'Mutation', setFollowModule: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type HidePublicationMutationVariables = Exact<{
  request: HidePublicationRequest;
}>;


export type HidePublicationMutation = { __typename?: 'Mutation', hidePublication?: any | null };

export type CreateLegacyCollectTypedDataMutationVariables = Exact<{
  request: LegacyCollectRequest;
}>;


export type CreateLegacyCollectTypedDataMutation = { __typename?: 'Mutation', createLegacyCollectTypedData: { __typename?: 'CreateLegacyCollectBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateActOnOpenActionEIP712TypedData', domain: { __typename?: 'EIP712TypedDataDomain', chainId: any, name: string, verifyingContract: any, version: string }, types: { __typename?: 'CreateActOnOpenActionEIP712TypedDataTypes', Act: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, value: { __typename?: 'CreateActOnOpenActionEIP712TypedDataValue', actionModuleAddress: any, actionModuleData: any, actorProfileId: any, deadline: any, nonce: any, publicationActedId: any, publicationActedProfileId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any> } } } };

export type LegacyCollectMutationVariables = Exact<{
  request: LegacyCollectRequest;
}>;


export type LegacyCollectMutation = { __typename?: 'Mutation', legacyCollect: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateHandleLinkToProfileTypedDataMutationVariables = Exact<{
  request: HandleLinkToProfileRequest;
}>;


export type CreateHandleLinkToProfileTypedDataMutation = { __typename?: 'Mutation', createHandleLinkToProfileTypedData: { __typename?: 'CreateHandleLinkToProfileBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateHandleLinkToProfileEIP712TypedData', types: { __typename?: 'CreateHandleLinkToProfileEIP712TypedDataTypes', Link: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateHandleLinkToProfileEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, handleId: any } } } };

export type HandleLinkToProfileMutationVariables = Exact<{
  request: HandleLinkToProfileRequest;
}>;


export type HandleLinkToProfileMutation = { __typename?: 'Mutation', handleLinkToProfile: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateMomokaPostTypedDataMutationVariables = Exact<{
  request: MomokaPostRequest;
}>;


export type CreateMomokaPostTypedDataMutation = { __typename?: 'Mutation', createMomokaPostTypedData: { __typename?: 'CreateMomokaPostBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateMomokaPostEIP712TypedData', types: { __typename?: 'CreateMomokaPostEIP712TypedDataTypes', Post: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateMomokaPostEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, contentURI: any, actionModules: Array<any>, actionModulesInitDatas: Array<any>, referenceModule: any, referenceModuleInitData: any } } } };

export type PostOnMomokaMutationVariables = Exact<{
  request: MomokaPostRequest;
}>;


export type PostOnMomokaMutation = { __typename?: 'Mutation', postOnMomoka: { __typename?: 'CreateMomokaPublicationResult', id: any, proof: any, momokaId: any } | { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } };

export type CreateMomokaCommentTypedDataMutationVariables = Exact<{
  request: MomokaCommentRequest;
}>;


export type CreateMomokaCommentTypedDataMutation = { __typename?: 'Mutation', createMomokaCommentTypedData: { __typename?: 'CreateMomokaCommentBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateMomokaCommentEIP712TypedData', types: { __typename?: 'CreateMomokaCommentEIP712TypedDataTypes', Comment: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateMomokaCommentEIP712TypedDataValue', actionModules: Array<any>, actionModulesInitDatas: Array<any>, contentURI: any, deadline: any, nonce: any, pointedProfileId: any, pointedPubId: any, profileId: any, referenceModule: any, referenceModuleData: any, referenceModuleInitData: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any> } } } };

export type CommentOnMomokaMutationVariables = Exact<{
  request: MomokaCommentRequest;
}>;


export type CommentOnMomokaMutation = { __typename?: 'Mutation', commentOnMomoka: { __typename?: 'CreateMomokaPublicationResult', id: any, proof: any, momokaId: any } | { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } };

export type CreateMomokaQuoteTypedDataMutationVariables = Exact<{
  request: MomokaQuoteRequest;
}>;


export type CreateMomokaQuoteTypedDataMutation = { __typename?: 'Mutation', createMomokaQuoteTypedData: { __typename?: 'CreateMomokaQuoteBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateMomokaQuoteEIP712TypedData', types: { __typename?: 'CreateMomokaQuoteEIP712TypedDataTypes', Quote: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateMomokaQuoteEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, contentURI: any, pointedProfileId: any, pointedPubId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, actionModules: Array<any>, actionModulesInitDatas: Array<any>, referenceModule: any, referenceModuleData: any, referenceModuleInitData: any } } } };

export type QuoteOnMomokaMutationVariables = Exact<{
  request: MomokaQuoteRequest;
}>;


export type QuoteOnMomokaMutation = { __typename?: 'Mutation', quoteOnMomoka: { __typename?: 'CreateMomokaPublicationResult', id: any, proof: any, momokaId: any } | { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } };

export type CreateMomokaMirrorTypedDataMutationVariables = Exact<{
  request: MomokaMirrorRequest;
}>;


export type CreateMomokaMirrorTypedDataMutation = { __typename?: 'Mutation', createMomokaMirrorTypedData: { __typename?: 'CreateMomokaMirrorBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateMomokaMirrorEIP712TypedData', types: { __typename?: 'CreateMomokaMirrorEIP712TypedDataTypes', Mirror: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateMomokaMirrorEIP712TypedDataValue', nonce: any, metadataURI: string, deadline: any, profileId: any, pointedProfileId: any, pointedPubId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, referenceModuleData: any } } } };

export type MirrorOnMomokaMutationVariables = Exact<{
  request: MomokaMirrorRequest;
}>;


export type MirrorOnMomokaMutation = { __typename?: 'Mutation', mirrorOnMomoka: { __typename?: 'CreateMomokaPublicationResult', id: any, proof: any, momokaId: any } | { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } };

export type CreateNftGalleryMutationVariables = Exact<{
  request: NftGalleryCreateRequest;
}>;


export type CreateNftGalleryMutation = { __typename?: 'Mutation', createNftGallery: any };

export type UpdateNftGalleryInfoMutationVariables = Exact<{
  request: NftGalleryUpdateInfoRequest;
}>;


export type UpdateNftGalleryInfoMutation = { __typename?: 'Mutation', updateNftGalleryInfo?: any | null };

export type DeleteNftGalleryMutationVariables = Exact<{
  request: NftGalleryDeleteRequest;
}>;


export type DeleteNftGalleryMutation = { __typename?: 'Mutation', deleteNftGallery?: any | null };

export type AddPublicationNotInterestedMutationVariables = Exact<{
  request: PublicationNotInterestedRequest;
}>;


export type AddPublicationNotInterestedMutation = { __typename?: 'Mutation', addPublicationNotInterested?: any | null };

export type UndoPublicationNotInterestedMutationVariables = Exact<{
  request: PublicationNotInterestedRequest;
}>;


export type UndoPublicationNotInterestedMutation = { __typename?: 'Mutation', undoPublicationNotInterested?: any | null };

export type CreateOnchainPostTypedDataMutationVariables = Exact<{
  request: OnchainPostRequest;
}>;


export type CreateOnchainPostTypedDataMutation = { __typename?: 'Mutation', createOnchainPostTypedData: { __typename?: 'CreateOnchainPostBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateOnchainPostEIP712TypedData', types: { __typename?: 'CreateOnchainPostEIP712TypedDataTypes', Post: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateOnchainPostEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, contentURI: any, actionModules: Array<any>, actionModulesInitDatas: Array<any>, referenceModule: any, referenceModuleInitData: any } } } };

export type PostOnchainMutationVariables = Exact<{
  request: OnchainPostRequest;
}>;


export type PostOnchainMutation = { __typename?: 'Mutation', postOnchain: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateOnchainQuoteTypedDataMutationVariables = Exact<{
  request: OnchainQuoteRequest;
}>;


export type CreateOnchainQuoteTypedDataMutation = { __typename?: 'Mutation', createOnchainQuoteTypedData: { __typename?: 'CreateOnchainQuoteBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateOnchainQuoteEIP712TypedData', types: { __typename?: 'CreateOnchainQuoteEIP712TypedDataTypes', Quote: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateOnchainQuoteEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, contentURI: any, pointedProfileId: any, pointedPubId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, referenceModuleData: any, actionModules: Array<any>, actionModulesInitDatas: Array<any>, referenceModule: any, referenceModuleInitData: any } } } };

export type QuoteOnchainMutationVariables = Exact<{
  request: OnchainQuoteRequest;
}>;


export type QuoteOnchainMutation = { __typename?: 'Mutation', quoteOnchain: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateOnchainCommentTypedDataMutationVariables = Exact<{
  request: OnchainCommentRequest;
}>;


export type CreateOnchainCommentTypedDataMutation = { __typename?: 'Mutation', createOnchainCommentTypedData: { __typename?: 'CreateOnchainCommentBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateOnchainCommentEIP712TypedData', types: { __typename?: 'CreateOnchainCommentEIP712TypedDataTypes', Comment: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateOnchainCommentEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, contentURI: any, pointedProfileId: any, pointedPubId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, referenceModuleData: any, actionModules: Array<any>, actionModulesInitDatas: Array<any>, referenceModule: any, referenceModuleInitData: any } } } };

export type CommentOnchainMutationVariables = Exact<{
  request: OnchainCommentRequest;
}>;


export type CommentOnchainMutation = { __typename?: 'Mutation', commentOnchain: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateOnchainMirrorTypedDataMutationVariables = Exact<{
  request: OnchainMirrorRequest;
}>;


export type CreateOnchainMirrorTypedDataMutation = { __typename?: 'Mutation', createOnchainMirrorTypedData: { __typename?: 'CreateOnchainMirrorBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateOnchainMirrorEIP712TypedData', domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, types: { __typename?: 'CreateOnchainMirrorEIP712TypedDataTypes', Mirror: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, value: { __typename?: 'CreateOnchainMirrorEIP712TypedDataValue', nonce: any, metadataURI: string, deadline: any, profileId: any, pointedProfileId: any, pointedPubId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, referenceModuleData: any } } } };

export type MirrorOnchainMutationVariables = Exact<{
  request: OnchainMirrorRequest;
}>;


export type MirrorOnchainMutation = { __typename?: 'Mutation', mirrorOnchain: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateActOnOpenActionTypedDataMutationVariables = Exact<{
  request: ActOnOpenActionRequest;
}>;


export type CreateActOnOpenActionTypedDataMutation = { __typename?: 'Mutation', createActOnOpenActionTypedData: { __typename?: 'CreateActOnOpenActionBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateActOnOpenActionEIP712TypedData', types: { __typename?: 'CreateActOnOpenActionEIP712TypedDataTypes', Act: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateActOnOpenActionEIP712TypedDataValue', nonce: any, deadline: any, publicationActedProfileId: any, publicationActedId: any, actorProfileId: any, referrerProfileIds: Array<any>, referrerPubIds: Array<any>, actionModuleAddress: any, actionModuleData: any } } } };

export type ActOnOpenActionMutationVariables = Exact<{
  request: ActOnOpenActionLensManagerRequest;
}>;


export type ActOnOpenActionMutation = { __typename?: 'Mutation', actOnOpenAction: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type AddProfileInterestsMutationVariables = Exact<{
  request: ProfileInterestsRequest;
}>;


export type AddProfileInterestsMutation = { __typename?: 'Mutation', addProfileInterests?: any | null };

export type RemoveProfileInterestsMutationVariables = Exact<{
  request: ProfileInterestsRequest;
}>;


export type RemoveProfileInterestsMutation = { __typename?: 'Mutation', removeProfileInterests?: any | null };

export type CreateChangeProfileManagersTypedDataMutationVariables = Exact<{
  request: ChangeProfileManagersRequest;
}>;


export type CreateChangeProfileManagersTypedDataMutation = { __typename?: 'Mutation', createChangeProfileManagersTypedData: { __typename?: 'CreateChangeProfileManagersBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateChangeProfileManagersEIP712TypedData', domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, types: { __typename?: 'CreateChangeProfileManagersEIP712TypedDataTypes', ChangeDelegatedExecutorsConfig: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, value: { __typename?: 'CreateChangeProfileManagersEIP712TypedDataValue', nonce: any, deadline: any, delegatorProfileId: any, delegatedExecutors: Array<any>, approvals: Array<boolean>, configNumber: number, switchToGivenConfig: boolean } } } };

export type RefreshPublicationMetadataMutationVariables = Exact<{
  request: RefreshPublicationMetadataRequest;
}>;


export type RefreshPublicationMetadataMutation = { __typename?: 'Mutation', refreshPublicationMetadata: { __typename?: 'RefreshPublicationMetadataResult', result: RefreshPublicationMetadataResultType } };

export type RefreshMutationVariables = Exact<{
  request: RefreshRequest;
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthenticationResult', accessToken: any, refreshToken: any } };

export type RemovePublicationBookmarkMutationVariables = Exact<{
  request: PublicationBookmarkRequest;
}>;


export type RemovePublicationBookmarkMutation = { __typename?: 'Mutation', removePublicationBookmark?: any | null };

export type RemoveReactionMutationVariables = Exact<{
  request: ReactionRequest;
}>;


export type RemoveReactionMutation = { __typename?: 'Mutation', removeReaction?: any | null };

export type DismissRecommendedProfilesMutationVariables = Exact<{
  request: DismissRecommendedProfilesRequest;
}>;


export type DismissRecommendedProfilesMutation = { __typename?: 'Mutation', dismissRecommendedProfiles?: any | null };

export type ReportPublicationMutationVariables = Exact<{
  request: ReportPublicationRequest;
}>;


export type ReportPublicationMutation = { __typename?: 'Mutation', reportPublication?: any | null };

export type CreateOnchainSetProfileMetadataTypedDataMutationVariables = Exact<{
  request: OnchainSetProfileMetadataRequest;
}>;


export type CreateOnchainSetProfileMetadataTypedDataMutation = { __typename?: 'Mutation', createOnchainSetProfileMetadataTypedData: { __typename?: 'CreateOnchainSetProfileMetadataBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedData', domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, types: { __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataTypes', SetProfileMetadataURI: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, value: { __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, metadataURI: any } } } };

export type SetProfileMetadataMutationVariables = Exact<{
  request: OnchainSetProfileMetadataRequest;
}>;


export type SetProfileMetadataMutation = { __typename?: 'Mutation', setProfileMetadata: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateUnblockProfilesTypedDataMutationVariables = Exact<{
  request: UnblockRequest;
}>;


export type CreateUnblockProfilesTypedDataMutation = { __typename?: 'Mutation', createUnblockProfilesTypedData: { __typename?: 'CreateUnblockProfilesBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateUnblockProfilesEIP712TypedData', types: { __typename?: 'CreateUnblockProfilesEIP712TypedDataTypes', SetBlockStatus: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateUnblockProfilesEIP712TypedDataValue', nonce: any, deadline: any, byProfileId: any, idsOfProfilesToSetBlockStatus: Array<any>, blockStatus: Array<boolean> } } } };

export type UnblockMutationVariables = Exact<{
  request: UnblockRequest;
}>;


export type UnblockMutation = { __typename?: 'Mutation', unblock: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateUnfollowTypedDataMutationVariables = Exact<{
  request: UnfollowRequest;
}>;


export type CreateUnfollowTypedDataMutation = { __typename?: 'Mutation', createUnfollowTypedData: { __typename?: 'CreateUnfollowBroadcastItemResult', expiresAt: any, id: any, typedData: { __typename?: 'CreateUnfollowEIP712TypedData', types: { __typename?: 'CreateUnfollowEIP712TypedDataTypes', Unfollow: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateUnfollowEIP712TypedDataValue', nonce: any, deadline: any, unfollowerProfileId: any, idsOfProfilesToUnfollow: Array<any> } } } };

export type UnfollowMutationVariables = Exact<{
  request: UnfollowRequest;
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type CreateHandleUnlinkFromProfileTypedDataMutationVariables = Exact<{
  request: HandleUnlinkFromProfileRequest;
}>;


export type CreateHandleUnlinkFromProfileTypedDataMutation = { __typename?: 'Mutation', createHandleUnlinkFromProfileTypedData: { __typename?: 'CreateHandleUnlinkFromProfileBroadcastItemResult', id: any, expiresAt: any, typedData: { __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedData', types: { __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedDataTypes', Unlink: Array<{ __typename?: 'EIP712TypedDataField', name: string, type: string }> }, domain: { __typename?: 'EIP712TypedDataDomain', name: string, chainId: any, version: string, verifyingContract: any }, value: { __typename?: 'CreateHandleUnlinkFromProfileEIP712TypedDataValue', nonce: any, deadline: any, profileId: any, handleId: any } } } };

export type HandleUnlinkFromProfileMutationVariables = Exact<{
  request: HandleUnlinkFromProfileRequest;
}>;


export type HandleUnlinkFromProfileMutation = { __typename?: 'Mutation', handleUnlinkFromProfile: { __typename?: 'LensProfileManagerRelayError', reason: LensProfileManagerRelayErrorReasonType } | { __typename?: 'RelaySuccess', txHash?: any | null, txId?: any | null } };

export type ProfilesQueryVariables = Exact<{
  request: ProfilesRequest;
}>;


export type ProfilesQuery = { __typename?: 'Query', profiles: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', next?: any | null, prev?: any | null } } };

export type PublicationBookmarksQueryVariables = Exact<{
  request: PublicationBookmarksRequest;
}>;


export type PublicationBookmarksQuery = { __typename?: 'Query', publicationBookmarks: { __typename?: 'PaginatedPublicationsResult', items: Array<{ __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Mirror', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, mirrorOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any } } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type ChallengeQueryVariables = Exact<{
  request: ChallengeRequest;
}>;


export type ChallengeQuery = { __typename?: 'Query', challenge: { __typename?: 'AuthChallengeResult', id: any, text: string } };

export type ExploreProfilesQueryVariables = Exact<{
  request: ExploreProfilesRequest;
}>;


export type ExploreProfilesQuery = { __typename?: 'Query', exploreProfiles: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type ExplorePublicationsQueryVariables = Exact<{
  request: ExplorePublicationRequest;
}>;


export type ExplorePublicationsQuery = { __typename?: 'Query', explorePublications: { __typename?: 'PaginatedExplorePublicationResult', items: Array<{ __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type FeedHighlightsQueryVariables = Exact<{
  request: FeedHighlightsRequest;
}>;


export type FeedHighlightsQuery = { __typename?: 'Query', feedHighlights: { __typename?: 'PaginatedFeedHighlightsResult', items: Array<{ __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type FollowersQueryVariables = Exact<{
  request: FollowersRequest;
}>;


export type FollowersQuery = { __typename?: 'Query', followers: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type FollowingQueryVariables = Exact<{
  request: FollowingRequest;
}>;


export type FollowingQuery = { __typename?: 'Query', following: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', next?: any | null, prev?: any | null } } };

export type ProfileManagersQueryVariables = Exact<{
  request: ProfileManagersRequest;
}>;


export type ProfileManagersQuery = { __typename?: 'Query', profileManagers: { __typename?: 'PaginatedProfileManagersResult', items: Array<{ __typename?: 'ProfilesManagedResult', address: any }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type MutualFollowersQueryVariables = Exact<{
  request: MutualFollowersRequest;
}>;


export type MutualFollowersQuery = { __typename?: 'Query', mutualFollowers: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type NotificationsQueryVariables = Exact<{
  request: NotificationRequest;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotificationResult', items: Array<{ __typename?: 'ActedNotification', id: any, actions: Array<{ __typename?: 'OpenActionProfileActed', actedAt: any, by: { __typename?: 'Profile', handle?: any | null, id: any }, action: { __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any } }>, publication: { __typename?: 'Comment', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } | { __typename?: 'Mirror', id: any } | { __typename?: 'Post', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } | { __typename?: 'Quote' } } | { __typename?: 'CommentNotification', id: any, comment: { __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } } | { __typename?: 'FollowNotification', id: any, followers: Array<{ __typename?: 'Profile', id: any, handle?: any | null }> } | { __typename?: 'MentionNotification', id: any, publication: { __typename?: 'Comment', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } | { __typename?: 'Post', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } | { __typename?: 'Quote', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } } | { __typename?: 'MirrorNotification', id: any, mirrors: Array<{ __typename?: 'ProfileMirrorResult', mirrorId: any, mirroredAt: any, profile: { __typename?: 'Profile', id: any, handle?: any | null } }>, publication: { __typename?: 'Comment', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any, by: { __typename?: 'Profile', id: any, handle?: any | null } } } | { __typename?: 'QuoteNotification', id: any, quote: { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } } | { __typename?: 'ReactionNotification', id: any, publication: { __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }, reactions: Array<{ __typename?: 'ProfileReactedResult', profile: { __typename?: 'Profile', id: any, handle?: any | null }, reactions: Array<{ __typename?: 'ReactedResult', reactedAt: any, reaction: PublicationReactionType }> }> }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type OwnedHandlesQueryVariables = Exact<{
  request: OwnedHandlesRequest;
}>;


export type OwnedHandlesQuery = { __typename?: 'Query', ownedHandles: { __typename?: 'PaginatedHandlesResult', items: Array<{ __typename?: 'HandleResult', handle: any }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type PoapEventQueryVariables = Exact<{
  request: PoapEventQueryRequest;
}>;


export type PoapEventQuery = { __typename?: 'Query', poapEvent?: { __typename?: 'PoapEvent', id: any } | null };

export type PoapHoldersQueryVariables = Exact<{
  request: PoapHoldersQueryRequest;
}>;


export type PoapHoldersQuery = { __typename?: 'Query', poapHolders: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type MutualPoapsQueryVariables = Exact<{
  request: MutualPoapsQueryRequest;
}>;


export type MutualPoapsQuery = { __typename?: 'Query', mutualPoaps: { __typename?: 'PaginatedPoapEventResult', items: Array<{ __typename?: 'PoapEvent', id: any }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type ProfileQueryVariables = Exact<{
  request: ProfileRequest;
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null } | null };

export type FeedQueryVariables = Exact<{
  request: FeedRequest;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'PaginatedFeedResult', items: Array<{ __typename?: 'FeedItem', id: string, root: { __typename: 'Comment', id: any } | { __typename: 'Post', id: any } | { __typename: 'Quote', id: any }, mirrors: Array<{ __typename: 'Mirror', id: any }>, acted: Array<{ __typename?: 'OpenActionProfileActed', actedAt: any, by: { __typename?: 'Profile', id: any }, action: { __typename: 'KnownCollectOpenActionResult' } | { __typename: 'UnknownOpenActionResult' } }>, reactions: Array<{ __typename?: 'ReactionEvent', reaction: PublicationReactionType, createdAt: any, by: { __typename?: 'Profile', id: any } }>, comments: Array<{ __typename: 'Comment', id: any }> }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type FollowRevenuesQueryVariables = Exact<{
  request: FollowRevenueRequest;
}>;


export type FollowRevenuesQuery = { __typename?: 'Query', followRevenues: { __typename?: 'FollowRevenueResult', revenues: Array<{ __typename?: 'RevenueAggregate', total: { __typename?: 'Amount', value: string, asset: { __typename?: 'Erc20', name: string, symbol: string, decimals: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } } }> } };

export type ProfileRecommendationsQueryVariables = Exact<{
  request: ProfileRecommendationsRequest;
}>;


export type ProfileRecommendationsQuery = { __typename?: 'Query', profileRecommendations: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type ProfilesManagedQueryVariables = Exact<{
  request: ProfilesManagedRequest;
}>;


export type ProfilesManagedQuery = { __typename?: 'Query', profilesManaged: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type PublicationQueryVariables = Exact<{
  request: PublicationRequest;
}>;


export type PublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Mirror', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, mirrorOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any } } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | null };

export type PublicationsTagsQueryVariables = Exact<{
  request: PublicationsTagsRequest;
}>;


export type PublicationsTagsQuery = { __typename?: 'Query', publicationsTags: { __typename?: 'PaginatedPublicationsTagsResult', items: Array<{ __typename?: 'TagResult', tag: string, total: number }>, pageInfo: { __typename?: 'PaginatedResultInfo', next?: any | null, prev?: any | null } } };

export type PublicationsQueryVariables = Exact<{
  request: PublicationsRequest;
}>;


export type PublicationsQuery = { __typename?: 'Query', publications: { __typename?: 'PaginatedPublicationsResult', items: Array<{ __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Mirror', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, mirrorOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any } } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type RevenueFromPublicationsQueryVariables = Exact<{
  request: RevenueFromPublicationsRequest;
}>;


export type RevenueFromPublicationsQuery = { __typename?: 'Query', revenueFromPublications: { __typename?: 'PaginatedRevenueFromPublicationsResult', items: Array<{ __typename?: 'PublicationRevenue', publication: { __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Mirror', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, mirrorOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any } } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }, revenue: Array<{ __typename?: 'RevenueAggregate', total: { __typename?: 'Amount', value: string, asset: { __typename?: 'Erc20', name: string, symbol: string, decimals: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } } }> }> } };

export type SearchProfilesQueryVariables = Exact<{
  request: ProfileSearchRequest;
}>;


export type SearchProfilesQuery = { __typename?: 'Query', searchProfiles: { __typename?: 'PaginatedProfileResult', items: Array<{ __typename?: 'Profile', id: any, handle?: any | null, txHash: any, createdAt: any, invitesLeft?: number | null, interests: Array<string>, sponsor: boolean, lensManager: boolean, ownedBy: { __typename?: 'NetworkAddress', address: any, chainId: any }, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, bio?: any | null, rawURI: any, app?: any | null, picture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null, coverPicture?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any }, optimized?: { __typename?: 'Image', uri: any } | null } | null, attributes: Array<{ __typename?: 'Attribute', type?: AttributeType | null, key: string, value: string }> } | null, stats: { __typename?: 'ProfileStats', id: any, followers: number, following: number, comments: number, mirrors: number, quotes: number, publications: number, reactions: number, reacted: number, countOpenActions: number, posts: number }, operations: { __typename?: 'ProfileOperations', id: any, canFollow: TriStateValue, canBlock: boolean, canUnblock: boolean, canUnfollow: boolean, isBlockedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowedByMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, isFollowingMe: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean } }, onchainIdentity: { __typename?: 'ProfileOnchainIdentity', proofOfHumanity: boolean, ens?: { __typename?: 'EnsOnchainIdentity', name?: any | null } | null, sybilDotOrg: { __typename?: 'SybilDotOrgIdentity', verified: boolean, source?: { __typename?: 'SybilDotOrgIdentitySource', twitter: { __typename?: 'SybilDotOrgTwitterIdentity', handle?: string | null } } | null }, worldcoin: { __typename?: 'WorldcoinIdentity', isHuman: boolean } }, followNftAddress?: { __typename?: 'NetworkAddress', address: any, chainId: any } | null, followModule?: { __typename: 'FeeFollowModuleSettings' } | { __typename: 'RevertFollowModuleSettings' } | { __typename: 'UnknownFollowModuleSettings' } | null, guardian?: { __typename?: 'ProfileGuardianResult', protected: boolean, cooldownEndsOn?: any | null } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type SearchPublicationsQueryVariables = Exact<{
  request: PublicationSearchRequest;
}>;


export type SearchPublicationsQuery = { __typename?: 'Query', searchPublications: { __typename?: 'PaginatedPublicationPrimaryResult', items: Array<{ __typename?: 'Comment', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, root: { __typename?: 'Post', id: any }, commentOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, firstComment?: { __typename?: 'Comment', id: any } | null, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Post', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null } | { __typename?: 'Quote', id: any, isHidden: boolean, txHash?: any | null, createdAt: any, publishedOn?: { __typename?: 'App', id: any } | null, momoka?: { __typename?: 'MomokaInfo', proof: any } | null, by: { __typename?: 'Profile', id: any, handle?: any | null }, stats: { __typename?: 'PublicationStats', comments: number, mirrors: number, quotes: number }, operations: { __typename?: 'PublicationOperations', isNotInterested: boolean, hasBookmarked: boolean, hasReported: boolean, canAct: TriStateValue, hasReacted: boolean, canComment: TriStateValue, canMirror: TriStateValue, hasMirrored: boolean, hasActed: { __typename?: 'OptimisticStatusResult', value: boolean, isFinalisedOnchain: boolean }, actedOn: Array<{ __typename?: 'KnownCollectOpenActionResult', type: CollectOpenActionModuleType } | { __typename?: 'UnknownOpenActionResult', address: any, category?: OpenActionCategoryType | null, initReturnData?: any | null }>, canDecrypt: { __typename?: 'CanDecryptResponse', result: boolean, reasons?: Array<DecryptFailReasonType> | null, extraDetails?: string | null } }, quoteOn: { __typename?: 'Comment', id: any } | { __typename?: 'Post', id: any } | { __typename?: 'Quote', id: any }, metadata: { __typename?: 'ArticleMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'AudioMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'CheckingInMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EmbedMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'EventMetadataV3', contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ImageMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } } | { __typename?: 'LegacyPublicationMetadata', locale: any, tags?: Array<string> | null, mainContentFocus: LegacyPublicationMetadataMainFocusType, contentWarning?: PublicationContentWarningType | null, content: any, media?: Array<{ __typename?: 'LegacyAudioItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, audio: { __typename?: 'AudioSet', raw: { __typename?: 'Audio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null } } | { __typename?: 'LegacyImageItem', image: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } } | { __typename?: 'LegacyVideoItem', cover?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null, video: { __typename?: 'VideoSet', raw: { __typename?: 'Video', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null } }> | null, marketplace?: { __typename?: 'MarketplaceMetadata', name?: string | null, description?: any | null, animationUrl?: any | null, attributes?: Array<{ __typename?: 'PublicationMarketplaceMetadataAttribute', displayType?: MarketplaceMetadataAttributeDisplayType | null, traitType?: string | null, value?: string | null }> | null, image?: { __typename?: 'ImageSet', raw: { __typename?: 'Image', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null, width?: number | null, height?: number | null } | null } | null } | null, encryptedWith?: { __typename?: 'PublicationMetadataV2Encryption', encryptionKey: any, encryptedFields: { __typename?: 'PublicationMetadataV2EncryptedFields', content?: any | null, image?: any | null, animationUrl?: any | null, externalUrl?: any | null, media?: Array<{ __typename?: 'EncryptedMedia', uri: any, mimeType?: any | null, cover?: any | null }> | null } } | null } | { __typename?: 'LinkMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, startsAt: any, endsAt: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'MintMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'SpaceMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'StoryMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaAudio', duration?: number | null, license?: PublicationMetadataLicenseType | null, credits?: any | null, artist?: any | null, genre?: any | null, recordLabel?: any | null, lyrics?: any | null, audio: { __typename?: 'EncryptableAudioSet', raw: { __typename?: 'EncryptableAudio', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Audio', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } | { __typename?: 'PublicationMetadataMediaImage', license?: PublicationMetadataLicenseType | null, altTag?: any | null, image: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } } | { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } } | { __typename?: 'TextOnlyMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'ThreeDMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'TransactionMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null } | { __typename?: 'VideoMetadataV3', content: any, contentWarning?: PublicationContentWarningType | null, tags?: Array<string> | null, locale: any, attributes?: Array<{ __typename?: 'PublicationMetadataV3Attribute', key: string, value: string }> | null, asset: { __typename?: 'PublicationMetadataMediaVideo', duration?: number | null, license?: PublicationMetadataLicenseType | null, altTag?: any | null, video: { __typename?: 'EncryptableVideoSet', raw: { __typename?: 'EncryptableVideo', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Video', uri: any, mimeType?: any | null } | null }, cover?: { __typename?: 'EncryptableImageSet', raw: { __typename?: 'EncryptableImage', uri: any, mimeType?: any | null }, optimized?: { __typename?: 'Image', uri: any, mimeType?: any | null } | null } | null } }, referenceModule?: { __typename?: 'DegreesOfSeparationReferenceModuleSettings', commentsRestricted: boolean, mirrorsRestricted: boolean, degreesOfSeparation: number, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'FollowOnlyReferenceModuleSettings', contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | { __typename?: 'UnknownReferenceModuleSettings', referenceModuleReturnData: any, contract: { __typename?: 'NetworkAddress', address: any, chainId: any } } | null }>, pageInfo: { __typename?: 'PaginatedResultInfo', prev?: any | null, next?: any | null } } };

export type UserSigNoncesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserSigNoncesQuery = { __typename?: 'Query', userSigNonces: { __typename?: 'UserSigNonces', lensHubOnchainSigNonce: any, lensTokenHandleRegistryOnchainSigNonce: any } };

export type VerifyQueryVariables = Exact<{
  request: VerifyRequest;
}>;


export type VerifyQuery = { __typename?: 'Query', verify: boolean };

export const NetworkAddressFieldsFragmentDoc = gql`
    fragment NetworkAddressFields on NetworkAddress {
  address
  chainId
}
    `;
export const Erc20FieldsFragmentDoc = gql`
    fragment Erc20Fields on Asset {
  ... on Erc20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddressFields
    }
  }
}
    ${NetworkAddressFieldsFragmentDoc}`;
export const AmountFieldsFragmentDoc = gql`
    fragment AmountFields on Amount {
  asset {
    ...Erc20Fields
  }
  value
}
    ${Erc20FieldsFragmentDoc}`;
export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on Profile {
  id
  handle
  ownedBy {
    address
    chainId
  }
  txHash
  createdAt
  invitesLeft
  interests
  sponsor
  lensManager
  metadata {
    displayName
    bio
    rawURI
    app
    picture {
      ... on ImageSet {
        raw {
          uri
        }
        optimized {
          uri
        }
      }
    }
    coverPicture {
      raw {
        uri
      }
      optimized {
        uri
      }
    }
    attributes {
      type
      key
      value
    }
  }
  stats {
    id
    followers
    following
    comments
    mirrors
    quotes
    publications
    reactions
    reacted
    countOpenActions
    posts
  }
  operations {
    id
    isBlockedByMe {
      value
      isFinalisedOnchain
    }
    isFollowedByMe {
      value
      isFinalisedOnchain
    }
    isFollowingMe {
      value
      isFinalisedOnchain
    }
    canFollow
    canBlock
    canUnblock
    canUnfollow
  }
  onchainIdentity {
    proofOfHumanity
    ens {
      name
    }
    sybilDotOrg {
      verified
      source {
        twitter {
          handle
        }
      }
    }
    worldcoin {
      isHuman
    }
  }
  followNftAddress {
    address
    chainId
  }
  followModule {
    __typename
  }
  guardian {
    protected
    cooldownEndsOn
  }
}
    `;
export const PublicationOperationFieldsFragmentDoc = gql`
    fragment PublicationOperationFields on PublicationOperations {
  isNotInterested
  hasBookmarked
  hasReported
  canAct
  hasActed {
    value
    isFinalisedOnchain
  }
  actedOn {
    ... on KnownCollectOpenActionResult {
      type
    }
    ... on UnknownOpenActionResult {
      address
      category
      initReturnData
    }
  }
  hasReacted
  canComment
  canMirror
  hasMirrored
  canDecrypt {
    result
    reasons
    extraDetails
  }
}
    `;
export const ImageSetFieldsFragmentDoc = gql`
    fragment ImageSetFields on ImageSet {
  raw {
    uri
    mimeType
  }
  optimized {
    uri
    mimeType
    width
    height
  }
}
    `;
export const MediaFieldsFragmentDoc = gql`
    fragment MediaFields on LegacyMediaItem {
  ... on LegacyAudioItem {
    cover {
      ...ImageSetFields
    }
    audio {
      raw {
        uri
        mimeType
      }
      optimized {
        uri
        mimeType
      }
    }
  }
  ... on LegacyImageItem {
    image {
      ...ImageSetFields
    }
  }
  ... on LegacyVideoItem {
    cover {
      ...ImageSetFields
    }
    video {
      raw {
        uri
        mimeType
      }
      optimized {
        uri
        mimeType
      }
    }
  }
}
    ${ImageSetFieldsFragmentDoc}`;
export const LegacyPublicationMetadataFieldsFragmentDoc = gql`
    fragment LegacyPublicationMetadataFields on LegacyPublicationMetadata {
  locale
  tags
  mainContentFocus
  contentWarning
  content
  media {
    ...MediaFields
  }
  marketplace {
    name
    description
    attributes {
      displayType
      traitType
      value
    }
    animationUrl
    image {
      raw {
        uri
        mimeType
      }
      optimized {
        uri
        mimeType
        width
        height
      }
    }
  }
  encryptedWith {
    encryptionKey
    encryptedFields {
      content
      image
      media {
        uri
        mimeType
        cover
      }
      animationUrl
      externalUrl
    }
  }
}
    ${MediaFieldsFragmentDoc}`;
export const PublicationMetadataV3AttributeFieldsFragmentDoc = gql`
    fragment PublicationMetadataV3AttributeFields on PublicationMetadataV3Attribute {
  key
  value
}
    `;
export const ArticleMetadataV3FieldsFragmentDoc = gql`
    fragment ArticleMetadataV3Fields on ArticleMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const EncryptableAudioFieldsFragmentDoc = gql`
    fragment EncryptableAudioFields on EncryptableAudio {
  uri
  mimeType
}
    `;
export const AudioFieldsFragmentDoc = gql`
    fragment AudioFields on Audio {
  uri
  mimeType
}
    `;
export const EncryptableAudioSetFieldsFragmentDoc = gql`
    fragment EncryptableAudioSetFields on EncryptableAudioSet {
  raw {
    ...EncryptableAudioFields
  }
  optimized {
    ...AudioFields
  }
}
    ${EncryptableAudioFieldsFragmentDoc}
${AudioFieldsFragmentDoc}`;
export const EncryptableImageFieldsFragmentDoc = gql`
    fragment EncryptableImageFields on EncryptableImage {
  uri
  mimeType
}
    `;
export const ImageFieldsFragmentDoc = gql`
    fragment ImageFields on Image {
  uri
  mimeType
}
    `;
export const EncryptableImageSetFieldsFragmentDoc = gql`
    fragment EncryptableImageSetFields on EncryptableImageSet {
  raw {
    ...EncryptableImageFields
  }
  optimized {
    ...ImageFields
  }
}
    ${EncryptableImageFieldsFragmentDoc}
${ImageFieldsFragmentDoc}`;
export const PublicationMetadataMediaAudioFieldsFragmentDoc = gql`
    fragment PublicationMetadataMediaAudioFields on PublicationMetadataMediaAudio {
  audio {
    ...EncryptableAudioSetFields
  }
  cover {
    ...EncryptableImageSetFields
  }
  duration
  license
  credits
  artist
  genre
  recordLabel
  lyrics
}
    ${EncryptableAudioSetFieldsFragmentDoc}
${EncryptableImageSetFieldsFragmentDoc}`;
export const AudioMetadataV3FieldsFragmentDoc = gql`
    fragment AudioMetadataV3Fields on AudioMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  asset {
    ...PublicationMetadataMediaAudioFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}
${PublicationMetadataMediaAudioFieldsFragmentDoc}`;
export const CheckingInMetadataV3FieldsFragmentDoc = gql`
    fragment CheckingInMetadataV3Fields on CheckingInMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const EmbedMetadataV3FieldsFragmentDoc = gql`
    fragment EmbedMetadataV3Fields on EmbedMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const EventMetadataV3FieldsFragmentDoc = gql`
    fragment EventMetadataV3Fields on EventMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  contentWarning
  tags
  locale
  startsAt
  endsAt
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const PublicationMetadataMediaImageFieldsFragmentDoc = gql`
    fragment PublicationMetadataMediaImageFields on PublicationMetadataMediaImage {
  image {
    ...EncryptableImageSetFields
  }
  license
  altTag
}
    ${EncryptableImageSetFieldsFragmentDoc}`;
export const ImageMetadataV3FieldsFragmentDoc = gql`
    fragment ImageMetadataV3Fields on ImageMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  asset {
    ...PublicationMetadataMediaImageFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}
${PublicationMetadataMediaImageFieldsFragmentDoc}`;
export const LinkMetadataV3FieldsFragmentDoc = gql`
    fragment LinkMetadataV3Fields on LinkMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const LiveStreamMetadataV3FieldsFragmentDoc = gql`
    fragment LiveStreamMetadataV3Fields on LiveStreamMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
  startsAt
  endsAt
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const MintMetadataV3FieldsFragmentDoc = gql`
    fragment MintMetadataV3Fields on MintMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const SpaceMetadataV3FieldsFragmentDoc = gql`
    fragment SpaceMetadataV3Fields on SpaceMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const EncryptableVideoFieldsFragmentDoc = gql`
    fragment EncryptableVideoFields on EncryptableVideo {
  uri
  mimeType
}
    `;
export const VideoFieldsFragmentDoc = gql`
    fragment VideoFields on Video {
  uri
  mimeType
}
    `;
export const EncryptableVideoSetFieldsFragmentDoc = gql`
    fragment EncryptableVideoSetFields on EncryptableVideoSet {
  raw {
    ...EncryptableVideoFields
  }
  optimized {
    ...VideoFields
  }
}
    ${EncryptableVideoFieldsFragmentDoc}
${VideoFieldsFragmentDoc}`;
export const PublicationMetadataMediaVideoFieldsFragmentDoc = gql`
    fragment PublicationMetadataMediaVideoFields on PublicationMetadataMediaVideo {
  video {
    ...EncryptableVideoSetFields
  }
  cover {
    ...EncryptableImageSetFields
  }
  duration
  license
  altTag
}
    ${EncryptableVideoSetFieldsFragmentDoc}
${EncryptableImageSetFieldsFragmentDoc}`;
export const StoryMetadataV3FieldsFragmentDoc = gql`
    fragment StoryMetadataV3Fields on StoryMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  asset {
    ... on PublicationMetadataMediaAudio {
      ...PublicationMetadataMediaAudioFields
    }
    ... on PublicationMetadataMediaImage {
      ...PublicationMetadataMediaImageFields
    }
    ... on PublicationMetadataMediaVideo {
      ...PublicationMetadataMediaVideoFields
    }
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}
${PublicationMetadataMediaAudioFieldsFragmentDoc}
${PublicationMetadataMediaImageFieldsFragmentDoc}
${PublicationMetadataMediaVideoFieldsFragmentDoc}`;
export const TextOnlyMetadataV3FieldsFragmentDoc = gql`
    fragment TextOnlyMetadataV3Fields on TextOnlyMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const ThreeDMetadataV3FieldsFragmentDoc = gql`
    fragment ThreeDMetadataV3Fields on ThreeDMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const TransactionMetadataV3FieldsFragmentDoc = gql`
    fragment TransactionMetadataV3Fields on TransactionMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}`;
export const VideoMetadataV3FieldsFragmentDoc = gql`
    fragment VideoMetadataV3Fields on VideoMetadataV3 {
  attributes {
    ...PublicationMetadataV3AttributeFields
  }
  asset {
    ...PublicationMetadataMediaVideoFields
  }
  content
  contentWarning
  tags
  locale
}
    ${PublicationMetadataV3AttributeFieldsFragmentDoc}
${PublicationMetadataMediaVideoFieldsFragmentDoc}`;
export const AnyPublicationMetadataFieldsFragmentDoc = gql`
    fragment AnyPublicationMetadataFields on PublicationMetadata {
  ... on LegacyPublicationMetadata {
    ...LegacyPublicationMetadataFields
  }
  ... on ArticleMetadataV3 {
    ...ArticleMetadataV3Fields
  }
  ... on AudioMetadataV3 {
    ...AudioMetadataV3Fields
  }
  ... on CheckingInMetadataV3 {
    ...CheckingInMetadataV3Fields
  }
  ... on EmbedMetadataV3 {
    ...EmbedMetadataV3Fields
  }
  ... on EventMetadataV3 {
    ...EventMetadataV3Fields
  }
  ... on ImageMetadataV3 {
    ...ImageMetadataV3Fields
  }
  ... on LinkMetadataV3 {
    ...LinkMetadataV3Fields
  }
  ... on LiveStreamMetadataV3 {
    ...LiveStreamMetadataV3Fields
  }
  ... on MintMetadataV3 {
    ...MintMetadataV3Fields
  }
  ... on SpaceMetadataV3 {
    ...SpaceMetadataV3Fields
  }
  ... on StoryMetadataV3 {
    ...StoryMetadataV3Fields
  }
  ... on TextOnlyMetadataV3 {
    ...TextOnlyMetadataV3Fields
  }
  ... on ThreeDMetadataV3 {
    ...ThreeDMetadataV3Fields
  }
  ... on TransactionMetadataV3 {
    ...TransactionMetadataV3Fields
  }
  ... on VideoMetadataV3 {
    ...VideoMetadataV3Fields
  }
}
    ${LegacyPublicationMetadataFieldsFragmentDoc}
${ArticleMetadataV3FieldsFragmentDoc}
${AudioMetadataV3FieldsFragmentDoc}
${CheckingInMetadataV3FieldsFragmentDoc}
${EmbedMetadataV3FieldsFragmentDoc}
${EventMetadataV3FieldsFragmentDoc}
${ImageMetadataV3FieldsFragmentDoc}
${LinkMetadataV3FieldsFragmentDoc}
${LiveStreamMetadataV3FieldsFragmentDoc}
${MintMetadataV3FieldsFragmentDoc}
${SpaceMetadataV3FieldsFragmentDoc}
${StoryMetadataV3FieldsFragmentDoc}
${TextOnlyMetadataV3FieldsFragmentDoc}
${ThreeDMetadataV3FieldsFragmentDoc}
${TransactionMetadataV3FieldsFragmentDoc}
${VideoMetadataV3FieldsFragmentDoc}`;
export const ReferenceModuleFieldsFragmentDoc = gql`
    fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    contract {
      address
      chainId
    }
  }
  ... on UnknownReferenceModuleSettings {
    contract {
      address
      chainId
    }
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    contract {
      address
      chainId
    }
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}
    `;
export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
  publishedOn {
    id
  }
  isHidden
  momoka {
    proof
  }
  txHash
  createdAt
  by {
    id
    handle
  }
  stats {
    comments
    mirrors
    quotes
  }
  operations {
    ...PublicationOperationFields
  }
  metadata {
    ...AnyPublicationMetadataFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
}
    ${PublicationOperationFieldsFragmentDoc}
${AnyPublicationMetadataFieldsFragmentDoc}
${ReferenceModuleFieldsFragmentDoc}`;
export const PrimaryPublicationFieldsFragmentDoc = gql`
    fragment PrimaryPublicationFields on PrimaryPublication {
  ... on Comment {
    id
  }
  ... on Quote {
    id
  }
  ... on Post {
    id
  }
}
    `;
export const QuoteFieldsFragmentDoc = gql`
    fragment QuoteFields on Quote {
  id
  publishedOn {
    id
  }
  isHidden
  momoka {
    proof
  }
  txHash
  createdAt
  by {
    id
    handle
  }
  stats {
    comments
    mirrors
    quotes
  }
  operations {
    ...PublicationOperationFields
  }
  quoteOn {
    ...PrimaryPublicationFields
  }
  metadata {
    ...AnyPublicationMetadataFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
}
    ${PublicationOperationFieldsFragmentDoc}
${PrimaryPublicationFieldsFragmentDoc}
${AnyPublicationMetadataFieldsFragmentDoc}
${ReferenceModuleFieldsFragmentDoc}`;
export const MirrorFieldsFragmentDoc = gql`
    fragment MirrorFields on Mirror {
  id
  publishedOn {
    id
  }
  isHidden
  momoka {
    proof
  }
  txHash
  createdAt
  mirrorOn {
    ...PrimaryPublicationFields
  }
}
    ${PrimaryPublicationFieldsFragmentDoc}`;
export const CommentFieldsFragmentDoc = gql`
    fragment CommentFields on Comment {
  id
  publishedOn {
    id
  }
  isHidden
  momoka {
    proof
  }
  txHash
  createdAt
  by {
    id
    handle
  }
  stats {
    comments
    mirrors
    quotes
  }
  operations {
    ...PublicationOperationFields
  }
  metadata {
    ...AnyPublicationMetadataFields
  }
  root {
    ...PrimaryPublicationFields
  }
  commentOn {
    ...PrimaryPublicationFields
  }
  firstComment {
    ...PrimaryPublicationFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
}
    ${PublicationOperationFieldsFragmentDoc}
${AnyPublicationMetadataFieldsFragmentDoc}
${PrimaryPublicationFieldsFragmentDoc}
${ReferenceModuleFieldsFragmentDoc}`;
export const AddPublicationBookmarkDocument = gql`
    mutation AddPublicationBookmark($request: PublicationBookmarkRequest!) {
  addPublicationBookmark(request: $request)
}
    `;
export type AddPublicationBookmarkMutationFn = Apollo.MutationFunction<AddPublicationBookmarkMutation, AddPublicationBookmarkMutationVariables>;

/**
 * __useAddPublicationBookmarkMutation__
 *
 * To run a mutation, you first call `useAddPublicationBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPublicationBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPublicationBookmarkMutation, { data, loading, error }] = useAddPublicationBookmarkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddPublicationBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddPublicationBookmarkMutation, AddPublicationBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPublicationBookmarkMutation, AddPublicationBookmarkMutationVariables>(AddPublicationBookmarkDocument, options);
      }
export type AddPublicationBookmarkMutationHookResult = ReturnType<typeof useAddPublicationBookmarkMutation>;
export type AddPublicationBookmarkMutationResult = Apollo.MutationResult<AddPublicationBookmarkMutation>;
export type AddPublicationBookmarkMutationOptions = Apollo.BaseMutationOptions<AddPublicationBookmarkMutation, AddPublicationBookmarkMutationVariables>;
export const AddReactionDocument = gql`
    mutation AddReaction($request: ReactionRequest!) {
  addReaction(request: $request)
}
    `;
export type AddReactionMutationFn = Apollo.MutationFunction<AddReactionMutation, AddReactionMutationVariables>;

/**
 * __useAddReactionMutation__
 *
 * To run a mutation, you first call `useAddReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReactionMutation, { data, loading, error }] = useAddReactionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddReactionMutation(baseOptions?: Apollo.MutationHookOptions<AddReactionMutation, AddReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, options);
      }
export type AddReactionMutationHookResult = ReturnType<typeof useAddReactionMutation>;
export type AddReactionMutationResult = Apollo.MutationResult<AddReactionMutation>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<AddReactionMutation, AddReactionMutationVariables>;
export const AuthDocument = gql`
    mutation auth($request: SignedAuthChallenge!) {
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const CreateBlockProfilesTypedDataDocument = gql`
    mutation CreateBlockProfilesTypedData($request: BlockRequest!) {
  createBlockProfilesTypedData(request: $request) {
    id
    expiresAt
    typedData {
      value {
        nonce
        deadline
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        SetBlockStatus {
          name
          type
        }
      }
    }
  }
}
    `;
export type CreateBlockProfilesTypedDataMutationFn = Apollo.MutationFunction<CreateBlockProfilesTypedDataMutation, CreateBlockProfilesTypedDataMutationVariables>;

/**
 * __useCreateBlockProfilesTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateBlockProfilesTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlockProfilesTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlockProfilesTypedDataMutation, { data, loading, error }] = useCreateBlockProfilesTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateBlockProfilesTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlockProfilesTypedDataMutation, CreateBlockProfilesTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlockProfilesTypedDataMutation, CreateBlockProfilesTypedDataMutationVariables>(CreateBlockProfilesTypedDataDocument, options);
      }
export type CreateBlockProfilesTypedDataMutationHookResult = ReturnType<typeof useCreateBlockProfilesTypedDataMutation>;
export type CreateBlockProfilesTypedDataMutationResult = Apollo.MutationResult<CreateBlockProfilesTypedDataMutation>;
export type CreateBlockProfilesTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateBlockProfilesTypedDataMutation, CreateBlockProfilesTypedDataMutationVariables>;
export const BlockDocument = gql`
    mutation Block($request: BlockRequest!) {
  block(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type BlockMutationFn = Apollo.MutationFunction<BlockMutation, BlockMutationVariables>;

/**
 * __useBlockMutation__
 *
 * To run a mutation, you first call `useBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockMutation, { data, loading, error }] = useBlockMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBlockMutation(baseOptions?: Apollo.MutationHookOptions<BlockMutation, BlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockMutation, BlockMutationVariables>(BlockDocument, options);
      }
export type BlockMutationHookResult = ReturnType<typeof useBlockMutation>;
export type BlockMutationResult = Apollo.MutationResult<BlockMutation>;
export type BlockMutationOptions = Apollo.BaseMutationOptions<BlockMutation, BlockMutationVariables>;
export const BroadcastOnMomokaDocument = gql`
    mutation BroadcastOnMomoka($request: BroadcastRequest!) {
  broadcastOnMomoka(request: $request) {
    ... on CreateMomokaPublicationResult {
      id
      proof
      momokaId
    }
    ... on RelayError {
      __typename
      reason
    }
  }
}
    `;
export type BroadcastOnMomokaMutationFn = Apollo.MutationFunction<BroadcastOnMomokaMutation, BroadcastOnMomokaMutationVariables>;

/**
 * __useBroadcastOnMomokaMutation__
 *
 * To run a mutation, you first call `useBroadcastOnMomokaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOnMomokaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOnMomokaMutation, { data, loading, error }] = useBroadcastOnMomokaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOnMomokaMutation(baseOptions?: Apollo.MutationHookOptions<BroadcastOnMomokaMutation, BroadcastOnMomokaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BroadcastOnMomokaMutation, BroadcastOnMomokaMutationVariables>(BroadcastOnMomokaDocument, options);
      }
export type BroadcastOnMomokaMutationHookResult = ReturnType<typeof useBroadcastOnMomokaMutation>;
export type BroadcastOnMomokaMutationResult = Apollo.MutationResult<BroadcastOnMomokaMutation>;
export type BroadcastOnMomokaMutationOptions = Apollo.BaseMutationOptions<BroadcastOnMomokaMutation, BroadcastOnMomokaMutationVariables>;
export const BroadcastOnchainDocument = gql`
    mutation BroadcastOnchain($request: BroadcastRequest!) {
  broadcastOnchain(request: $request) {
    ... on RelaySuccess {
      __typename
      txHash
      txId
    }
    ... on RelayError {
      __typename
      reason
    }
  }
}
    `;
export type BroadcastOnchainMutationFn = Apollo.MutationFunction<BroadcastOnchainMutation, BroadcastOnchainMutationVariables>;

/**
 * __useBroadcastOnchainMutation__
 *
 * To run a mutation, you first call `useBroadcastOnchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOnchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOnchainMutation, { data, loading, error }] = useBroadcastOnchainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOnchainMutation(baseOptions?: Apollo.MutationHookOptions<BroadcastOnchainMutation, BroadcastOnchainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BroadcastOnchainMutation, BroadcastOnchainMutationVariables>(BroadcastOnchainDocument, options);
      }
export type BroadcastOnchainMutationHookResult = ReturnType<typeof useBroadcastOnchainMutation>;
export type BroadcastOnchainMutationResult = Apollo.MutationResult<BroadcastOnchainMutation>;
export type BroadcastOnchainMutationOptions = Apollo.BaseMutationOptions<BroadcastOnchainMutation, BroadcastOnchainMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($request: CreateProfileWithHandleRequest!) {
  createProfileWithHandle(request: $request) {
    __typename
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on CreateProfileWithHandleErrorResult {
      reason
    }
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateFollowTypedDataDocument = gql`
    mutation CreateFollowTypedData($request: FollowRequest!) {
  createFollowTypedData(request: $request) {
    expiresAt
    id
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        Follow {
          name
          type
        }
      }
      value {
        nonce
        deadline
        followerProfileId
        idsOfProfilesToFollow
        followTokenIds
        datas
      }
    }
  }
}
    `;
export type CreateFollowTypedDataMutationFn = Apollo.MutationFunction<CreateFollowTypedDataMutation, CreateFollowTypedDataMutationVariables>;

/**
 * __useCreateFollowTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateFollowTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowTypedDataMutation, { data, loading, error }] = useCreateFollowTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateFollowTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateFollowTypedDataMutation, CreateFollowTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFollowTypedDataMutation, CreateFollowTypedDataMutationVariables>(CreateFollowTypedDataDocument, options);
      }
export type CreateFollowTypedDataMutationHookResult = ReturnType<typeof useCreateFollowTypedDataMutation>;
export type CreateFollowTypedDataMutationResult = Apollo.MutationResult<CreateFollowTypedDataMutation>;
export type CreateFollowTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateFollowTypedDataMutation, CreateFollowTypedDataMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($request: FollowLensManagerRequest!) {
  follow(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const CreateSetFollowModuleTypedDataDocument = gql`
    mutation CreateSetFollowModuleTypedData($request: SetFollowModuleRequest!) {
  createSetFollowModuleTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModule {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        followModule
        followModuleInitData
      }
    }
  }
}
    `;
export type CreateSetFollowModuleTypedDataMutationFn = Apollo.MutationFunction<CreateSetFollowModuleTypedDataMutation, CreateSetFollowModuleTypedDataMutationVariables>;

/**
 * __useCreateSetFollowModuleTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateSetFollowModuleTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetFollowModuleTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetFollowModuleTypedDataMutation, { data, loading, error }] = useCreateSetFollowModuleTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateSetFollowModuleTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetFollowModuleTypedDataMutation, CreateSetFollowModuleTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetFollowModuleTypedDataMutation, CreateSetFollowModuleTypedDataMutationVariables>(CreateSetFollowModuleTypedDataDocument, options);
      }
export type CreateSetFollowModuleTypedDataMutationHookResult = ReturnType<typeof useCreateSetFollowModuleTypedDataMutation>;
export type CreateSetFollowModuleTypedDataMutationResult = Apollo.MutationResult<CreateSetFollowModuleTypedDataMutation>;
export type CreateSetFollowModuleTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateSetFollowModuleTypedDataMutation, CreateSetFollowModuleTypedDataMutationVariables>;
export const SetFollowModuleDocument = gql`
    mutation SetFollowModule($request: SetFollowModuleRequest!) {
  setFollowModule(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type SetFollowModuleMutationFn = Apollo.MutationFunction<SetFollowModuleMutation, SetFollowModuleMutationVariables>;

/**
 * __useSetFollowModuleMutation__
 *
 * To run a mutation, you first call `useSetFollowModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFollowModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFollowModuleMutation, { data, loading, error }] = useSetFollowModuleMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetFollowModuleMutation(baseOptions?: Apollo.MutationHookOptions<SetFollowModuleMutation, SetFollowModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetFollowModuleMutation, SetFollowModuleMutationVariables>(SetFollowModuleDocument, options);
      }
export type SetFollowModuleMutationHookResult = ReturnType<typeof useSetFollowModuleMutation>;
export type SetFollowModuleMutationResult = Apollo.MutationResult<SetFollowModuleMutation>;
export type SetFollowModuleMutationOptions = Apollo.BaseMutationOptions<SetFollowModuleMutation, SetFollowModuleMutationVariables>;
export const HidePublicationDocument = gql`
    mutation HidePublication($request: HidePublicationRequest!) {
  hidePublication(request: $request)
}
    `;
export type HidePublicationMutationFn = Apollo.MutationFunction<HidePublicationMutation, HidePublicationMutationVariables>;

/**
 * __useHidePublicationMutation__
 *
 * To run a mutation, you first call `useHidePublicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHidePublicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hidePublicationMutation, { data, loading, error }] = useHidePublicationMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHidePublicationMutation(baseOptions?: Apollo.MutationHookOptions<HidePublicationMutation, HidePublicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HidePublicationMutation, HidePublicationMutationVariables>(HidePublicationDocument, options);
      }
export type HidePublicationMutationHookResult = ReturnType<typeof useHidePublicationMutation>;
export type HidePublicationMutationResult = Apollo.MutationResult<HidePublicationMutation>;
export type HidePublicationMutationOptions = Apollo.BaseMutationOptions<HidePublicationMutation, HidePublicationMutationVariables>;
export const CreateLegacyCollectTypedDataDocument = gql`
    mutation CreateLegacyCollectTypedData($request: LegacyCollectRequest!) {
  createLegacyCollectTypedData(request: $request) {
    expiresAt
    id
    typedData {
      domain {
        chainId
        name
        verifyingContract
        version
      }
      types {
        Act {
          name
          type
        }
      }
      value {
        actionModuleAddress
        actionModuleData
        actorProfileId
        deadline
        nonce
        publicationActedId
        publicationActedProfileId
        referrerProfileIds
        referrerPubIds
      }
    }
  }
}
    `;
export type CreateLegacyCollectTypedDataMutationFn = Apollo.MutationFunction<CreateLegacyCollectTypedDataMutation, CreateLegacyCollectTypedDataMutationVariables>;

/**
 * __useCreateLegacyCollectTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateLegacyCollectTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLegacyCollectTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLegacyCollectTypedDataMutation, { data, loading, error }] = useCreateLegacyCollectTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateLegacyCollectTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateLegacyCollectTypedDataMutation, CreateLegacyCollectTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLegacyCollectTypedDataMutation, CreateLegacyCollectTypedDataMutationVariables>(CreateLegacyCollectTypedDataDocument, options);
      }
export type CreateLegacyCollectTypedDataMutationHookResult = ReturnType<typeof useCreateLegacyCollectTypedDataMutation>;
export type CreateLegacyCollectTypedDataMutationResult = Apollo.MutationResult<CreateLegacyCollectTypedDataMutation>;
export type CreateLegacyCollectTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateLegacyCollectTypedDataMutation, CreateLegacyCollectTypedDataMutationVariables>;
export const LegacyCollectDocument = gql`
    mutation LegacyCollect($request: LegacyCollectRequest!) {
  legacyCollect(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type LegacyCollectMutationFn = Apollo.MutationFunction<LegacyCollectMutation, LegacyCollectMutationVariables>;

/**
 * __useLegacyCollectMutation__
 *
 * To run a mutation, you first call `useLegacyCollectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegacyCollectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legacyCollectMutation, { data, loading, error }] = useLegacyCollectMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLegacyCollectMutation(baseOptions?: Apollo.MutationHookOptions<LegacyCollectMutation, LegacyCollectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LegacyCollectMutation, LegacyCollectMutationVariables>(LegacyCollectDocument, options);
      }
export type LegacyCollectMutationHookResult = ReturnType<typeof useLegacyCollectMutation>;
export type LegacyCollectMutationResult = Apollo.MutationResult<LegacyCollectMutation>;
export type LegacyCollectMutationOptions = Apollo.BaseMutationOptions<LegacyCollectMutation, LegacyCollectMutationVariables>;
export const CreateHandleLinkToProfileTypedDataDocument = gql`
    mutation CreateHandleLinkToProfileTypedData($request: HandleLinkToProfileRequest!) {
  createHandleLinkToProfileTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Link {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
}
    `;
export type CreateHandleLinkToProfileTypedDataMutationFn = Apollo.MutationFunction<CreateHandleLinkToProfileTypedDataMutation, CreateHandleLinkToProfileTypedDataMutationVariables>;

/**
 * __useCreateHandleLinkToProfileTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateHandleLinkToProfileTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHandleLinkToProfileTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHandleLinkToProfileTypedDataMutation, { data, loading, error }] = useCreateHandleLinkToProfileTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateHandleLinkToProfileTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateHandleLinkToProfileTypedDataMutation, CreateHandleLinkToProfileTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHandleLinkToProfileTypedDataMutation, CreateHandleLinkToProfileTypedDataMutationVariables>(CreateHandleLinkToProfileTypedDataDocument, options);
      }
export type CreateHandleLinkToProfileTypedDataMutationHookResult = ReturnType<typeof useCreateHandleLinkToProfileTypedDataMutation>;
export type CreateHandleLinkToProfileTypedDataMutationResult = Apollo.MutationResult<CreateHandleLinkToProfileTypedDataMutation>;
export type CreateHandleLinkToProfileTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateHandleLinkToProfileTypedDataMutation, CreateHandleLinkToProfileTypedDataMutationVariables>;
export const HandleLinkToProfileDocument = gql`
    mutation HandleLinkToProfile($request: HandleLinkToProfileRequest!) {
  handleLinkToProfile(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type HandleLinkToProfileMutationFn = Apollo.MutationFunction<HandleLinkToProfileMutation, HandleLinkToProfileMutationVariables>;

/**
 * __useHandleLinkToProfileMutation__
 *
 * To run a mutation, you first call `useHandleLinkToProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleLinkToProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleLinkToProfileMutation, { data, loading, error }] = useHandleLinkToProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHandleLinkToProfileMutation(baseOptions?: Apollo.MutationHookOptions<HandleLinkToProfileMutation, HandleLinkToProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleLinkToProfileMutation, HandleLinkToProfileMutationVariables>(HandleLinkToProfileDocument, options);
      }
export type HandleLinkToProfileMutationHookResult = ReturnType<typeof useHandleLinkToProfileMutation>;
export type HandleLinkToProfileMutationResult = Apollo.MutationResult<HandleLinkToProfileMutation>;
export type HandleLinkToProfileMutationOptions = Apollo.BaseMutationOptions<HandleLinkToProfileMutation, HandleLinkToProfileMutationVariables>;
export const CreateMomokaPostTypedDataDocument = gql`
    mutation CreateMomokaPostTypedData($request: MomokaPostRequest!) {
  createMomokaPostTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Post {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
    `;
export type CreateMomokaPostTypedDataMutationFn = Apollo.MutationFunction<CreateMomokaPostTypedDataMutation, CreateMomokaPostTypedDataMutationVariables>;

/**
 * __useCreateMomokaPostTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateMomokaPostTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaPostTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaPostTypedDataMutation, { data, loading, error }] = useCreateMomokaPostTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaPostTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateMomokaPostTypedDataMutation, CreateMomokaPostTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMomokaPostTypedDataMutation, CreateMomokaPostTypedDataMutationVariables>(CreateMomokaPostTypedDataDocument, options);
      }
export type CreateMomokaPostTypedDataMutationHookResult = ReturnType<typeof useCreateMomokaPostTypedDataMutation>;
export type CreateMomokaPostTypedDataMutationResult = Apollo.MutationResult<CreateMomokaPostTypedDataMutation>;
export type CreateMomokaPostTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateMomokaPostTypedDataMutation, CreateMomokaPostTypedDataMutationVariables>;
export const PostOnMomokaDocument = gql`
    mutation PostOnMomoka($request: MomokaPostRequest!) {
  postOnMomoka(request: $request) {
    ... on CreateMomokaPublicationResult {
      id
      proof
      momokaId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type PostOnMomokaMutationFn = Apollo.MutationFunction<PostOnMomokaMutation, PostOnMomokaMutationVariables>;

/**
 * __usePostOnMomokaMutation__
 *
 * To run a mutation, you first call `usePostOnMomokaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostOnMomokaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postOnMomokaMutation, { data, loading, error }] = usePostOnMomokaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePostOnMomokaMutation(baseOptions?: Apollo.MutationHookOptions<PostOnMomokaMutation, PostOnMomokaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostOnMomokaMutation, PostOnMomokaMutationVariables>(PostOnMomokaDocument, options);
      }
export type PostOnMomokaMutationHookResult = ReturnType<typeof usePostOnMomokaMutation>;
export type PostOnMomokaMutationResult = Apollo.MutationResult<PostOnMomokaMutation>;
export type PostOnMomokaMutationOptions = Apollo.BaseMutationOptions<PostOnMomokaMutation, PostOnMomokaMutationVariables>;
export const CreateMomokaCommentTypedDataDocument = gql`
    mutation CreateMomokaCommentTypedData($request: MomokaCommentRequest!) {
  createMomokaCommentTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Comment {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        actionModules
        actionModulesInitDatas
        contentURI
        deadline
        nonce
        pointedProfileId
        pointedPubId
        profileId
        referenceModule
        referenceModuleData
        referenceModuleInitData
        referrerProfileIds
        referrerPubIds
      }
    }
  }
}
    `;
export type CreateMomokaCommentTypedDataMutationFn = Apollo.MutationFunction<CreateMomokaCommentTypedDataMutation, CreateMomokaCommentTypedDataMutationVariables>;

/**
 * __useCreateMomokaCommentTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateMomokaCommentTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaCommentTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaCommentTypedDataMutation, { data, loading, error }] = useCreateMomokaCommentTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaCommentTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateMomokaCommentTypedDataMutation, CreateMomokaCommentTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMomokaCommentTypedDataMutation, CreateMomokaCommentTypedDataMutationVariables>(CreateMomokaCommentTypedDataDocument, options);
      }
export type CreateMomokaCommentTypedDataMutationHookResult = ReturnType<typeof useCreateMomokaCommentTypedDataMutation>;
export type CreateMomokaCommentTypedDataMutationResult = Apollo.MutationResult<CreateMomokaCommentTypedDataMutation>;
export type CreateMomokaCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateMomokaCommentTypedDataMutation, CreateMomokaCommentTypedDataMutationVariables>;
export const CommentOnMomokaDocument = gql`
    mutation CommentOnMomoka($request: MomokaCommentRequest!) {
  commentOnMomoka(request: $request) {
    ... on CreateMomokaPublicationResult {
      id
      proof
      momokaId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type CommentOnMomokaMutationFn = Apollo.MutationFunction<CommentOnMomokaMutation, CommentOnMomokaMutationVariables>;

/**
 * __useCommentOnMomokaMutation__
 *
 * To run a mutation, you first call `useCommentOnMomokaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnMomokaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnMomokaMutation, { data, loading, error }] = useCommentOnMomokaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCommentOnMomokaMutation(baseOptions?: Apollo.MutationHookOptions<CommentOnMomokaMutation, CommentOnMomokaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentOnMomokaMutation, CommentOnMomokaMutationVariables>(CommentOnMomokaDocument, options);
      }
export type CommentOnMomokaMutationHookResult = ReturnType<typeof useCommentOnMomokaMutation>;
export type CommentOnMomokaMutationResult = Apollo.MutationResult<CommentOnMomokaMutation>;
export type CommentOnMomokaMutationOptions = Apollo.BaseMutationOptions<CommentOnMomokaMutation, CommentOnMomokaMutationVariables>;
export const CreateMomokaQuoteTypedDataDocument = gql`
    mutation CreateMomokaQuoteTypedData($request: MomokaQuoteRequest!) {
  createMomokaQuoteTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Quote {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleData
        referenceModuleInitData
      }
    }
  }
}
    `;
export type CreateMomokaQuoteTypedDataMutationFn = Apollo.MutationFunction<CreateMomokaQuoteTypedDataMutation, CreateMomokaQuoteTypedDataMutationVariables>;

/**
 * __useCreateMomokaQuoteTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateMomokaQuoteTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaQuoteTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaQuoteTypedDataMutation, { data, loading, error }] = useCreateMomokaQuoteTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaQuoteTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateMomokaQuoteTypedDataMutation, CreateMomokaQuoteTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMomokaQuoteTypedDataMutation, CreateMomokaQuoteTypedDataMutationVariables>(CreateMomokaQuoteTypedDataDocument, options);
      }
export type CreateMomokaQuoteTypedDataMutationHookResult = ReturnType<typeof useCreateMomokaQuoteTypedDataMutation>;
export type CreateMomokaQuoteTypedDataMutationResult = Apollo.MutationResult<CreateMomokaQuoteTypedDataMutation>;
export type CreateMomokaQuoteTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateMomokaQuoteTypedDataMutation, CreateMomokaQuoteTypedDataMutationVariables>;
export const QuoteOnMomokaDocument = gql`
    mutation QuoteOnMomoka($request: MomokaQuoteRequest!) {
  quoteOnMomoka(request: $request) {
    ... on CreateMomokaPublicationResult {
      id
      proof
      momokaId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type QuoteOnMomokaMutationFn = Apollo.MutationFunction<QuoteOnMomokaMutation, QuoteOnMomokaMutationVariables>;

/**
 * __useQuoteOnMomokaMutation__
 *
 * To run a mutation, you first call `useQuoteOnMomokaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuoteOnMomokaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quoteOnMomokaMutation, { data, loading, error }] = useQuoteOnMomokaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useQuoteOnMomokaMutation(baseOptions?: Apollo.MutationHookOptions<QuoteOnMomokaMutation, QuoteOnMomokaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QuoteOnMomokaMutation, QuoteOnMomokaMutationVariables>(QuoteOnMomokaDocument, options);
      }
export type QuoteOnMomokaMutationHookResult = ReturnType<typeof useQuoteOnMomokaMutation>;
export type QuoteOnMomokaMutationResult = Apollo.MutationResult<QuoteOnMomokaMutation>;
export type QuoteOnMomokaMutationOptions = Apollo.BaseMutationOptions<QuoteOnMomokaMutation, QuoteOnMomokaMutationVariables>;
export const CreateMomokaMirrorTypedDataDocument = gql`
    mutation CreateMomokaMirrorTypedData($request: MomokaMirrorRequest!) {
  createMomokaMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Mirror {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        metadataURI
        deadline
        profileId
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
      }
    }
  }
}
    `;
export type CreateMomokaMirrorTypedDataMutationFn = Apollo.MutationFunction<CreateMomokaMirrorTypedDataMutation, CreateMomokaMirrorTypedDataMutationVariables>;

/**
 * __useCreateMomokaMirrorTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateMomokaMirrorTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaMirrorTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaMirrorTypedDataMutation, { data, loading, error }] = useCreateMomokaMirrorTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaMirrorTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateMomokaMirrorTypedDataMutation, CreateMomokaMirrorTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMomokaMirrorTypedDataMutation, CreateMomokaMirrorTypedDataMutationVariables>(CreateMomokaMirrorTypedDataDocument, options);
      }
export type CreateMomokaMirrorTypedDataMutationHookResult = ReturnType<typeof useCreateMomokaMirrorTypedDataMutation>;
export type CreateMomokaMirrorTypedDataMutationResult = Apollo.MutationResult<CreateMomokaMirrorTypedDataMutation>;
export type CreateMomokaMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateMomokaMirrorTypedDataMutation, CreateMomokaMirrorTypedDataMutationVariables>;
export const MirrorOnMomokaDocument = gql`
    mutation MirrorOnMomoka($request: MomokaMirrorRequest!) {
  mirrorOnMomoka(request: $request) {
    ... on CreateMomokaPublicationResult {
      id
      proof
      momokaId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type MirrorOnMomokaMutationFn = Apollo.MutationFunction<MirrorOnMomokaMutation, MirrorOnMomokaMutationVariables>;

/**
 * __useMirrorOnMomokaMutation__
 *
 * To run a mutation, you first call `useMirrorOnMomokaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMirrorOnMomokaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mirrorOnMomokaMutation, { data, loading, error }] = useMirrorOnMomokaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMirrorOnMomokaMutation(baseOptions?: Apollo.MutationHookOptions<MirrorOnMomokaMutation, MirrorOnMomokaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MirrorOnMomokaMutation, MirrorOnMomokaMutationVariables>(MirrorOnMomokaDocument, options);
      }
export type MirrorOnMomokaMutationHookResult = ReturnType<typeof useMirrorOnMomokaMutation>;
export type MirrorOnMomokaMutationResult = Apollo.MutationResult<MirrorOnMomokaMutation>;
export type MirrorOnMomokaMutationOptions = Apollo.BaseMutationOptions<MirrorOnMomokaMutation, MirrorOnMomokaMutationVariables>;
export const CreateNftGalleryDocument = gql`
    mutation CreateNftGallery($request: NftGalleryCreateRequest!) {
  createNftGallery(request: $request)
}
    `;
export type CreateNftGalleryMutationFn = Apollo.MutationFunction<CreateNftGalleryMutation, CreateNftGalleryMutationVariables>;

/**
 * __useCreateNftGalleryMutation__
 *
 * To run a mutation, you first call `useCreateNftGalleryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNftGalleryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNftGalleryMutation, { data, loading, error }] = useCreateNftGalleryMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateNftGalleryMutation(baseOptions?: Apollo.MutationHookOptions<CreateNftGalleryMutation, CreateNftGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNftGalleryMutation, CreateNftGalleryMutationVariables>(CreateNftGalleryDocument, options);
      }
export type CreateNftGalleryMutationHookResult = ReturnType<typeof useCreateNftGalleryMutation>;
export type CreateNftGalleryMutationResult = Apollo.MutationResult<CreateNftGalleryMutation>;
export type CreateNftGalleryMutationOptions = Apollo.BaseMutationOptions<CreateNftGalleryMutation, CreateNftGalleryMutationVariables>;
export const UpdateNftGalleryInfoDocument = gql`
    mutation UpdateNftGalleryInfo($request: NftGalleryUpdateInfoRequest!) {
  updateNftGalleryInfo(request: $request)
}
    `;
export type UpdateNftGalleryInfoMutationFn = Apollo.MutationFunction<UpdateNftGalleryInfoMutation, UpdateNftGalleryInfoMutationVariables>;

/**
 * __useUpdateNftGalleryInfoMutation__
 *
 * To run a mutation, you first call `useUpdateNftGalleryInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNftGalleryInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNftGalleryInfoMutation, { data, loading, error }] = useUpdateNftGalleryInfoMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateNftGalleryInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNftGalleryInfoMutation, UpdateNftGalleryInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNftGalleryInfoMutation, UpdateNftGalleryInfoMutationVariables>(UpdateNftGalleryInfoDocument, options);
      }
export type UpdateNftGalleryInfoMutationHookResult = ReturnType<typeof useUpdateNftGalleryInfoMutation>;
export type UpdateNftGalleryInfoMutationResult = Apollo.MutationResult<UpdateNftGalleryInfoMutation>;
export type UpdateNftGalleryInfoMutationOptions = Apollo.BaseMutationOptions<UpdateNftGalleryInfoMutation, UpdateNftGalleryInfoMutationVariables>;
export const DeleteNftGalleryDocument = gql`
    mutation DeleteNftGallery($request: NftGalleryDeleteRequest!) {
  deleteNftGallery(request: $request)
}
    `;
export type DeleteNftGalleryMutationFn = Apollo.MutationFunction<DeleteNftGalleryMutation, DeleteNftGalleryMutationVariables>;

/**
 * __useDeleteNftGalleryMutation__
 *
 * To run a mutation, you first call `useDeleteNftGalleryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNftGalleryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNftGalleryMutation, { data, loading, error }] = useDeleteNftGalleryMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteNftGalleryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNftGalleryMutation, DeleteNftGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNftGalleryMutation, DeleteNftGalleryMutationVariables>(DeleteNftGalleryDocument, options);
      }
export type DeleteNftGalleryMutationHookResult = ReturnType<typeof useDeleteNftGalleryMutation>;
export type DeleteNftGalleryMutationResult = Apollo.MutationResult<DeleteNftGalleryMutation>;
export type DeleteNftGalleryMutationOptions = Apollo.BaseMutationOptions<DeleteNftGalleryMutation, DeleteNftGalleryMutationVariables>;
export const AddPublicationNotInterestedDocument = gql`
    mutation AddPublicationNotInterested($request: PublicationNotInterestedRequest!) {
  addPublicationNotInterested(request: $request)
}
    `;
export type AddPublicationNotInterestedMutationFn = Apollo.MutationFunction<AddPublicationNotInterestedMutation, AddPublicationNotInterestedMutationVariables>;

/**
 * __useAddPublicationNotInterestedMutation__
 *
 * To run a mutation, you first call `useAddPublicationNotInterestedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPublicationNotInterestedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPublicationNotInterestedMutation, { data, loading, error }] = useAddPublicationNotInterestedMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddPublicationNotInterestedMutation(baseOptions?: Apollo.MutationHookOptions<AddPublicationNotInterestedMutation, AddPublicationNotInterestedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPublicationNotInterestedMutation, AddPublicationNotInterestedMutationVariables>(AddPublicationNotInterestedDocument, options);
      }
export type AddPublicationNotInterestedMutationHookResult = ReturnType<typeof useAddPublicationNotInterestedMutation>;
export type AddPublicationNotInterestedMutationResult = Apollo.MutationResult<AddPublicationNotInterestedMutation>;
export type AddPublicationNotInterestedMutationOptions = Apollo.BaseMutationOptions<AddPublicationNotInterestedMutation, AddPublicationNotInterestedMutationVariables>;
export const UndoPublicationNotInterestedDocument = gql`
    mutation UndoPublicationNotInterested($request: PublicationNotInterestedRequest!) {
  undoPublicationNotInterested(request: $request)
}
    `;
export type UndoPublicationNotInterestedMutationFn = Apollo.MutationFunction<UndoPublicationNotInterestedMutation, UndoPublicationNotInterestedMutationVariables>;

/**
 * __useUndoPublicationNotInterestedMutation__
 *
 * To run a mutation, you first call `useUndoPublicationNotInterestedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUndoPublicationNotInterestedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [undoPublicationNotInterestedMutation, { data, loading, error }] = useUndoPublicationNotInterestedMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUndoPublicationNotInterestedMutation(baseOptions?: Apollo.MutationHookOptions<UndoPublicationNotInterestedMutation, UndoPublicationNotInterestedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UndoPublicationNotInterestedMutation, UndoPublicationNotInterestedMutationVariables>(UndoPublicationNotInterestedDocument, options);
      }
export type UndoPublicationNotInterestedMutationHookResult = ReturnType<typeof useUndoPublicationNotInterestedMutation>;
export type UndoPublicationNotInterestedMutationResult = Apollo.MutationResult<UndoPublicationNotInterestedMutation>;
export type UndoPublicationNotInterestedMutationOptions = Apollo.BaseMutationOptions<UndoPublicationNotInterestedMutation, UndoPublicationNotInterestedMutationVariables>;
export const CreateOnchainPostTypedDataDocument = gql`
    mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {
  createOnchainPostTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Post {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
    `;
export type CreateOnchainPostTypedDataMutationFn = Apollo.MutationFunction<CreateOnchainPostTypedDataMutation, CreateOnchainPostTypedDataMutationVariables>;

/**
 * __useCreateOnchainPostTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateOnchainPostTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainPostTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainPostTypedDataMutation, { data, loading, error }] = useCreateOnchainPostTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOnchainPostTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateOnchainPostTypedDataMutation, CreateOnchainPostTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOnchainPostTypedDataMutation, CreateOnchainPostTypedDataMutationVariables>(CreateOnchainPostTypedDataDocument, options);
      }
export type CreateOnchainPostTypedDataMutationHookResult = ReturnType<typeof useCreateOnchainPostTypedDataMutation>;
export type CreateOnchainPostTypedDataMutationResult = Apollo.MutationResult<CreateOnchainPostTypedDataMutation>;
export type CreateOnchainPostTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateOnchainPostTypedDataMutation, CreateOnchainPostTypedDataMutationVariables>;
export const PostOnchainDocument = gql`
    mutation PostOnchain($request: OnchainPostRequest!) {
  postOnchain(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type PostOnchainMutationFn = Apollo.MutationFunction<PostOnchainMutation, PostOnchainMutationVariables>;

/**
 * __usePostOnchainMutation__
 *
 * To run a mutation, you first call `usePostOnchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostOnchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postOnchainMutation, { data, loading, error }] = usePostOnchainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePostOnchainMutation(baseOptions?: Apollo.MutationHookOptions<PostOnchainMutation, PostOnchainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostOnchainMutation, PostOnchainMutationVariables>(PostOnchainDocument, options);
      }
export type PostOnchainMutationHookResult = ReturnType<typeof usePostOnchainMutation>;
export type PostOnchainMutationResult = Apollo.MutationResult<PostOnchainMutation>;
export type PostOnchainMutationOptions = Apollo.BaseMutationOptions<PostOnchainMutation, PostOnchainMutationVariables>;
export const CreateOnchainQuoteTypedDataDocument = gql`
    mutation CreateOnchainQuoteTypedData($request: OnchainQuoteRequest!) {
  createOnchainQuoteTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Quote {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
    `;
export type CreateOnchainQuoteTypedDataMutationFn = Apollo.MutationFunction<CreateOnchainQuoteTypedDataMutation, CreateOnchainQuoteTypedDataMutationVariables>;

/**
 * __useCreateOnchainQuoteTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateOnchainQuoteTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainQuoteTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainQuoteTypedDataMutation, { data, loading, error }] = useCreateOnchainQuoteTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOnchainQuoteTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateOnchainQuoteTypedDataMutation, CreateOnchainQuoteTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOnchainQuoteTypedDataMutation, CreateOnchainQuoteTypedDataMutationVariables>(CreateOnchainQuoteTypedDataDocument, options);
      }
export type CreateOnchainQuoteTypedDataMutationHookResult = ReturnType<typeof useCreateOnchainQuoteTypedDataMutation>;
export type CreateOnchainQuoteTypedDataMutationResult = Apollo.MutationResult<CreateOnchainQuoteTypedDataMutation>;
export type CreateOnchainQuoteTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateOnchainQuoteTypedDataMutation, CreateOnchainQuoteTypedDataMutationVariables>;
export const QuoteOnchainDocument = gql`
    mutation QuoteOnchain($request: OnchainQuoteRequest!) {
  quoteOnchain(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type QuoteOnchainMutationFn = Apollo.MutationFunction<QuoteOnchainMutation, QuoteOnchainMutationVariables>;

/**
 * __useQuoteOnchainMutation__
 *
 * To run a mutation, you first call `useQuoteOnchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuoteOnchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quoteOnchainMutation, { data, loading, error }] = useQuoteOnchainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useQuoteOnchainMutation(baseOptions?: Apollo.MutationHookOptions<QuoteOnchainMutation, QuoteOnchainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QuoteOnchainMutation, QuoteOnchainMutationVariables>(QuoteOnchainDocument, options);
      }
export type QuoteOnchainMutationHookResult = ReturnType<typeof useQuoteOnchainMutation>;
export type QuoteOnchainMutationResult = Apollo.MutationResult<QuoteOnchainMutation>;
export type QuoteOnchainMutationOptions = Apollo.BaseMutationOptions<QuoteOnchainMutation, QuoteOnchainMutationVariables>;
export const CreateOnchainCommentTypedDataDocument = gql`
    mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {
  createOnchainCommentTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Comment {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
    `;
export type CreateOnchainCommentTypedDataMutationFn = Apollo.MutationFunction<CreateOnchainCommentTypedDataMutation, CreateOnchainCommentTypedDataMutationVariables>;

/**
 * __useCreateOnchainCommentTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateOnchainCommentTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainCommentTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainCommentTypedDataMutation, { data, loading, error }] = useCreateOnchainCommentTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOnchainCommentTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateOnchainCommentTypedDataMutation, CreateOnchainCommentTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOnchainCommentTypedDataMutation, CreateOnchainCommentTypedDataMutationVariables>(CreateOnchainCommentTypedDataDocument, options);
      }
export type CreateOnchainCommentTypedDataMutationHookResult = ReturnType<typeof useCreateOnchainCommentTypedDataMutation>;
export type CreateOnchainCommentTypedDataMutationResult = Apollo.MutationResult<CreateOnchainCommentTypedDataMutation>;
export type CreateOnchainCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateOnchainCommentTypedDataMutation, CreateOnchainCommentTypedDataMutationVariables>;
export const CommentOnchainDocument = gql`
    mutation CommentOnchain($request: OnchainCommentRequest!) {
  commentOnchain(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type CommentOnchainMutationFn = Apollo.MutationFunction<CommentOnchainMutation, CommentOnchainMutationVariables>;

/**
 * __useCommentOnchainMutation__
 *
 * To run a mutation, you first call `useCommentOnchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnchainMutation, { data, loading, error }] = useCommentOnchainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCommentOnchainMutation(baseOptions?: Apollo.MutationHookOptions<CommentOnchainMutation, CommentOnchainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentOnchainMutation, CommentOnchainMutationVariables>(CommentOnchainDocument, options);
      }
export type CommentOnchainMutationHookResult = ReturnType<typeof useCommentOnchainMutation>;
export type CommentOnchainMutationResult = Apollo.MutationResult<CommentOnchainMutation>;
export type CommentOnchainMutationOptions = Apollo.BaseMutationOptions<CommentOnchainMutation, CommentOnchainMutationVariables>;
export const CreateOnchainMirrorTypedDataDocument = gql`
    mutation CreateOnchainMirrorTypedData($request: OnchainMirrorRequest!) {
  createOnchainMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        Mirror {
          name
          type
        }
      }
      value {
        nonce
        metadataURI
        deadline
        profileId
        metadataURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
      }
    }
  }
}
    `;
export type CreateOnchainMirrorTypedDataMutationFn = Apollo.MutationFunction<CreateOnchainMirrorTypedDataMutation, CreateOnchainMirrorTypedDataMutationVariables>;

/**
 * __useCreateOnchainMirrorTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateOnchainMirrorTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainMirrorTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainMirrorTypedDataMutation, { data, loading, error }] = useCreateOnchainMirrorTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOnchainMirrorTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateOnchainMirrorTypedDataMutation, CreateOnchainMirrorTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOnchainMirrorTypedDataMutation, CreateOnchainMirrorTypedDataMutationVariables>(CreateOnchainMirrorTypedDataDocument, options);
      }
export type CreateOnchainMirrorTypedDataMutationHookResult = ReturnType<typeof useCreateOnchainMirrorTypedDataMutation>;
export type CreateOnchainMirrorTypedDataMutationResult = Apollo.MutationResult<CreateOnchainMirrorTypedDataMutation>;
export type CreateOnchainMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateOnchainMirrorTypedDataMutation, CreateOnchainMirrorTypedDataMutationVariables>;
export const MirrorOnchainDocument = gql`
    mutation MirrorOnchain($request: OnchainMirrorRequest!) {
  mirrorOnchain(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type MirrorOnchainMutationFn = Apollo.MutationFunction<MirrorOnchainMutation, MirrorOnchainMutationVariables>;

/**
 * __useMirrorOnchainMutation__
 *
 * To run a mutation, you first call `useMirrorOnchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMirrorOnchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mirrorOnchainMutation, { data, loading, error }] = useMirrorOnchainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMirrorOnchainMutation(baseOptions?: Apollo.MutationHookOptions<MirrorOnchainMutation, MirrorOnchainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MirrorOnchainMutation, MirrorOnchainMutationVariables>(MirrorOnchainDocument, options);
      }
export type MirrorOnchainMutationHookResult = ReturnType<typeof useMirrorOnchainMutation>;
export type MirrorOnchainMutationResult = Apollo.MutationResult<MirrorOnchainMutation>;
export type MirrorOnchainMutationOptions = Apollo.BaseMutationOptions<MirrorOnchainMutation, MirrorOnchainMutationVariables>;
export const CreateActOnOpenActionTypedDataDocument = gql`
    mutation CreateActOnOpenActionTypedData($request: ActOnOpenActionRequest!) {
  createActOnOpenActionTypedData(request: $request) {
    expiresAt
    id
    typedData {
      types {
        Act {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        publicationActedProfileId
        publicationActedId
        actorProfileId
        referrerProfileIds
        referrerPubIds
        actionModuleAddress
        actionModuleData
      }
    }
  }
}
    `;
export type CreateActOnOpenActionTypedDataMutationFn = Apollo.MutationFunction<CreateActOnOpenActionTypedDataMutation, CreateActOnOpenActionTypedDataMutationVariables>;

/**
 * __useCreateActOnOpenActionTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateActOnOpenActionTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActOnOpenActionTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActOnOpenActionTypedDataMutation, { data, loading, error }] = useCreateActOnOpenActionTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateActOnOpenActionTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateActOnOpenActionTypedDataMutation, CreateActOnOpenActionTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActOnOpenActionTypedDataMutation, CreateActOnOpenActionTypedDataMutationVariables>(CreateActOnOpenActionTypedDataDocument, options);
      }
export type CreateActOnOpenActionTypedDataMutationHookResult = ReturnType<typeof useCreateActOnOpenActionTypedDataMutation>;
export type CreateActOnOpenActionTypedDataMutationResult = Apollo.MutationResult<CreateActOnOpenActionTypedDataMutation>;
export type CreateActOnOpenActionTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateActOnOpenActionTypedDataMutation, CreateActOnOpenActionTypedDataMutationVariables>;
export const ActOnOpenActionDocument = gql`
    mutation ActOnOpenAction($request: ActOnOpenActionLensManagerRequest!) {
  actOnOpenAction(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type ActOnOpenActionMutationFn = Apollo.MutationFunction<ActOnOpenActionMutation, ActOnOpenActionMutationVariables>;

/**
 * __useActOnOpenActionMutation__
 *
 * To run a mutation, you first call `useActOnOpenActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActOnOpenActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [actOnOpenActionMutation, { data, loading, error }] = useActOnOpenActionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useActOnOpenActionMutation(baseOptions?: Apollo.MutationHookOptions<ActOnOpenActionMutation, ActOnOpenActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActOnOpenActionMutation, ActOnOpenActionMutationVariables>(ActOnOpenActionDocument, options);
      }
export type ActOnOpenActionMutationHookResult = ReturnType<typeof useActOnOpenActionMutation>;
export type ActOnOpenActionMutationResult = Apollo.MutationResult<ActOnOpenActionMutation>;
export type ActOnOpenActionMutationOptions = Apollo.BaseMutationOptions<ActOnOpenActionMutation, ActOnOpenActionMutationVariables>;
export const AddProfileInterestsDocument = gql`
    mutation AddProfileInterests($request: ProfileInterestsRequest!) {
  addProfileInterests(request: $request)
}
    `;
export type AddProfileInterestsMutationFn = Apollo.MutationFunction<AddProfileInterestsMutation, AddProfileInterestsMutationVariables>;

/**
 * __useAddProfileInterestsMutation__
 *
 * To run a mutation, you first call `useAddProfileInterestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfileInterestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfileInterestsMutation, { data, loading, error }] = useAddProfileInterestsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddProfileInterestsMutation(baseOptions?: Apollo.MutationHookOptions<AddProfileInterestsMutation, AddProfileInterestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProfileInterestsMutation, AddProfileInterestsMutationVariables>(AddProfileInterestsDocument, options);
      }
export type AddProfileInterestsMutationHookResult = ReturnType<typeof useAddProfileInterestsMutation>;
export type AddProfileInterestsMutationResult = Apollo.MutationResult<AddProfileInterestsMutation>;
export type AddProfileInterestsMutationOptions = Apollo.BaseMutationOptions<AddProfileInterestsMutation, AddProfileInterestsMutationVariables>;
export const RemoveProfileInterestsDocument = gql`
    mutation RemoveProfileInterests($request: ProfileInterestsRequest!) {
  removeProfileInterests(request: $request)
}
    `;
export type RemoveProfileInterestsMutationFn = Apollo.MutationFunction<RemoveProfileInterestsMutation, RemoveProfileInterestsMutationVariables>;

/**
 * __useRemoveProfileInterestsMutation__
 *
 * To run a mutation, you first call `useRemoveProfileInterestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileInterestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileInterestsMutation, { data, loading, error }] = useRemoveProfileInterestsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRemoveProfileInterestsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfileInterestsMutation, RemoveProfileInterestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfileInterestsMutation, RemoveProfileInterestsMutationVariables>(RemoveProfileInterestsDocument, options);
      }
export type RemoveProfileInterestsMutationHookResult = ReturnType<typeof useRemoveProfileInterestsMutation>;
export type RemoveProfileInterestsMutationResult = Apollo.MutationResult<RemoveProfileInterestsMutation>;
export type RemoveProfileInterestsMutationOptions = Apollo.BaseMutationOptions<RemoveProfileInterestsMutation, RemoveProfileInterestsMutationVariables>;
export const CreateChangeProfileManagersTypedDataDocument = gql`
    mutation CreateChangeProfileManagersTypedData($request: ChangeProfileManagersRequest!) {
  createChangeProfileManagersTypedData(request: $request) {
    expiresAt
    id
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        ChangeDelegatedExecutorsConfig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        delegatorProfileId
        delegatedExecutors
        approvals
        configNumber
        switchToGivenConfig
      }
    }
  }
}
    `;
export type CreateChangeProfileManagersTypedDataMutationFn = Apollo.MutationFunction<CreateChangeProfileManagersTypedDataMutation, CreateChangeProfileManagersTypedDataMutationVariables>;

/**
 * __useCreateChangeProfileManagersTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateChangeProfileManagersTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChangeProfileManagersTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChangeProfileManagersTypedDataMutation, { data, loading, error }] = useCreateChangeProfileManagersTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateChangeProfileManagersTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateChangeProfileManagersTypedDataMutation, CreateChangeProfileManagersTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChangeProfileManagersTypedDataMutation, CreateChangeProfileManagersTypedDataMutationVariables>(CreateChangeProfileManagersTypedDataDocument, options);
      }
export type CreateChangeProfileManagersTypedDataMutationHookResult = ReturnType<typeof useCreateChangeProfileManagersTypedDataMutation>;
export type CreateChangeProfileManagersTypedDataMutationResult = Apollo.MutationResult<CreateChangeProfileManagersTypedDataMutation>;
export type CreateChangeProfileManagersTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateChangeProfileManagersTypedDataMutation, CreateChangeProfileManagersTypedDataMutationVariables>;
export const RefreshPublicationMetadataDocument = gql`
    mutation RefreshPublicationMetadata($request: RefreshPublicationMetadataRequest!) {
  refreshPublicationMetadata(request: $request) {
    result
  }
}
    `;
export type RefreshPublicationMetadataMutationFn = Apollo.MutationFunction<RefreshPublicationMetadataMutation, RefreshPublicationMetadataMutationVariables>;

/**
 * __useRefreshPublicationMetadataMutation__
 *
 * To run a mutation, you first call `useRefreshPublicationMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshPublicationMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshPublicationMetadataMutation, { data, loading, error }] = useRefreshPublicationMetadataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRefreshPublicationMetadataMutation(baseOptions?: Apollo.MutationHookOptions<RefreshPublicationMetadataMutation, RefreshPublicationMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshPublicationMetadataMutation, RefreshPublicationMetadataMutationVariables>(RefreshPublicationMetadataDocument, options);
      }
export type RefreshPublicationMetadataMutationHookResult = ReturnType<typeof useRefreshPublicationMetadataMutation>;
export type RefreshPublicationMetadataMutationResult = Apollo.MutationResult<RefreshPublicationMetadataMutation>;
export type RefreshPublicationMetadataMutationOptions = Apollo.BaseMutationOptions<RefreshPublicationMetadataMutation, RefreshPublicationMetadataMutationVariables>;
export const RefreshDocument = gql`
    mutation Refresh($request: RefreshRequest!) {
  refresh(request: $request) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const RemovePublicationBookmarkDocument = gql`
    mutation RemovePublicationBookmark($request: PublicationBookmarkRequest!) {
  removePublicationBookmark(request: $request)
}
    `;
export type RemovePublicationBookmarkMutationFn = Apollo.MutationFunction<RemovePublicationBookmarkMutation, RemovePublicationBookmarkMutationVariables>;

/**
 * __useRemovePublicationBookmarkMutation__
 *
 * To run a mutation, you first call `useRemovePublicationBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePublicationBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePublicationBookmarkMutation, { data, loading, error }] = useRemovePublicationBookmarkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRemovePublicationBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemovePublicationBookmarkMutation, RemovePublicationBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePublicationBookmarkMutation, RemovePublicationBookmarkMutationVariables>(RemovePublicationBookmarkDocument, options);
      }
export type RemovePublicationBookmarkMutationHookResult = ReturnType<typeof useRemovePublicationBookmarkMutation>;
export type RemovePublicationBookmarkMutationResult = Apollo.MutationResult<RemovePublicationBookmarkMutation>;
export type RemovePublicationBookmarkMutationOptions = Apollo.BaseMutationOptions<RemovePublicationBookmarkMutation, RemovePublicationBookmarkMutationVariables>;
export const RemoveReactionDocument = gql`
    mutation RemoveReaction($request: ReactionRequest!) {
  removeReaction(request: $request)
}
    `;
export type RemoveReactionMutationFn = Apollo.MutationFunction<RemoveReactionMutation, RemoveReactionMutationVariables>;

/**
 * __useRemoveReactionMutation__
 *
 * To run a mutation, you first call `useRemoveReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReactionMutation, { data, loading, error }] = useRemoveReactionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRemoveReactionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReactionMutation, RemoveReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReactionMutation, RemoveReactionMutationVariables>(RemoveReactionDocument, options);
      }
export type RemoveReactionMutationHookResult = ReturnType<typeof useRemoveReactionMutation>;
export type RemoveReactionMutationResult = Apollo.MutationResult<RemoveReactionMutation>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<RemoveReactionMutation, RemoveReactionMutationVariables>;
export const DismissRecommendedProfilesDocument = gql`
    mutation DismissRecommendedProfiles($request: DismissRecommendedProfilesRequest!) {
  dismissRecommendedProfiles(request: $request)
}
    `;
export type DismissRecommendedProfilesMutationFn = Apollo.MutationFunction<DismissRecommendedProfilesMutation, DismissRecommendedProfilesMutationVariables>;

/**
 * __useDismissRecommendedProfilesMutation__
 *
 * To run a mutation, you first call `useDismissRecommendedProfilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDismissRecommendedProfilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dismissRecommendedProfilesMutation, { data, loading, error }] = useDismissRecommendedProfilesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDismissRecommendedProfilesMutation(baseOptions?: Apollo.MutationHookOptions<DismissRecommendedProfilesMutation, DismissRecommendedProfilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DismissRecommendedProfilesMutation, DismissRecommendedProfilesMutationVariables>(DismissRecommendedProfilesDocument, options);
      }
export type DismissRecommendedProfilesMutationHookResult = ReturnType<typeof useDismissRecommendedProfilesMutation>;
export type DismissRecommendedProfilesMutationResult = Apollo.MutationResult<DismissRecommendedProfilesMutation>;
export type DismissRecommendedProfilesMutationOptions = Apollo.BaseMutationOptions<DismissRecommendedProfilesMutation, DismissRecommendedProfilesMutationVariables>;
export const ReportPublicationDocument = gql`
    mutation ReportPublication($request: ReportPublicationRequest!) {
  reportPublication(request: $request)
}
    `;
export type ReportPublicationMutationFn = Apollo.MutationFunction<ReportPublicationMutation, ReportPublicationMutationVariables>;

/**
 * __useReportPublicationMutation__
 *
 * To run a mutation, you first call `useReportPublicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportPublicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportPublicationMutation, { data, loading, error }] = useReportPublicationMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReportPublicationMutation(baseOptions?: Apollo.MutationHookOptions<ReportPublicationMutation, ReportPublicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportPublicationMutation, ReportPublicationMutationVariables>(ReportPublicationDocument, options);
      }
export type ReportPublicationMutationHookResult = ReturnType<typeof useReportPublicationMutation>;
export type ReportPublicationMutationResult = Apollo.MutationResult<ReportPublicationMutation>;
export type ReportPublicationMutationOptions = Apollo.BaseMutationOptions<ReportPublicationMutation, ReportPublicationMutationVariables>;
export const CreateOnchainSetProfileMetadataTypedDataDocument = gql`
    mutation CreateOnchainSetProfileMetadataTypedData($request: OnchainSetProfileMetadataRequest!) {
  createOnchainSetProfileMetadataTypedData(request: $request) {
    expiresAt
    id
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        SetProfileMetadataURI {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileId
        metadataURI
      }
    }
  }
}
    `;
export type CreateOnchainSetProfileMetadataTypedDataMutationFn = Apollo.MutationFunction<CreateOnchainSetProfileMetadataTypedDataMutation, CreateOnchainSetProfileMetadataTypedDataMutationVariables>;

/**
 * __useCreateOnchainSetProfileMetadataTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateOnchainSetProfileMetadataTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainSetProfileMetadataTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainSetProfileMetadataTypedDataMutation, { data, loading, error }] = useCreateOnchainSetProfileMetadataTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOnchainSetProfileMetadataTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateOnchainSetProfileMetadataTypedDataMutation, CreateOnchainSetProfileMetadataTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOnchainSetProfileMetadataTypedDataMutation, CreateOnchainSetProfileMetadataTypedDataMutationVariables>(CreateOnchainSetProfileMetadataTypedDataDocument, options);
      }
export type CreateOnchainSetProfileMetadataTypedDataMutationHookResult = ReturnType<typeof useCreateOnchainSetProfileMetadataTypedDataMutation>;
export type CreateOnchainSetProfileMetadataTypedDataMutationResult = Apollo.MutationResult<CreateOnchainSetProfileMetadataTypedDataMutation>;
export type CreateOnchainSetProfileMetadataTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateOnchainSetProfileMetadataTypedDataMutation, CreateOnchainSetProfileMetadataTypedDataMutationVariables>;
export const SetProfileMetadataDocument = gql`
    mutation SetProfileMetadata($request: OnchainSetProfileMetadataRequest!) {
  setProfileMetadata(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type SetProfileMetadataMutationFn = Apollo.MutationFunction<SetProfileMetadataMutation, SetProfileMetadataMutationVariables>;

/**
 * __useSetProfileMetadataMutation__
 *
 * To run a mutation, you first call `useSetProfileMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProfileMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProfileMetadataMutation, { data, loading, error }] = useSetProfileMetadataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetProfileMetadataMutation(baseOptions?: Apollo.MutationHookOptions<SetProfileMetadataMutation, SetProfileMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetProfileMetadataMutation, SetProfileMetadataMutationVariables>(SetProfileMetadataDocument, options);
      }
export type SetProfileMetadataMutationHookResult = ReturnType<typeof useSetProfileMetadataMutation>;
export type SetProfileMetadataMutationResult = Apollo.MutationResult<SetProfileMetadataMutation>;
export type SetProfileMetadataMutationOptions = Apollo.BaseMutationOptions<SetProfileMetadataMutation, SetProfileMetadataMutationVariables>;
export const CreateUnblockProfilesTypedDataDocument = gql`
    mutation CreateUnblockProfilesTypedData($request: UnblockRequest!) {
  createUnblockProfilesTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatus {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
    }
  }
}
    `;
export type CreateUnblockProfilesTypedDataMutationFn = Apollo.MutationFunction<CreateUnblockProfilesTypedDataMutation, CreateUnblockProfilesTypedDataMutationVariables>;

/**
 * __useCreateUnblockProfilesTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateUnblockProfilesTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnblockProfilesTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnblockProfilesTypedDataMutation, { data, loading, error }] = useCreateUnblockProfilesTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateUnblockProfilesTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnblockProfilesTypedDataMutation, CreateUnblockProfilesTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnblockProfilesTypedDataMutation, CreateUnblockProfilesTypedDataMutationVariables>(CreateUnblockProfilesTypedDataDocument, options);
      }
export type CreateUnblockProfilesTypedDataMutationHookResult = ReturnType<typeof useCreateUnblockProfilesTypedDataMutation>;
export type CreateUnblockProfilesTypedDataMutationResult = Apollo.MutationResult<CreateUnblockProfilesTypedDataMutation>;
export type CreateUnblockProfilesTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateUnblockProfilesTypedDataMutation, CreateUnblockProfilesTypedDataMutationVariables>;
export const UnblockDocument = gql`
    mutation Unblock($request: UnblockRequest!) {
  unblock(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type UnblockMutationFn = Apollo.MutationFunction<UnblockMutation, UnblockMutationVariables>;

/**
 * __useUnblockMutation__
 *
 * To run a mutation, you first call `useUnblockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockMutation, { data, loading, error }] = useUnblockMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnblockMutation(baseOptions?: Apollo.MutationHookOptions<UnblockMutation, UnblockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockMutation, UnblockMutationVariables>(UnblockDocument, options);
      }
export type UnblockMutationHookResult = ReturnType<typeof useUnblockMutation>;
export type UnblockMutationResult = Apollo.MutationResult<UnblockMutation>;
export type UnblockMutationOptions = Apollo.BaseMutationOptions<UnblockMutation, UnblockMutationVariables>;
export const CreateUnfollowTypedDataDocument = gql`
    mutation CreateUnfollowTypedData($request: UnfollowRequest!) {
  createUnfollowTypedData(request: $request) {
    expiresAt
    id
    typedData {
      types {
        Unfollow {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        unfollowerProfileId
        idsOfProfilesToUnfollow
      }
    }
  }
}
    `;
export type CreateUnfollowTypedDataMutationFn = Apollo.MutationFunction<CreateUnfollowTypedDataMutation, CreateUnfollowTypedDataMutationVariables>;

/**
 * __useCreateUnfollowTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateUnfollowTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnfollowTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnfollowTypedDataMutation, { data, loading, error }] = useCreateUnfollowTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateUnfollowTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnfollowTypedDataMutation, CreateUnfollowTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnfollowTypedDataMutation, CreateUnfollowTypedDataMutationVariables>(CreateUnfollowTypedDataDocument, options);
      }
export type CreateUnfollowTypedDataMutationHookResult = ReturnType<typeof useCreateUnfollowTypedDataMutation>;
export type CreateUnfollowTypedDataMutationResult = Apollo.MutationResult<CreateUnfollowTypedDataMutation>;
export type CreateUnfollowTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateUnfollowTypedDataMutation, CreateUnfollowTypedDataMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($request: UnfollowRequest!) {
  unfollow(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const CreateHandleUnlinkFromProfileTypedDataDocument = gql`
    mutation CreateHandleUnlinkFromProfileTypedData($request: HandleUnlinkFromProfileRequest!) {
  createHandleUnlinkFromProfileTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        Unlink {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
}
    `;
export type CreateHandleUnlinkFromProfileTypedDataMutationFn = Apollo.MutationFunction<CreateHandleUnlinkFromProfileTypedDataMutation, CreateHandleUnlinkFromProfileTypedDataMutationVariables>;

/**
 * __useCreateHandleUnlinkFromProfileTypedDataMutation__
 *
 * To run a mutation, you first call `useCreateHandleUnlinkFromProfileTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHandleUnlinkFromProfileTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHandleUnlinkFromProfileTypedDataMutation, { data, loading, error }] = useCreateHandleUnlinkFromProfileTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateHandleUnlinkFromProfileTypedDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateHandleUnlinkFromProfileTypedDataMutation, CreateHandleUnlinkFromProfileTypedDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHandleUnlinkFromProfileTypedDataMutation, CreateHandleUnlinkFromProfileTypedDataMutationVariables>(CreateHandleUnlinkFromProfileTypedDataDocument, options);
      }
export type CreateHandleUnlinkFromProfileTypedDataMutationHookResult = ReturnType<typeof useCreateHandleUnlinkFromProfileTypedDataMutation>;
export type CreateHandleUnlinkFromProfileTypedDataMutationResult = Apollo.MutationResult<CreateHandleUnlinkFromProfileTypedDataMutation>;
export type CreateHandleUnlinkFromProfileTypedDataMutationOptions = Apollo.BaseMutationOptions<CreateHandleUnlinkFromProfileTypedDataMutation, CreateHandleUnlinkFromProfileTypedDataMutationVariables>;
export const HandleUnlinkFromProfileDocument = gql`
    mutation HandleUnlinkFromProfile($request: HandleUnlinkFromProfileRequest!) {
  handleUnlinkFromProfile(request: $request) {
    ... on RelaySuccess {
      txHash
      txId
    }
    ... on LensProfileManagerRelayError {
      reason
    }
  }
}
    `;
export type HandleUnlinkFromProfileMutationFn = Apollo.MutationFunction<HandleUnlinkFromProfileMutation, HandleUnlinkFromProfileMutationVariables>;

/**
 * __useHandleUnlinkFromProfileMutation__
 *
 * To run a mutation, you first call `useHandleUnlinkFromProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleUnlinkFromProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleUnlinkFromProfileMutation, { data, loading, error }] = useHandleUnlinkFromProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHandleUnlinkFromProfileMutation(baseOptions?: Apollo.MutationHookOptions<HandleUnlinkFromProfileMutation, HandleUnlinkFromProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleUnlinkFromProfileMutation, HandleUnlinkFromProfileMutationVariables>(HandleUnlinkFromProfileDocument, options);
      }
export type HandleUnlinkFromProfileMutationHookResult = ReturnType<typeof useHandleUnlinkFromProfileMutation>;
export type HandleUnlinkFromProfileMutationResult = Apollo.MutationResult<HandleUnlinkFromProfileMutation>;
export type HandleUnlinkFromProfileMutationOptions = Apollo.BaseMutationOptions<HandleUnlinkFromProfileMutation, HandleUnlinkFromProfileMutationVariables>;
export const ProfilesDocument = gql`
    query Profiles($request: ProfilesRequest!) {
  profiles(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      next
      prev
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfilesQuery(baseOptions: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
      }
export function useProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
        }
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesQuery, ProfilesQueryVariables>;
export const PublicationBookmarksDocument = gql`
    query PublicationBookmarks($request: PublicationBookmarksRequest!) {
  publicationBookmarks(request: $request) {
    items {
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
      ... on Quote {
        ...QuoteFields
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${MirrorFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __usePublicationBookmarksQuery__
 *
 * To run a query within a React component, call `usePublicationBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationBookmarksQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePublicationBookmarksQuery(baseOptions: Apollo.QueryHookOptions<PublicationBookmarksQuery, PublicationBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationBookmarksQuery, PublicationBookmarksQueryVariables>(PublicationBookmarksDocument, options);
      }
export function usePublicationBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationBookmarksQuery, PublicationBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationBookmarksQuery, PublicationBookmarksQueryVariables>(PublicationBookmarksDocument, options);
        }
export type PublicationBookmarksQueryHookResult = ReturnType<typeof usePublicationBookmarksQuery>;
export type PublicationBookmarksLazyQueryHookResult = ReturnType<typeof usePublicationBookmarksLazyQuery>;
export type PublicationBookmarksQueryResult = Apollo.QueryResult<PublicationBookmarksQuery, PublicationBookmarksQueryVariables>;
export const ChallengeDocument = gql`
    query Challenge($request: ChallengeRequest!) {
  challenge(request: $request) {
    id
    text
  }
}
    `;

/**
 * __useChallengeQuery__
 *
 * To run a query within a React component, call `useChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChallengeQuery(baseOptions: Apollo.QueryHookOptions<ChallengeQuery, ChallengeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengeQuery, ChallengeQueryVariables>(ChallengeDocument, options);
      }
export function useChallengeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengeQuery, ChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengeQuery, ChallengeQueryVariables>(ChallengeDocument, options);
        }
export type ChallengeQueryHookResult = ReturnType<typeof useChallengeQuery>;
export type ChallengeLazyQueryHookResult = ReturnType<typeof useChallengeLazyQuery>;
export type ChallengeQueryResult = Apollo.QueryResult<ChallengeQuery, ChallengeQueryVariables>;
export const ExploreProfilesDocument = gql`
    query ExploreProfiles($request: ExploreProfilesRequest!) {
  exploreProfiles(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useExploreProfilesQuery__
 *
 * To run a query within a React component, call `useExploreProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreProfilesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useExploreProfilesQuery(baseOptions: Apollo.QueryHookOptions<ExploreProfilesQuery, ExploreProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExploreProfilesQuery, ExploreProfilesQueryVariables>(ExploreProfilesDocument, options);
      }
export function useExploreProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExploreProfilesQuery, ExploreProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExploreProfilesQuery, ExploreProfilesQueryVariables>(ExploreProfilesDocument, options);
        }
export type ExploreProfilesQueryHookResult = ReturnType<typeof useExploreProfilesQuery>;
export type ExploreProfilesLazyQueryHookResult = ReturnType<typeof useExploreProfilesLazyQuery>;
export type ExploreProfilesQueryResult = Apollo.QueryResult<ExploreProfilesQuery, ExploreProfilesQueryVariables>;
export const ExplorePublicationsDocument = gql`
    query ExplorePublications($request: ExplorePublicationRequest!) {
  explorePublications(request: $request) {
    items {
      ... on Post {
        ...PostFields
      }
      ... on Quote {
        ...QuoteFields
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${PostFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __useExplorePublicationsQuery__
 *
 * To run a query within a React component, call `useExplorePublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExplorePublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExplorePublicationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useExplorePublicationsQuery(baseOptions: Apollo.QueryHookOptions<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>(ExplorePublicationsDocument, options);
      }
export function useExplorePublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>(ExplorePublicationsDocument, options);
        }
export type ExplorePublicationsQueryHookResult = ReturnType<typeof useExplorePublicationsQuery>;
export type ExplorePublicationsLazyQueryHookResult = ReturnType<typeof useExplorePublicationsLazyQuery>;
export type ExplorePublicationsQueryResult = Apollo.QueryResult<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>;
export const FeedHighlightsDocument = gql`
    query FeedHighlights($request: FeedHighlightsRequest!) {
  feedHighlights(request: $request) {
    items {
      ... on Post {
        id
      }
      ... on Quote {
        id
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __useFeedHighlightsQuery__
 *
 * To run a query within a React component, call `useFeedHighlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedHighlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedHighlightsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFeedHighlightsQuery(baseOptions: Apollo.QueryHookOptions<FeedHighlightsQuery, FeedHighlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedHighlightsQuery, FeedHighlightsQueryVariables>(FeedHighlightsDocument, options);
      }
export function useFeedHighlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedHighlightsQuery, FeedHighlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedHighlightsQuery, FeedHighlightsQueryVariables>(FeedHighlightsDocument, options);
        }
export type FeedHighlightsQueryHookResult = ReturnType<typeof useFeedHighlightsQuery>;
export type FeedHighlightsLazyQueryHookResult = ReturnType<typeof useFeedHighlightsLazyQuery>;
export type FeedHighlightsQueryResult = Apollo.QueryResult<FeedHighlightsQuery, FeedHighlightsQueryVariables>;
export const FollowersDocument = gql`
    query Followers($request: FollowersRequest!) {
  followers(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const FollowingDocument = gql`
    query Following($request: FollowingRequest!) {
  following(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      next
      prev
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useFollowingQuery__
 *
 * To run a query within a React component, call `useFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFollowingQuery(baseOptions: Apollo.QueryHookOptions<FollowingQuery, FollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowingQuery, FollowingQueryVariables>(FollowingDocument, options);
      }
export function useFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingQuery, FollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowingQuery, FollowingQueryVariables>(FollowingDocument, options);
        }
export type FollowingQueryHookResult = ReturnType<typeof useFollowingQuery>;
export type FollowingLazyQueryHookResult = ReturnType<typeof useFollowingLazyQuery>;
export type FollowingQueryResult = Apollo.QueryResult<FollowingQuery, FollowingQueryVariables>;
export const ProfileManagersDocument = gql`
    query ProfileManagers($request: ProfileManagersRequest!) {
  profileManagers(request: $request) {
    items {
      address
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __useProfileManagersQuery__
 *
 * To run a query within a React component, call `useProfileManagersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileManagersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileManagersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfileManagersQuery(baseOptions: Apollo.QueryHookOptions<ProfileManagersQuery, ProfileManagersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileManagersQuery, ProfileManagersQueryVariables>(ProfileManagersDocument, options);
      }
export function useProfileManagersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileManagersQuery, ProfileManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileManagersQuery, ProfileManagersQueryVariables>(ProfileManagersDocument, options);
        }
export type ProfileManagersQueryHookResult = ReturnType<typeof useProfileManagersQuery>;
export type ProfileManagersLazyQueryHookResult = ReturnType<typeof useProfileManagersLazyQuery>;
export type ProfileManagersQueryResult = Apollo.QueryResult<ProfileManagersQuery, ProfileManagersQueryVariables>;
export const MutualFollowersDocument = gql`
    query MutualFollowers($request: MutualFollowersRequest!) {
  mutualFollowers(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useMutualFollowersQuery__
 *
 * To run a query within a React component, call `useMutualFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMutualFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualFollowersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMutualFollowersQuery(baseOptions: Apollo.QueryHookOptions<MutualFollowersQuery, MutualFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MutualFollowersQuery, MutualFollowersQueryVariables>(MutualFollowersDocument, options);
      }
export function useMutualFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MutualFollowersQuery, MutualFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MutualFollowersQuery, MutualFollowersQueryVariables>(MutualFollowersDocument, options);
        }
export type MutualFollowersQueryHookResult = ReturnType<typeof useMutualFollowersQuery>;
export type MutualFollowersLazyQueryHookResult = ReturnType<typeof useMutualFollowersLazyQuery>;
export type MutualFollowersQueryResult = Apollo.QueryResult<MutualFollowersQuery, MutualFollowersQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications($request: NotificationRequest!) {
  notifications(request: $request) {
    items {
      ... on ReactionNotification {
        id
        publication {
          ... on Post {
            ...PostFields
          }
          ... on Comment {
            ...CommentFields
          }
          ... on Quote {
            ...QuoteFields
          }
        }
        reactions {
          profile {
            id
            handle
          }
          reactions {
            reactedAt
            reaction
          }
        }
      }
      ... on CommentNotification {
        id
        comment {
          ...CommentFields
        }
      }
      ... on MirrorNotification {
        id
        mirrors {
          mirrorId
          mirroredAt
          profile {
            id
            handle
          }
        }
        publication {
          ... on Post {
            id
          }
          ... on Comment {
            id
            by {
              id
              handle
            }
          }
          ... on Quote {
            id
            by {
              id
              handle
            }
          }
        }
      }
      ... on QuoteNotification {
        id
        quote {
          ...QuoteFields
        }
      }
      ... on ActedNotification {
        id
        actions {
          by {
            handle
            id
          }
          action {
            ... on KnownCollectOpenActionResult {
              type
            }
            ... on UnknownOpenActionResult {
              address
            }
          }
          actedAt
        }
        publication {
          ... on Post {
            id
            by {
              id
              handle
            }
          }
          ... on Comment {
            id
            by {
              id
              handle
            }
          }
          ... on Mirror {
            id
          }
        }
      }
      ... on FollowNotification {
        id
        followers {
          id
          handle
        }
      }
      ... on MentionNotification {
        id
        publication {
          ... on Post {
            id
            by {
              id
              handle
            }
          }
          ... on Comment {
            id
            by {
              id
              handle
            }
          }
          ... on Quote {
            id
            by {
              id
              handle
            }
          }
        }
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const OwnedHandlesDocument = gql`
    query OwnedHandles($request: OwnedHandlesRequest!) {
  ownedHandles(request: $request) {
    items {
      handle
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __useOwnedHandlesQuery__
 *
 * To run a query within a React component, call `useOwnedHandlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnedHandlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedHandlesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useOwnedHandlesQuery(baseOptions: Apollo.QueryHookOptions<OwnedHandlesQuery, OwnedHandlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnedHandlesQuery, OwnedHandlesQueryVariables>(OwnedHandlesDocument, options);
      }
export function useOwnedHandlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnedHandlesQuery, OwnedHandlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnedHandlesQuery, OwnedHandlesQueryVariables>(OwnedHandlesDocument, options);
        }
export type OwnedHandlesQueryHookResult = ReturnType<typeof useOwnedHandlesQuery>;
export type OwnedHandlesLazyQueryHookResult = ReturnType<typeof useOwnedHandlesLazyQuery>;
export type OwnedHandlesQueryResult = Apollo.QueryResult<OwnedHandlesQuery, OwnedHandlesQueryVariables>;
export const PoapEventDocument = gql`
    query PoapEvent($request: PoapEventQueryRequest!) {
  poapEvent(request: $request) {
    id
  }
}
    `;

/**
 * __usePoapEventQuery__
 *
 * To run a query within a React component, call `usePoapEventQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoapEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoapEventQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePoapEventQuery(baseOptions: Apollo.QueryHookOptions<PoapEventQuery, PoapEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoapEventQuery, PoapEventQueryVariables>(PoapEventDocument, options);
      }
export function usePoapEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoapEventQuery, PoapEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoapEventQuery, PoapEventQueryVariables>(PoapEventDocument, options);
        }
export type PoapEventQueryHookResult = ReturnType<typeof usePoapEventQuery>;
export type PoapEventLazyQueryHookResult = ReturnType<typeof usePoapEventLazyQuery>;
export type PoapEventQueryResult = Apollo.QueryResult<PoapEventQuery, PoapEventQueryVariables>;
export const PoapHoldersDocument = gql`
    query PoapHolders($request: PoapHoldersQueryRequest!) {
  poapHolders(request: $request) {
    items {
      id
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __usePoapHoldersQuery__
 *
 * To run a query within a React component, call `usePoapHoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoapHoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoapHoldersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePoapHoldersQuery(baseOptions: Apollo.QueryHookOptions<PoapHoldersQuery, PoapHoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoapHoldersQuery, PoapHoldersQueryVariables>(PoapHoldersDocument, options);
      }
export function usePoapHoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoapHoldersQuery, PoapHoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoapHoldersQuery, PoapHoldersQueryVariables>(PoapHoldersDocument, options);
        }
export type PoapHoldersQueryHookResult = ReturnType<typeof usePoapHoldersQuery>;
export type PoapHoldersLazyQueryHookResult = ReturnType<typeof usePoapHoldersLazyQuery>;
export type PoapHoldersQueryResult = Apollo.QueryResult<PoapHoldersQuery, PoapHoldersQueryVariables>;
export const MutualPoapsDocument = gql`
    query MutualPoaps($request: MutualPoapsQueryRequest!) {
  mutualPoaps(request: $request) {
    items {
      id
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __useMutualPoapsQuery__
 *
 * To run a query within a React component, call `useMutualPoapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMutualPoapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualPoapsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMutualPoapsQuery(baseOptions: Apollo.QueryHookOptions<MutualPoapsQuery, MutualPoapsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MutualPoapsQuery, MutualPoapsQueryVariables>(MutualPoapsDocument, options);
      }
export function useMutualPoapsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MutualPoapsQuery, MutualPoapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MutualPoapsQuery, MutualPoapsQueryVariables>(MutualPoapsDocument, options);
        }
export type MutualPoapsQueryHookResult = ReturnType<typeof useMutualPoapsQuery>;
export type MutualPoapsLazyQueryHookResult = ReturnType<typeof useMutualPoapsLazyQuery>;
export type MutualPoapsQueryResult = Apollo.QueryResult<MutualPoapsQuery, MutualPoapsQueryVariables>;
export const ProfileDocument = gql`
    query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    ...ProfileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const FeedDocument = gql`
    query Feed($request: FeedRequest!) {
  feed(request: $request) {
    items {
      id
      root {
        ... on Post {
          __typename
          id
        }
        ... on Quote {
          __typename
          id
        }
        ... on Comment {
          __typename
          id
        }
      }
      mirrors {
        __typename
        id
      }
      acted {
        by {
          id
        }
        action {
          __typename
        }
        actedAt
      }
      reactions {
        by {
          id
        }
        reaction
        createdAt
      }
      comments {
        __typename
        id
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const FollowRevenuesDocument = gql`
    query FollowRevenues($request: FollowRevenueRequest!) {
  followRevenues(request: $request) {
    revenues {
      total {
        ...AmountFields
      }
    }
  }
}
    ${AmountFieldsFragmentDoc}`;

/**
 * __useFollowRevenuesQuery__
 *
 * To run a query within a React component, call `useFollowRevenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowRevenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowRevenuesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFollowRevenuesQuery(baseOptions: Apollo.QueryHookOptions<FollowRevenuesQuery, FollowRevenuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowRevenuesQuery, FollowRevenuesQueryVariables>(FollowRevenuesDocument, options);
      }
export function useFollowRevenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowRevenuesQuery, FollowRevenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowRevenuesQuery, FollowRevenuesQueryVariables>(FollowRevenuesDocument, options);
        }
export type FollowRevenuesQueryHookResult = ReturnType<typeof useFollowRevenuesQuery>;
export type FollowRevenuesLazyQueryHookResult = ReturnType<typeof useFollowRevenuesLazyQuery>;
export type FollowRevenuesQueryResult = Apollo.QueryResult<FollowRevenuesQuery, FollowRevenuesQueryVariables>;
export const ProfileRecommendationsDocument = gql`
    query ProfileRecommendations($request: ProfileRecommendationsRequest!) {
  profileRecommendations(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfileRecommendationsQuery__
 *
 * To run a query within a React component, call `useProfileRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileRecommendationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfileRecommendationsQuery(baseOptions: Apollo.QueryHookOptions<ProfileRecommendationsQuery, ProfileRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileRecommendationsQuery, ProfileRecommendationsQueryVariables>(ProfileRecommendationsDocument, options);
      }
export function useProfileRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileRecommendationsQuery, ProfileRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileRecommendationsQuery, ProfileRecommendationsQueryVariables>(ProfileRecommendationsDocument, options);
        }
export type ProfileRecommendationsQueryHookResult = ReturnType<typeof useProfileRecommendationsQuery>;
export type ProfileRecommendationsLazyQueryHookResult = ReturnType<typeof useProfileRecommendationsLazyQuery>;
export type ProfileRecommendationsQueryResult = Apollo.QueryResult<ProfileRecommendationsQuery, ProfileRecommendationsQueryVariables>;
export const ProfilesManagedDocument = gql`
    query ProfilesManaged($request: ProfilesManagedRequest!) {
  profilesManaged(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfilesManagedQuery__
 *
 * To run a query within a React component, call `useProfilesManagedQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesManagedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesManagedQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfilesManagedQuery(baseOptions: Apollo.QueryHookOptions<ProfilesManagedQuery, ProfilesManagedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesManagedQuery, ProfilesManagedQueryVariables>(ProfilesManagedDocument, options);
      }
export function useProfilesManagedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesManagedQuery, ProfilesManagedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesManagedQuery, ProfilesManagedQueryVariables>(ProfilesManagedDocument, options);
        }
export type ProfilesManagedQueryHookResult = ReturnType<typeof useProfilesManagedQuery>;
export type ProfilesManagedLazyQueryHookResult = ReturnType<typeof useProfilesManagedLazyQuery>;
export type ProfilesManagedQueryResult = Apollo.QueryResult<ProfilesManagedQuery, ProfilesManagedQueryVariables>;
export const PublicationDocument = gql`
    query Publication($request: PublicationRequest!) {
  publication(request: $request) {
    ... on Post {
      ...PostFields
    }
    ... on Comment {
      ...CommentFields
    }
    ... on Mirror {
      ...MirrorFields
    }
    ... on Quote {
      ...QuoteFields
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${MirrorFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __usePublicationQuery__
 *
 * To run a query within a React component, call `usePublicationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePublicationQuery(baseOptions: Apollo.QueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
      }
export function usePublicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
        }
export type PublicationQueryHookResult = ReturnType<typeof usePublicationQuery>;
export type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
export type PublicationQueryResult = Apollo.QueryResult<PublicationQuery, PublicationQueryVariables>;
export const PublicationsTagsDocument = gql`
    query PublicationsTags($request: PublicationsTagsRequest!) {
  publicationsTags(request: $request) {
    items {
      tag
      total
    }
    pageInfo {
      next
      prev
    }
  }
}
    `;

/**
 * __usePublicationsTagsQuery__
 *
 * To run a query within a React component, call `usePublicationsTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsTagsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePublicationsTagsQuery(baseOptions: Apollo.QueryHookOptions<PublicationsTagsQuery, PublicationsTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationsTagsQuery, PublicationsTagsQueryVariables>(PublicationsTagsDocument, options);
      }
export function usePublicationsTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationsTagsQuery, PublicationsTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationsTagsQuery, PublicationsTagsQueryVariables>(PublicationsTagsDocument, options);
        }
export type PublicationsTagsQueryHookResult = ReturnType<typeof usePublicationsTagsQuery>;
export type PublicationsTagsLazyQueryHookResult = ReturnType<typeof usePublicationsTagsLazyQuery>;
export type PublicationsTagsQueryResult = Apollo.QueryResult<PublicationsTagsQuery, PublicationsTagsQueryVariables>;
export const PublicationsDocument = gql`
    query Publications($request: PublicationsRequest!) {
  publications(request: $request) {
    items {
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
      ... on Quote {
        ...QuoteFields
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${MirrorFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __usePublicationsQuery__
 *
 * To run a query within a React component, call `usePublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePublicationsQuery(baseOptions: Apollo.QueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, options);
      }
export function usePublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, options);
        }
export type PublicationsQueryHookResult = ReturnType<typeof usePublicationsQuery>;
export type PublicationsLazyQueryHookResult = ReturnType<typeof usePublicationsLazyQuery>;
export type PublicationsQueryResult = Apollo.QueryResult<PublicationsQuery, PublicationsQueryVariables>;
export const RevenueFromPublicationsDocument = gql`
    query RevenueFromPublications($request: RevenueFromPublicationsRequest!) {
  revenueFromPublications(request: $request) {
    items {
      publication {
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
        ... on Quote {
          ...QuoteFields
        }
      }
      revenue {
        total {
          ...AmountFields
        }
      }
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${MirrorFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}
${AmountFieldsFragmentDoc}`;

/**
 * __useRevenueFromPublicationsQuery__
 *
 * To run a query within a React component, call `useRevenueFromPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueFromPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueFromPublicationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRevenueFromPublicationsQuery(baseOptions: Apollo.QueryHookOptions<RevenueFromPublicationsQuery, RevenueFromPublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueFromPublicationsQuery, RevenueFromPublicationsQueryVariables>(RevenueFromPublicationsDocument, options);
      }
export function useRevenueFromPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueFromPublicationsQuery, RevenueFromPublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueFromPublicationsQuery, RevenueFromPublicationsQueryVariables>(RevenueFromPublicationsDocument, options);
        }
export type RevenueFromPublicationsQueryHookResult = ReturnType<typeof useRevenueFromPublicationsQuery>;
export type RevenueFromPublicationsLazyQueryHookResult = ReturnType<typeof useRevenueFromPublicationsLazyQuery>;
export type RevenueFromPublicationsQueryResult = Apollo.QueryResult<RevenueFromPublicationsQuery, RevenueFromPublicationsQueryVariables>;
export const SearchProfilesDocument = gql`
    query SearchProfiles($request: ProfileSearchRequest!) {
  searchProfiles(request: $request) {
    items {
      ...ProfileFields
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useSearchProfilesQuery__
 *
 * To run a query within a React component, call `useSearchProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProfilesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSearchProfilesQuery(baseOptions: Apollo.QueryHookOptions<SearchProfilesQuery, SearchProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProfilesQuery, SearchProfilesQueryVariables>(SearchProfilesDocument, options);
      }
export function useSearchProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProfilesQuery, SearchProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProfilesQuery, SearchProfilesQueryVariables>(SearchProfilesDocument, options);
        }
export type SearchProfilesQueryHookResult = ReturnType<typeof useSearchProfilesQuery>;
export type SearchProfilesLazyQueryHookResult = ReturnType<typeof useSearchProfilesLazyQuery>;
export type SearchProfilesQueryResult = Apollo.QueryResult<SearchProfilesQuery, SearchProfilesQueryVariables>;
export const SearchPublicationsDocument = gql`
    query SearchPublications($request: PublicationSearchRequest!) {
  searchPublications(request: $request) {
    items {
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Quote {
        ...QuoteFields
      }
    }
    pageInfo {
      prev
      next
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;

/**
 * __useSearchPublicationsQuery__
 *
 * To run a query within a React component, call `useSearchPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPublicationsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSearchPublicationsQuery(baseOptions: Apollo.QueryHookOptions<SearchPublicationsQuery, SearchPublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPublicationsQuery, SearchPublicationsQueryVariables>(SearchPublicationsDocument, options);
      }
export function useSearchPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPublicationsQuery, SearchPublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPublicationsQuery, SearchPublicationsQueryVariables>(SearchPublicationsDocument, options);
        }
export type SearchPublicationsQueryHookResult = ReturnType<typeof useSearchPublicationsQuery>;
export type SearchPublicationsLazyQueryHookResult = ReturnType<typeof useSearchPublicationsLazyQuery>;
export type SearchPublicationsQueryResult = Apollo.QueryResult<SearchPublicationsQuery, SearchPublicationsQueryVariables>;
export const UserSigNoncesDocument = gql`
    query UserSigNonces {
  userSigNonces {
    lensHubOnchainSigNonce
    lensTokenHandleRegistryOnchainSigNonce
  }
}
    `;

/**
 * __useUserSigNoncesQuery__
 *
 * To run a query within a React component, call `useUserSigNoncesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSigNoncesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSigNoncesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSigNoncesQuery(baseOptions?: Apollo.QueryHookOptions<UserSigNoncesQuery, UserSigNoncesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSigNoncesQuery, UserSigNoncesQueryVariables>(UserSigNoncesDocument, options);
      }
export function useUserSigNoncesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSigNoncesQuery, UserSigNoncesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSigNoncesQuery, UserSigNoncesQueryVariables>(UserSigNoncesDocument, options);
        }
export type UserSigNoncesQueryHookResult = ReturnType<typeof useUserSigNoncesQuery>;
export type UserSigNoncesLazyQueryHookResult = ReturnType<typeof useUserSigNoncesLazyQuery>;
export type UserSigNoncesQueryResult = Apollo.QueryResult<UserSigNoncesQuery, UserSigNoncesQueryVariables>;
export const VerifyDocument = gql`
    query Verify($request: VerifyRequest!) {
  verify(request: $request)
}
    `;

/**
 * __useVerifyQuery__
 *
 * To run a query within a React component, call `useVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useVerifyQuery(baseOptions: Apollo.QueryHookOptions<VerifyQuery, VerifyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyQuery, VerifyQueryVariables>(VerifyDocument, options);
      }
export function useVerifyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyQuery, VerifyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyQuery, VerifyQueryVariables>(VerifyDocument, options);
        }
export type VerifyQueryHookResult = ReturnType<typeof useVerifyQuery>;
export type VerifyLazyQueryHookResult = ReturnType<typeof useVerifyLazyQuery>;
export type VerifyQueryResult = Apollo.QueryResult<VerifyQuery, VerifyQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AccessCondition": [
      "AndCondition",
      "CollectCondition",
      "EoaOwnershipCondition",
      "Erc20OwnershipCondition",
      "FollowCondition",
      "NftOwnershipCondition",
      "OrCondition",
      "ProfileOwnershipCondition"
    ],
    "AnyPublication": [
      "Comment",
      "Mirror",
      "Post",
      "Quote"
    ],
    "Asset": [
      "Erc20"
    ],
    "BroadcastMomokaResult": [
      "CreateMomokaPublicationResult",
      "RelayError"
    ],
    "CreateProfileWithHandleResult": [
      "CreateProfileWithHandleErrorResult",
      "RelaySuccess"
    ],
    "ExplorePublication": [
      "Post",
      "Quote"
    ],
    "FeedHighlight": [
      "Post",
      "Quote"
    ],
    "FollowModule": [
      "FeeFollowModuleSettings",
      "RevertFollowModuleSettings",
      "UnknownFollowModuleSettings"
    ],
    "LegacyMediaItem": [
      "LegacyAudioItem",
      "LegacyImageItem",
      "LegacyVideoItem"
    ],
    "LensProfileManagerRelayResult": [
      "LensProfileManagerRelayError",
      "RelaySuccess"
    ],
    "MirrorablePublication": [
      "Comment",
      "Post",
      "Quote"
    ],
    "MomokaTransaction": [
      "MomokaCommentTransaction",
      "MomokaMirrorTransaction",
      "MomokaPostTransaction",
      "MomokaQuoteTransaction"
    ],
    "MomokaVerificationStatus": [
      "MomokaVerificationStatusFailure",
      "MomokaVerificationStatusSuccess"
    ],
    "Notification": [
      "ActedNotification",
      "CommentNotification",
      "FollowNotification",
      "MentionNotification",
      "MirrorNotification",
      "QuoteNotification",
      "ReactionNotification"
    ],
    "OpenActionModule": [
      "LegacyAaveFeeCollectModuleSettings",
      "LegacyERC4626FeeCollectModuleSettings",
      "LegacyFeeCollectModuleSettings",
      "LegacyFreeCollectModuleSettings",
      "LegacyLimitedFeeCollectModuleSettings",
      "LegacyLimitedTimedFeeCollectModuleSettings",
      "LegacyMultirecipientFeeCollectModuleSettings",
      "LegacyRevertCollectModuleSettings",
      "LegacySimpleCollectModuleSettings",
      "LegacyTimedFeeCollectModuleSettings",
      "MultirecipientFeeCollectOpenActionSettings",
      "SimpleCollectOpenActionSettings",
      "UnknownOpenActionModuleSettings"
    ],
    "OpenActionResult": [
      "KnownCollectOpenActionResult",
      "UnknownOpenActionResult"
    ],
    "PrimaryPublication": [
      "Comment",
      "Post",
      "Quote"
    ],
    "ProfilePicture": [
      "ImageSet",
      "NftImage"
    ],
    "PublicationMetadata": [
      "ArticleMetadataV3",
      "AudioMetadataV3",
      "CheckingInMetadataV3",
      "EmbedMetadataV3",
      "EventMetadataV3",
      "ImageMetadataV3",
      "LegacyPublicationMetadata",
      "LinkMetadataV3",
      "LiveStreamMetadataV3",
      "MintMetadataV3",
      "SpaceMetadataV3",
      "StoryMetadataV3",
      "TextOnlyMetadataV3",
      "ThreeDMetadataV3",
      "TransactionMetadataV3",
      "VideoMetadataV3"
    ],
    "PublicationMetadataEncryptionStrategy": [
      "PublicationMetadataV3LitEncryption"
    ],
    "PublicationMetadataMedia": [
      "PublicationMetadataMediaAudio",
      "PublicationMetadataMediaImage",
      "PublicationMetadataMediaVideo"
    ],
    "ReferenceModule": [
      "DegreesOfSeparationReferenceModuleSettings",
      "FollowOnlyReferenceModuleSettings",
      "UnknownReferenceModuleSettings"
    ],
    "RelayMomokaResult": [
      "CreateMomokaPublicationResult",
      "LensProfileManagerRelayError"
    ],
    "RelayResult": [
      "RelayError",
      "RelaySuccess"
    ],
    "SupportedModule": [
      "KnownSupportedModule",
      "UnknownSupportedModule"
    ]
  }
};
      export default result;
    