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
  Address: any;
  DateRange: any;
  Identity: any;
  IntString: any;
  Map: any;
  Range: any;
  Time: any;
  TimeRange: any;
};

/** Represents on-chain smart contract account */
export type Account = {
  __typename?: 'Account';
  /** Nested query - on-chain wallet related information, including address, domains, social profile, other token balances, and transfer history */
  address: Wallet;
  /** Blockchain where account is created */
  blockchain?: Maybe<TokenBlockchain>;
  /** Block number of the account creation transaction */
  createdAtBlockNumber?: Maybe<Scalars['Int']>;
  /** Block timestamp of the account creation transaction */
  createdAtBlockTimestamp?: Maybe<Scalars['Time']>;
  /** Transaction Hash of the account creation transaction */
  creationTransactionHash?: Maybe<Scalars['String']>;
  /** Address of deployer */
  deployer?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the account */
  id: Scalars['ID'];
  /** ERC6551 standard : Implementation address of on chain smart contract account */
  implementation?: Maybe<Scalars['String']>;
  /** Token NFT associated with erc-6551 */
  nft?: Maybe<TokenNft>;
  /** ERC6551 standard : Registry used to deploy smart contract wallet */
  registry?: Maybe<Scalars['String']>;
  /** ERC6551 standard salt for account creation */
  salt?: Maybe<Scalars['String']>;
  /** Standard of account-  ERC6551, Safe etc */
  standard: AccountStandard;
  /** ERC6551 standard: Address of ERC721 token */
  tokenAddress?: Maybe<Scalars['Address']>;
  /** ERC6551 standard: tokenId of ERC721 token */
  tokenId?: Maybe<Scalars['String']>;
  /** Block number of the account updation transaction */
  updatedAtBlockNumber?: Maybe<Scalars['Int']>;
  /** Block timestamp of the account updation transaction */
  updatedAtBlockTimestamp?: Maybe<Scalars['Time']>;
};

export type AccountFilter = {
  _and?: InputMaybe<Array<AccountFilter>>;
  _nor?: InputMaybe<Array<AccountFilter>>;
  _or?: InputMaybe<Array<AccountFilter>>;
  address?: InputMaybe<Identity_Comparator_Exp>;
  createdAtBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  standard?: InputMaybe<AccountStandard_Comparator_Exp>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
};

export type AccountOrderBy = {
  createdAtBlockTimestamp?: InputMaybe<OrderBy>;
};

export enum AccountStandard {
  Erc6551 = 'ERC6551'
}

export type AccountStandard_Comparator_Exp = {
  _eq?: InputMaybe<AccountStandard>;
  _in?: InputMaybe<Array<AccountStandard>>;
};

export type AccountsInput = {
  blockchain: TokenBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AccountFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<AccountOrderBy>>;
};

export type AccountsNestedInput = {
  blockchain?: InputMaybe<Blockchain>;
  filter?: InputMaybe<AccountFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<AccountOrderBy>>>;
};

export type AccountsOutput = {
  __typename?: 'AccountsOutput';
  Account?: Maybe<Array<Account>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Address_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Address']>;
  _in?: InputMaybe<Array<Scalars['Address']>>;
  _ne?: InputMaybe<Scalars['Address']>;
  _nin?: InputMaybe<Array<Scalars['Address']>>;
};

export type AnimationUrlVariants = {
  __typename?: 'AnimationUrlVariants';
  original?: Maybe<Scalars['String']>;
};

export enum Blockchain {
  Ethereum = 'ethereum'
}

export type Boolean_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
};

export type CollectionStat = {
  __typename?: 'CollectionStat';
  averageSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  averageSalePriceInUSDC?: Maybe<Scalars['Float']>;
  /** Blockchain where the NFT contract is deployed */
  blockchain?: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Marketplace DApp name where the collection stats are taken from */
  dappName?: Maybe<MarketplaceDappName>;
  /** Marketplace DApp slug (contract version) where the collection stats are taken from */
  dappSlug?: Maybe<MarketplaceDappSlug>;
  dappVersion?: Maybe<Scalars['String']>;
  firstTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  highestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  highestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  highestSaleTransactionId?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID'];
  lastTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  lowestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  lowestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  lowestSaleTransactionId?: Maybe<Scalars['String']>;
  timeFrame?: Maybe<TimeFrames>;
  token?: Maybe<Token>;
  /** NFT contract address on the blockchain */
  tokenAddress: Scalars['Address'];
  totalFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSaleVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalSaleVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSalesCount?: Maybe<Scalars['Int']>;
};

export type CollectionStatFilter = {
  _and?: InputMaybe<Array<CollectionStatFilter>>;
  _nor?: InputMaybe<Array<CollectionStatFilter>>;
  _or?: InputMaybe<Array<CollectionStatFilter>>;
  averageSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  dappName?: InputMaybe<MarketplaceDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<MarketplaceDappSlug_Comparator_Exp>;
  firstTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  highestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  lastTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  lowestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  totalSaleVolumeInUSDC?: InputMaybe<Float_Comparator_Exp>;
  totalSalesCount?: InputMaybe<Int_Comparator_Exp>;
};

export type CollectionStatOrderBy = {
  averageSalePriceInUSDC?: InputMaybe<OrderBy>;
  firstTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  highestSalePriceInUSDC?: InputMaybe<OrderBy>;
  lastTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  lowestSalePriceInUSDC?: InputMaybe<OrderBy>;
  totalSaleVolumeInUSDC?: InputMaybe<OrderBy>;
  totalSalesCount?: InputMaybe<OrderBy>;
};

export type CollectionStatsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: CollectionStatFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<CollectionStatOrderBy>>;
  timeFrame: TimeFrames;
};

export type CollectionStatsOutput = {
  __typename?: 'CollectionStatsOutput';
  CollectionStat?: Maybe<Array<CollectionStat>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ContractMetadata = {
  __typename?: 'ContractMetadata';
  /** Description of the token, mirrored from the smart contract */
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  /** Royalties recipient address, mirrored from the smart contract */
  feeRecipient?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  /** Name of the token, mirrored from the smart contract */
  name?: Maybe<Scalars['String']>;
  sellerFeeBasisPoints?: Maybe<Scalars['Int']>;
};

export type Date_Range_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
};

export type Domain = {
  __typename?: 'Domain';
  /** Blockchain where the NFT sale took place */
  blockchain: Blockchain;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Block number when the domain was created */
  createdAtBlockNumber?: Maybe<Scalars['Int']>;
  /** Timestamp when the domain was created */
  createdAtBlockTimestamp?: Maybe<Scalars['Time']>;
  /** DApp name associated with the domain (e.g. ENS) */
  dappName?: Maybe<DomainDappName>;
  /** DApp slug (contract version) associated with the domain */
  dappSlug?: Maybe<DomainDappSlug>;
  /** Timestamp when the domain registration expires */
  expiryTimestamp?: Maybe<Scalars['Time']>;
  /** Domain registration cost in decimals */
  formattedRegistrationCost?: Maybe<Scalars['Float']>;
  /** Domain registration cost in native blockchain token in decimals */
  formattedRegistrationCostInNativeToken?: Maybe<Scalars['Float']>;
  /** Domain registration cost in USDC in decimals */
  formattedRegistrationCostInUSDC?: Maybe<Scalars['Float']>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  /** Indicates if the domain is set to be primary - true or false */
  isPrimary?: Maybe<Scalars['Boolean']>;
  /** Airstack unique domain hash */
  labelHash?: Maybe<Scalars['String']>;
  /** Domain name without the domain ending, e.g. vitalik instead of vitalik.eth */
  labelName?: Maybe<Scalars['String']>;
  /** Block number when the domain was last updated */
  lastUpdatedBlockNumber?: Maybe<Scalars['Int']>;
  /** Timestamp when the domain was last updated */
  lastUpdatedBlockTimestamp?: Maybe<Scalars['Time']>;
  /** Full domain name, e.g. vitalik.eth */
  name?: Maybe<Scalars['String']>;
  /** Nested query - domain owner related information, including address, domains, social profile, other token balances, and transfer history */
  owner: Scalars['Address'];
  /** Parent domain name, if the entity is a subdomain */
  parent?: Maybe<Scalars['String']>;
  /** Nested query - can retrieve payment token data (name, symbol, etc.) */
  paymentToken?: Maybe<Token>;
  /** payment amount in blockchain native token for the domain */
  paymentTokenCostInNativeToken?: Maybe<Scalars['Float']>;
  /** payment amount in USDC for the domain */
  paymentTokenCostInUSDC?: Maybe<Scalars['Float']>;
  /** Domain registration cost */
  registrationCost?: Maybe<Scalars['String']>;
  /** Domain registration cost in blockchain native token */
  registrationCostInNativeToken?: Maybe<Scalars['String']>;
  /** Domain registration cost in USDC */
  registrationCostInUSDC?: Maybe<Scalars['String']>;
  /** Blockchain address to which the domain is resolved */
  resolvedAddress?: Maybe<Scalars['Address']>;
  /** Resolver address associated with Domain */
  resolverAddress?: Maybe<Scalars['Address']>;
  /** Count of subdomains linked to the domain */
  subDomainCount?: Maybe<Scalars['Int']>;
  /** Nested query allowing to retrieve subdomain information associated with the domain */
  subDomains?: Maybe<Array<Maybe<Domain>>>;
  /** Domain Token ID associated with the domain, if applicable */
  tokenId?: Maybe<Scalars['String']>;
  /** Time-to-live value for the domain */
  ttl?: Maybe<Scalars['String']>;
};


export type DomainSubDomainsArgs = {
  input?: InputMaybe<DomainsNestedInput>;
};

export enum DomainDappName {
  Ens = 'ens'
}

export type DomainDappName_Comparator_Exp = {
  _eq?: InputMaybe<DomainDappName>;
  _in?: InputMaybe<Array<DomainDappName>>;
};

export enum DomainDappSlug {
  EnsV1 = 'ens_v1'
}

export type DomainDappSlug_Comparator_Exp = {
  _eq?: InputMaybe<DomainDappSlug>;
  _in?: InputMaybe<Array<DomainDappSlug>>;
};

export type DomainFilter = {
  _and?: InputMaybe<Array<DomainFilter>>;
  _nor?: InputMaybe<Array<DomainFilter>>;
  _or?: InputMaybe<Array<DomainFilter>>;
  isPrimary?: InputMaybe<Boolean_Comparator_Exp>;
  name?: InputMaybe<String_Comparator_Exp>;
  owner?: InputMaybe<Identity_Comparator_Exp>;
  parent?: InputMaybe<String_Comparator_Exp>;
  resolvedAddress?: InputMaybe<Address_Comparator_Exp>;
};

export type DomainInput = {
  blockchain: Blockchain;
  name?: InputMaybe<Scalars['String']>;
  resolvedAddress?: InputMaybe<Scalars['Address']>;
};

export type DomainOrderBy = {
  createdAtBlockTimestamp?: InputMaybe<OrderBy>;
  expiryTimestamp?: InputMaybe<OrderBy>;
  lastUpdatedBlockTimestamp?: InputMaybe<OrderBy>;
};

export type DomainsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: DomainFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<DomainOrderBy>>;
};

export type DomainsNestedInput = {
  blockchain?: InputMaybe<Blockchain>;
  filter?: InputMaybe<DomainFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<DomainOrderBy>>>;
};

export type DomainsOutput = {
  __typename?: 'DomainsOutput';
  Domain?: Maybe<Array<Domain>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum EveryBlockchain {
  All = 'ALL'
}

export type Float_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _ne?: InputMaybe<Scalars['Float']>;
  _nin?: InputMaybe<Array<Scalars['Float']>>;
};

export type HistoricalBalance = {
  __typename?: 'HistoricalBalance';
  amount?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['Range']>;
  blockchain?: Maybe<Blockchain>;
  chainId?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateRange']>;
  formattedAmount?: Maybe<Scalars['Float']>;
  owner: Scalars['Address'];
  timestamp?: Maybe<Scalars['TimeRange']>;
  token?: Maybe<Token>;
  tokenAddress: Scalars['String'];
  tokenId?: Maybe<Scalars['String']>;
  tokenNft?: Maybe<TokenNft>;
  tokenType?: Maybe<Scalars['String']>;
};

export type HistoricalBalanceFilter = {
  _and?: InputMaybe<Array<HistoricalBalanceFilter>>;
  _nor?: InputMaybe<Array<HistoricalBalanceFilter>>;
  _or?: InputMaybe<Array<HistoricalBalanceFilter>>;
  blockNumber?: InputMaybe<Range_Comparator_Exp>;
  date?: InputMaybe<Date_Range_Comparator_Exp>;
  owner?: InputMaybe<Address_Comparator_Exp>;
  timestamp?: InputMaybe<Time_Range_Comparator_Exp>;
  tokenAddress?: InputMaybe<String_Comparator_Exp>;
  tokenType?: InputMaybe<String_Comparator_Exp>;
};

export type HistoricalBalanceOrderBy = {
  owner?: InputMaybe<OrderBy>;
  tokenAddress?: InputMaybe<OrderBy>;
};

export type HistoricalBalancesInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: HistoricalBalanceFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<HistoricalBalanceOrderBy>>;
};

export type HistoricalBalancesOutput = {
  __typename?: 'HistoricalBalancesOutput';
  HistoricalBalance?: Maybe<Array<HistoricalBalance>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Identity_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Identity']>;
  _in?: InputMaybe<Array<Scalars['Identity']>>;
};

export type ImageSizes = {
  __typename?: 'ImageSizes';
  extraSmall?: Maybe<Scalars['String']>;
  large?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

export type Int_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _ne?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type Int_String_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _ne?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
};

export type LogoSizes = {
  __typename?: 'LogoSizes';
  external?: Maybe<Scalars['String']>;
  large?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

export enum MarketplaceDappName {
  Blur = 'blur',
  Opensea = 'opensea',
  Rarible = 'rarible'
}

export type MarketplaceDappName_Comparator_Exp = {
  _eq?: InputMaybe<MarketplaceDappName>;
  _in?: InputMaybe<Array<MarketplaceDappName>>;
};

export enum MarketplaceDappSlug {
  Blur = 'blur',
  OpenseaSeaport = 'opensea_seaport',
  OpenseaWyvernExchange = 'opensea_wyvern_exchange',
  RaribleExchangeV1 = 'rarible_exchange_v1',
  RaribleExchangeV2 = 'rarible_exchange_v2'
}

export type MarketplaceDappSlug_Comparator_Exp = {
  _eq?: InputMaybe<MarketplaceDappSlug>;
  _in?: InputMaybe<Array<MarketplaceDappSlug>>;
};

export type MarketplaceStat = {
  __typename?: 'MarketplaceStat';
  averageSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  averageSalePriceInUSDC?: Maybe<Scalars['Float']>;
  /** Blockchain where the marketplace data is calculated from */
  blockchain?: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  dappName?: Maybe<MarketplaceDappName>;
  dappSlug: MarketplaceDappSlug;
  dappVersion?: Maybe<Scalars['String']>;
  firstTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  highestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  highestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  highestSaleTransactionId?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID'];
  lastTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  lowestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  lowestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  lowestSaleTransactionId?: Maybe<Scalars['String']>;
  timeFrame?: Maybe<TimeFrames>;
  totalFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSaleVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalSaleVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSalesCount?: Maybe<Scalars['Int']>;
};

export type MarketplaceStatFilter = {
  _and?: InputMaybe<Array<MarketplaceStatFilter>>;
  _nor?: InputMaybe<Array<MarketplaceStatFilter>>;
  _or?: InputMaybe<Array<MarketplaceStatFilter>>;
  averageSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  dappName?: InputMaybe<MarketplaceDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<MarketplaceDappSlug_Comparator_Exp>;
  firstTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  highestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  lastTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  lowestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  totalSaleVolumeInUSDC?: InputMaybe<Float_Comparator_Exp>;
  totalSalesCount?: InputMaybe<Int_Comparator_Exp>;
};

export type MarketplaceStatOrderBy = {
  averageSalePriceInUSDC?: InputMaybe<OrderBy>;
  firstTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  highestSalePriceInUSDC?: InputMaybe<OrderBy>;
  lastTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  lowestSalePriceInUSDC?: InputMaybe<OrderBy>;
  totalSaleVolumeInUSDC?: InputMaybe<OrderBy>;
  totalSalesCount?: InputMaybe<OrderBy>;
};

export type MarketplaceStatsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: MarketplaceStatFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<MarketplaceStatOrderBy>>;
  timeFrame: TimeFrames;
};

export type MarketplaceStatsOutput = {
  __typename?: 'MarketplaceStatsOutput';
  MarketplaceStat?: Maybe<Array<MarketplaceStat>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Media = {
  __typename?: 'Media';
  animation_url?: Maybe<AnimationUrlVariants>;
  audio?: Maybe<Scalars['String']>;
  image?: Maybe<ImageSizes>;
  video?: Maybe<Scalars['String']>;
};

export type NftSaleTransaction = {
  __typename?: 'NFTSaleTransaction';
  /** Block number of the NFT sale transaction */
  blockNumber?: Maybe<Scalars['Int']>;
  /** NFT token sale block timestamp */
  blockTimestamp?: Maybe<Scalars['Time']>;
  /** Blockchain where the NFT sale took place */
  blockchain?: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Marketplace DApp name where the transaction took place */
  dappName?: Maybe<MarketplaceDappName>;
  /** Marketplace DApp slug (contract version) name where the transaction took place */
  dappSlug?: Maybe<MarketplaceDappSlug>;
  /** Airstack unique dappVersion number */
  dappVersion?: Maybe<Scalars['String']>;
  /** Fee amount for the NFT sale transaction */
  feeAmount?: Maybe<Scalars['String']>;
  /** Fee amount in blockchain native token for the NFT sale transaction */
  feeAmountInNativeToken?: Maybe<Scalars['String']>;
  /** Fee amount in USDC for the NFT sale transaction */
  feeAmountInUSDC?: Maybe<Scalars['String']>;
  /** Nested query - fee beneficiary wallet related information, including address, domains, social profile, other token balances, and transfer history */
  feeBeneficiary?: Maybe<Wallet>;
  /** Formatted fee amount in decimals for the NFT sale transaction */
  formattedFeeAmount?: Maybe<Scalars['Float']>;
  /** Formatted fee amount in decimals in blockchain native token for the NFT sale transaction */
  formattedFeeAmountInNativeToken?: Maybe<Scalars['Float']>;
  /** Formatted fee amount in decimals USDC for the NFT sale transaction */
  formattedFeeAmountInUSDC?: Maybe<Scalars['Float']>;
  /** Formatted payment amount in decimals for the NFT sale transaction */
  formattedPaymentAmount?: Maybe<Scalars['Float']>;
  /** Formatted payment amount in decimals in blockchain native token for the NFT sale transaction */
  formattedPaymentAmountInNativeToken?: Maybe<Scalars['Float']>;
  /** Formatted payment amount in decimals USDC for the NFT sale transaction */
  formattedPaymentAmountInUSDC?: Maybe<Scalars['Float']>;
  /** Nested query - seller wallet related information, including address, domains, social profile, other token balances, and transfer history */
  from?: Maybe<Wallet>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  /** Nested Query - returns token contract address, amount in the sale transaction, unique NFT token ID, NFT contract metadata, and NFT token metadata, including images */
  nfts?: Maybe<Array<Nft>>;
  /** Payment amount for the NFT sale transaction */
  paymentAmount?: Maybe<Scalars['String']>;
  /** Payment amount for the NFT sale transaction in blockchain native token */
  paymentAmountInNativeToken?: Maybe<Scalars['String']>;
  /** Payment amount for the NFT sale transaction in USDC */
  paymentAmountInUSDC?: Maybe<Scalars['String']>;
  /** Nested query - payment token contract level information, such as token name, symbol, and other token metadata */
  paymentToken?: Maybe<Token>;
  /** Payment token price/value in blockchain native token */
  paymentTokenPriceInNativeToken?: Maybe<Scalars['Float']>;
  /** Payment token price/value in USDC */
  paymentTokenPriceInUSDC?: Maybe<Scalars['Float']>;
  /** Nested query - NFT sale royalties related information, such as amount, beneficiary address */
  royalties?: Maybe<Array<Royalty>>;
  saleType?: Maybe<SaleType>;
  /** Nested query - buyer wallet related information, including address, domains, social profile, other token balances, and transfer history */
  to?: Maybe<Wallet>;
  /** NFT token sale transction hash */
  transactionHash?: Maybe<Scalars['String']>;
  /** NFT token sale transaction type */
  transactionType?: Maybe<Scalars['String']>;
};

export type NftSaleTransactionFilter = {
  _and?: InputMaybe<Array<NftSaleTransactionFilter>>;
  _nor?: InputMaybe<Array<NftSaleTransactionFilter>>;
  _or?: InputMaybe<Array<NftSaleTransactionFilter>>;
  blockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  dappName?: InputMaybe<MarketplaceDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<MarketplaceDappSlug_Comparator_Exp>;
  from?: InputMaybe<Identity_Comparator_Exp>;
  nfts?: InputMaybe<NftFilter>;
  to?: InputMaybe<Identity_Comparator_Exp>;
  transactionHash?: InputMaybe<String_Comparator_Exp>;
};

export type NftSaleTransactionOrderBy = {
  blockTimestamp?: InputMaybe<OrderBy>;
};

export type NftSaleTransactionsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: NftSaleTransactionFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<NftSaleTransactionOrderBy>>;
};

export type NftSaleTransactionsNestedInput = {
  blockchain?: InputMaybe<Blockchain>;
  filter?: InputMaybe<NftSaleTransactionFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<NftSaleTransactionOrderBy>>>;
};

export type NftSaleTransactionsOutput = {
  __typename?: 'NFTSaleTransactionsOutput';
  NFTSaleTransaction?: Maybe<Array<NftSaleTransaction>>;
  pageInfo?: Maybe<PageInfo>;
};

export type NftStat = {
  __typename?: 'NFTStat';
  averageSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  averageSalePriceInUSDC?: Maybe<Scalars['Float']>;
  /** Blockchain where the NFT contract is deployed */
  blockchain?: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Marketplace DApp name where the NFT token stats are taken from */
  dappName?: Maybe<MarketplaceDappName>;
  /** Marketplace DApp slug (contract version) where the NFT token stats are taken from */
  dappSlug?: Maybe<MarketplaceDappSlug>;
  dappVersion?: Maybe<Scalars['String']>;
  firstTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  highestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  highestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  highestSaleTransactionId?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID'];
  lastTransactionBlockTimestamp?: Maybe<Scalars['Time']>;
  lowestSalePriceInNativeToken?: Maybe<Scalars['Float']>;
  lowestSalePriceInUSDC?: Maybe<Scalars['Float']>;
  lowestSaleTransactionId?: Maybe<Scalars['String']>;
  timeFrame?: Maybe<TimeFrames>;
  /** NFT contract address on the blockchain */
  tokenAddress: Scalars['Address'];
  /** Unique NFT token ID */
  tokenId?: Maybe<Scalars['String']>;
  tokenNft?: Maybe<TokenNft>;
  totalFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalRoyaltyFeeVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSaleVolumeInNativeToken?: Maybe<Scalars['Float']>;
  totalSaleVolumeInUSDC?: Maybe<Scalars['Float']>;
  totalSalesCount?: Maybe<Scalars['Int']>;
};

export type NftStatFilter = {
  _and?: InputMaybe<Array<NftStatFilter>>;
  _nor?: InputMaybe<Array<NftStatFilter>>;
  _or?: InputMaybe<Array<NftStatFilter>>;
  averageSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  dappName?: InputMaybe<MarketplaceDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<MarketplaceDappSlug_Comparator_Exp>;
  firstTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  highestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  lastTransactionBlockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  lowestSalePriceInUSDC?: InputMaybe<Float_Comparator_Exp>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
  totalSaleVolumeInUSDC?: InputMaybe<Float_Comparator_Exp>;
  totalSalesCount?: InputMaybe<Int_Comparator_Exp>;
};

export type NftStatOrderBy = {
  averageSalePriceInUSDC?: InputMaybe<OrderBy>;
  firstTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  highestSalePriceInUSDC?: InputMaybe<OrderBy>;
  lastTransactionBlockTimestamp?: InputMaybe<OrderBy>;
  lowestSalePriceInUSDC?: InputMaybe<OrderBy>;
  totalSaleVolumeInUSDC?: InputMaybe<OrderBy>;
  totalSalesCount?: InputMaybe<OrderBy>;
};

export type NftStatsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: NftStatFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<NftStatOrderBy>>;
  timeFrame: TimeFrames;
};

export type NftStatsOutput = {
  __typename?: 'NFTStatsOutput';
  NFTStat?: Maybe<Array<NftStat>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Nft = {
  __typename?: 'Nft';
  /** Nested Query - allows retrieving token contract level data */
  token?: Maybe<Token>;
  /** Smart contract address of the NFT token which was sold */
  tokenAddress: Scalars['Address'];
  /** Number of NFT tokens in the sale transaction */
  tokenAmount?: Maybe<Scalars['String']>;
  /** Unique NFT token ID or IDs (if ERC1155) in the sale transaction */
  tokenId: Scalars['String'];
  /** Nested Query - allows retrieving token Token NFT level data, such as images, traits, and so on for each unique NFT in the transfer */
  tokenNft?: Maybe<TokenNft>;
  /** Type of NFT - ERC721 or ERC1155 */
  tokenType?: Maybe<TokenType>;
};

export type NftAttribute = {
  __typename?: 'NftAttribute';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['String']>;
  /** NFT attribute type as defined in the smart contract, e.g. background */
  trait_type?: Maybe<Scalars['String']>;
  /** NFT attribute value as defined in the smart contract, e.g. blue */
  value?: Maybe<Scalars['String']>;
};

export type NftAttributeFilter = {
  _and?: InputMaybe<Array<NftAttributeFilter>>;
  _nor?: InputMaybe<Array<NftAttributeFilter>>;
  _or?: InputMaybe<Array<NftAttributeFilter>>;
  trait_type?: InputMaybe<String_Comparator_Exp>;
  value?: InputMaybe<String_Comparator_Exp>;
};

export type NftAttributesInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter: NftAttributeFilter;
  limit?: InputMaybe<Scalars['Int']>;
};

export type NftAttributesOutput = {
  __typename?: 'NftAttributesOutput';
  NftAttribute?: Maybe<Array<NftAttribute>>;
  pageInfo?: Maybe<PageInfo>;
};

export type NftFilter = {
  _and?: InputMaybe<Array<NftFilter>>;
  _nor?: InputMaybe<Array<NftFilter>>;
  _or?: InputMaybe<Array<NftFilter>>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
};

export type NftInput = {
  tokenAddress: Scalars['Address'];
  tokenId: Scalars['String'];
};

export type NftMetadata = {
  __typename?: 'NftMetadata';
  animationUrl?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<NftAttribute>>;
  backgroundColor?: Maybe<Scalars['String']>;
  /** Description of the token, mirrored from the smart contract */
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  /** Link to the token image, mirrored from the smart contract */
  image?: Maybe<Scalars['String']>;
  imageData?: Maybe<Scalars['String']>;
  /** Name of the token, mirrored from the smart contract */
  name?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
};

export type NftMetadataFilter = {
  _and?: InputMaybe<Array<NftMetadataFilter>>;
  _nor?: InputMaybe<Array<NftMetadataFilter>>;
  _or?: InputMaybe<Array<NftMetadataFilter>>;
  attributes?: InputMaybe<NftAttributeFilter>;
  name?: InputMaybe<String_Comparator_Exp>;
};

export type NftMetadataOrderBy = {
  attributes?: InputMaybe<OrderBy>;
};

export type NftMetadatasInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter: NftMetadataFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<NftMetadataOrderBy>>;
};

export type NftMetadatasOutput = {
  __typename?: 'NftMetadatasOutput';
  NftMetadata?: Maybe<Array<NftMetadata>>;
  pageInfo?: Maybe<PageInfo>;
};

export type NftsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter: NftFilter;
  limit?: InputMaybe<Scalars['Int']>;
};

export type NftsOutput = {
  __typename?: 'NftsOutput';
  Nft?: Maybe<Array<Nft>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderByAsIntString {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  nextCursor: Scalars['String'];
  prevCursor: Scalars['String'];
};

export type Poap = {
  __typename?: 'Poap';
  attendee?: Maybe<PoapAttendee>;
  /** Blockchain associated with the Poap */
  blockchain?: Maybe<EveryBlockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Block Number when POAP was created */
  createdAtBlockNumber?: Maybe<Scalars['Int']>;
  /** Time when POAP was created */
  createdAtBlockTimestamp?: Maybe<Scalars['Time']>;
  /** Poap DApp name */
  dappName?: Maybe<PoapDappName>;
  /** Poap DApp slug (contract version) */
  dappSlug?: Maybe<PoapDappSlug>;
  /** Airstack unique dapp version number */
  dappVersion?: Maybe<Scalars['String']>;
  /** Poap event id */
  eventId?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  mintHash?: Maybe<Scalars['String']>;
  mintOrder?: Maybe<Scalars['Int']>;
  owner: Wallet;
  poapEvent?: Maybe<PoapEvent>;
  /** POAP Contract Address */
  tokenAddress?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenUri?: Maybe<Scalars['String']>;
  transferCount?: Maybe<Scalars['Int']>;
};

export type PoapAttendee = {
  __typename?: 'PoapAttendee';
  owner: Wallet;
  totalPoapOwned?: Maybe<Scalars['Int']>;
};

export type PoapAttendeesInput = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type PoapAttendeesOutput = {
  __typename?: 'PoapAttendeesOutput';
  PoapAttendee?: Maybe<Array<PoapAttendee>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum PoapDappName {
  Poap = 'poap'
}

export type PoapDappName_Comparator_Exp = {
  _eq?: InputMaybe<PoapDappName>;
  _in?: InputMaybe<Array<PoapDappName>>;
};

export enum PoapDappSlug {
  PoapGnosis = 'poap_gnosis',
  PoapMainnet = 'poap_mainnet'
}

export type PoapDappSlug_Comparator_Exp = {
  _eq?: InputMaybe<PoapDappSlug>;
  _in?: InputMaybe<Array<PoapDappSlug>>;
};

export type PoapEvent = {
  __typename?: 'PoapEvent';
  /** Blockchain where the marketplace data is calculated from */
  blockchain?: Maybe<EveryBlockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  contentValue?: Maybe<Media>;
  country?: Maybe<Scalars['String']>;
  dappName?: Maybe<PoapDappName>;
  dappSlug: PoapDappSlug;
  dappVersion?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Time']>;
  eventId?: Maybe<Scalars['String']>;
  eventName?: Maybe<Scalars['String']>;
  /** The Event URL */
  eventURL?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID'];
  /** If Event is Virtual or not */
  isVirtualEvent?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['Map']>;
  poaps?: Maybe<Array<Poap>>;
  startDate?: Maybe<Scalars['Time']>;
  tokenMints?: Maybe<Scalars['Int']>;
};


export type PoapEventPoapsArgs = {
  input?: InputMaybe<PoapsNestedInput>;
};

export type PoapEventFilter = {
  _and?: InputMaybe<Array<PoapEventFilter>>;
  _nor?: InputMaybe<Array<PoapEventFilter>>;
  _or?: InputMaybe<Array<PoapEventFilter>>;
  city?: InputMaybe<String_Comparator_Exp>;
  country?: InputMaybe<String_Comparator_Exp>;
  dappName?: InputMaybe<PoapDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<PoapDappSlug_Comparator_Exp>;
  endDate?: InputMaybe<String_Comparator_Exp>;
  eventId?: InputMaybe<String_Comparator_Exp>;
  eventName?: InputMaybe<String_Comparator_Exp>;
  isVirtualEvent?: InputMaybe<Boolean_Comparator_Exp>;
  startDate?: InputMaybe<String_Comparator_Exp>;
  tokenMints?: InputMaybe<Int_Comparator_Exp>;
};

export type PoapEventOrderBy = {
  endDate?: InputMaybe<OrderBy>;
  startDate?: InputMaybe<OrderBy>;
  tokenMints?: InputMaybe<OrderBy>;
};

export type PoapEventsInput = {
  blockchain: EveryBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: PoapEventFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<PoapEventOrderBy>>;
};

export type PoapEventsOutput = {
  __typename?: 'PoapEventsOutput';
  PoapEvent?: Maybe<Array<PoapEvent>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PoapFilter = {
  _and?: InputMaybe<Array<PoapFilter>>;
  _nor?: InputMaybe<Array<PoapFilter>>;
  _or?: InputMaybe<Array<PoapFilter>>;
  dappName?: InputMaybe<PoapDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<PoapDappSlug_Comparator_Exp>;
  eventId?: InputMaybe<String_Comparator_Exp>;
  owner?: InputMaybe<Identity_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
};

export type PoapOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
};

export type PoapsInput = {
  blockchain: EveryBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: PoapFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<PoapOrderBy>>;
};

export type PoapsNestedInput = {
  blockchain?: InputMaybe<EveryBlockchain>;
  filter?: InputMaybe<PoapFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<PoapOrderBy>>>;
};

export type PoapsOutput = {
  __typename?: 'PoapsOutput';
  Poap?: Maybe<Array<Poap>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectDetails = {
  __typename?: 'ProjectDetails';
  collectionName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Accounts?: Maybe<AccountsOutput>;
  CollectionStats?: Maybe<CollectionStatsOutput>;
  Domain?: Maybe<Domain>;
  Domains?: Maybe<DomainsOutput>;
  MarketplaceStats?: Maybe<MarketplaceStatsOutput>;
  NFTSaleTransactions?: Maybe<NftSaleTransactionsOutput>;
  NFTStats?: Maybe<NftStatsOutput>;
  PoapEvents?: Maybe<PoapEventsOutput>;
  Poaps?: Maybe<PoapsOutput>;
  Socials?: Maybe<SocialsOutput>;
  Token?: Maybe<Token>;
  TokenBalance?: Maybe<TokenBalance>;
  TokenBalances?: Maybe<TokenBalancesOutput>;
  TokenNft?: Maybe<TokenNft>;
  TokenNfts?: Maybe<TokenNftsOutput>;
  TokenTransfer?: Maybe<TokenTransfer>;
  TokenTransfers?: Maybe<TokenTransfersOutput>;
  Tokens?: Maybe<TokensOutput>;
  Wallet?: Maybe<Wallet>;
  XMTPs?: Maybe<XmtPsOutput>;
};


export type QueryAccountsArgs = {
  input: AccountsInput;
};


export type QueryCollectionStatsArgs = {
  input: CollectionStatsInput;
};


export type QueryDomainArgs = {
  input: DomainInput;
};


export type QueryDomainsArgs = {
  input: DomainsInput;
};


export type QueryMarketplaceStatsArgs = {
  input: MarketplaceStatsInput;
};


export type QueryNftSaleTransactionsArgs = {
  input: NftSaleTransactionsInput;
};


export type QueryNftStatsArgs = {
  input: NftStatsInput;
};


export type QueryPoapEventsArgs = {
  input: PoapEventsInput;
};


export type QueryPoapsArgs = {
  input: PoapsInput;
};


export type QuerySocialsArgs = {
  input: SocialsInput;
};


export type QueryTokenArgs = {
  input: TokenInput;
};


export type QueryTokenBalanceArgs = {
  input: TokenBalanceInput;
};


export type QueryTokenBalancesArgs = {
  input: TokenBalancesInput;
};


export type QueryTokenNftArgs = {
  input: TokenNftInput;
};


export type QueryTokenNftsArgs = {
  input: TokenNftsInput;
};


export type QueryTokenTransferArgs = {
  input: TokenTransferInput;
};


export type QueryTokenTransfersArgs = {
  input: TokenTransfersInput;
};


export type QueryTokensArgs = {
  input: TokensInput;
};


export type QueryWalletArgs = {
  input: WalletInput;
};


export type QueryXmtPsArgs = {
  input: XmtPsInput;
};

export type Range_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
};

export type Royalty = {
  __typename?: 'Royalty';
  amount?: Maybe<Scalars['String']>;
  amountInNativeToken?: Maybe<Scalars['String']>;
  amountInUSDC?: Maybe<Scalars['String']>;
  beneficiaryAddress?: Maybe<Scalars['String']>;
  formattedAmount?: Maybe<Scalars['Float']>;
  formattedAmountInNativeToken?: Maybe<Scalars['Float']>;
  formattedAmountInUSDC?: Maybe<Scalars['Float']>;
};

export enum SaleType {
  BundleSale = 'BUNDLE_SALE',
  SingleItemSale = 'SINGLE_ITEM_SALE'
}

export type Social = {
  __typename?: 'Social';
  /** Blockchain associated with the social identity */
  blockchain?: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Social DApp name */
  dappName?: Maybe<SocialDappName>;
  /** Social DApp slug (contract version) */
  dappSlug?: Maybe<SocialDappSlug>;
  /** Airstack unique dapp version number */
  dappVersion?: Maybe<Scalars['String']>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  /** Blockchain address, ENS domain name, social identity such as Farcaster (for Farcaster use 'fc_fid:' prefix followed by the Farcaster user ID like fc_fid:5650, or use 'fc_fname:' prefix followed by the Farcaster user ID like 'fc_fname:vbuterin') or Lens (e.g. 'stani.lens) */
  identity?: Maybe<Scalars['Identity']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  profileCreatedAtBlockNumber?: Maybe<Scalars['Int']>;
  profileCreatedAtBlockTimestamp?: Maybe<Scalars['Time']>;
  profileLastUpdatedAtBlockNumber?: Maybe<Scalars['Int']>;
  profileLastUpdatedAtBlockTimestamp?: Maybe<Scalars['Time']>;
  profileName?: Maybe<Scalars['String']>;
  profileTokenAddress?: Maybe<Scalars['String']>;
  profileTokenId?: Maybe<Scalars['String']>;
  profileTokenUri?: Maybe<Scalars['String']>;
  userAddress?: Maybe<Scalars['Address']>;
  /** blockchain addresses associated with the social profile */
  userAssociatedAddresses?: Maybe<Array<Scalars['Address']>>;
  userCreatedAtBlockNumber?: Maybe<Scalars['Int']>;
  userCreatedAtBlockTimestamp?: Maybe<Scalars['Time']>;
  userHomeURL?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userLastUpdatedAtBlockNumber?: Maybe<Scalars['Int']>;
  userLastUpdatedAtBlockTimestamp?: Maybe<Scalars['Time']>;
  userRecoveryAddress?: Maybe<Scalars['Address']>;
};

export enum SocialDappName {
  Farcaster = 'farcaster',
  Lens = 'lens'
}

export type SocialDappName_Comparator_Exp = {
  _eq?: InputMaybe<SocialDappName>;
  _in?: InputMaybe<Array<SocialDappName>>;
};

export enum SocialDappSlug {
  FarcasterGoerli = 'farcaster_goerli',
  LensPolygon = 'lens_polygon'
}

export type SocialDappSlug_Comparator_Exp = {
  _eq?: InputMaybe<SocialDappSlug>;
  _in?: InputMaybe<Array<SocialDappSlug>>;
};

export type SocialFilter = {
  _and?: InputMaybe<Array<SocialFilter>>;
  _nor?: InputMaybe<Array<SocialFilter>>;
  _or?: InputMaybe<Array<SocialFilter>>;
  dappName?: InputMaybe<SocialDappName_Comparator_Exp>;
  dappSlug?: InputMaybe<SocialDappSlug_Comparator_Exp>;
  identity?: InputMaybe<Identity_Comparator_Exp>;
  isDefault?: InputMaybe<Boolean_Comparator_Exp>;
  profileName?: InputMaybe<String_Comparator_Exp>;
  userAssociatedAddresses?: InputMaybe<Address_Comparator_Exp>;
  userId?: InputMaybe<String_Comparator_Exp>;
};

export type SocialsInput = {
  blockchain: Blockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: SocialFilter;
  limit?: InputMaybe<Scalars['Int']>;
};

export type SocialsNestedInput = {
  blockchain?: InputMaybe<Blockchain>;
  filter?: InputMaybe<SocialFilter>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type SocialsOutput = {
  __typename?: 'SocialsOutput';
  Social?: Maybe<Array<Social>>;
  pageInfo?: Maybe<PageInfo>;
};

export type String_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _ne?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
};

export enum TimeFrames {
  Daily = 'DAILY',
  Lifetime = 'LIFETIME',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type Time_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Time']>;
  _gt?: InputMaybe<Scalars['Time']>;
  _gte?: InputMaybe<Scalars['Time']>;
  _in?: InputMaybe<Array<Scalars['Time']>>;
  _lt?: InputMaybe<Scalars['Time']>;
  _lte?: InputMaybe<Scalars['Time']>;
  _ne?: InputMaybe<Scalars['Time']>;
  _nin?: InputMaybe<Array<Scalars['Time']>>;
};

export type Time_Range_Comparator_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
};

export type Token = {
  __typename?: 'Token';
  /** Smart contract address of the token */
  address: Scalars['Address'];
  /** Base URI of the token contract */
  baseURI?: Maybe<Scalars['String']>;
  /** Blockchain where the token smart contract is deployed */
  blockchain?: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Token contract metadata object */
  contractMetaData?: Maybe<ContractMetadata>;
  /** URI for the token's contract metadata */
  contractMetaDataURI?: Maybe<Scalars['String']>;
  /** The number of decimal places this token uses, default to 18 */
  decimals?: Maybe<Scalars['Int']>;
  /** Airstack unique identifier for the contract */
  id?: Maybe<Scalars['ID']>;
  /** Block number of the token's most recent transfer */
  lastTransferBlock?: Maybe<Scalars['Int']>;
  /** Transaction hash of the token's most recent transfer */
  lastTransferHash?: Maybe<Scalars['String']>;
  /** Timestamp of the token's most recent transfer */
  lastTransferTimestamp?: Maybe<Scalars['Time']>;
  /** Logo image for the contract in various sizes (if available) */
  logo?: Maybe<LogoSizes>;
  /** Name of the token, mirrored from the smart contract */
  name?: Maybe<Scalars['String']>;
  /** The owner of the token contract */
  owner?: Maybe<Wallet>;
  /** off-chain data for the token project */
  projectDetails?: Maybe<ProjectDetails>;
  /** Token contract metadata as it appears inside the contract */
  rawContractMetaData?: Maybe<Scalars['Map']>;
  /** Symbol of the token, mirrored from the smart contract */
  symbol?: Maybe<Scalars['String']>;
  /** Nested Query - allows querying the tokenBalance information */
  tokenBalances?: Maybe<Array<TokenBalance>>;
  /** Nested Query - allows querying the tokenNFTs information */
  tokenNfts?: Maybe<Array<TokenNft>>;
  /** Returns count of all NFT token attribute types and values for the given smart contract */
  tokenTraits?: Maybe<Scalars['Map']>;
  /** Amount of tokens in the protocol */
  totalSupply?: Maybe<Scalars['String']>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  type?: Maybe<TokenType>;
};


export type TokenTokenBalancesArgs = {
  input?: InputMaybe<TokenBalancesNestedInput>;
};


export type TokenTokenNftsArgs = {
  input?: InputMaybe<TokenNftsNestedInput>;
};

export type TokenBalance = {
  __typename?: 'TokenBalance';
  /** Token amount the address currently holds */
  amount: Scalars['String'];
  /** Blockchain where the token smart contract is deployed */
  blockchain?: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Scalars['String'];
  /** Formatted token balance in decimals */
  formattedAmount?: Maybe<Scalars['Float']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID'];
  /** Block number of the latest token balance change happened */
  lastUpdatedBlock: Scalars['Int'];
  /** Timestamp of the latest token balance change happened */
  lastUpdatedTimestamp?: Maybe<Scalars['Time']>;
  /** Nested Query allowing to retrieve address, domain names, social profiles of the owner */
  owner: Wallet;
  /** Nested Query - allows retrieving token contract level data */
  token?: Maybe<Token>;
  /** Smart contract address of the token */
  tokenAddress: Scalars['Address'];
  /** Unique NFT token ID */
  tokenId?: Maybe<Scalars['String']>;
  /** Nested Query - allows retrieving token NFT contract level data, such as images, traits, and so on */
  tokenNfts?: Maybe<TokenNft>;
  /** Nested Query - allows retrieving token transfer history */
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  tokenType?: Maybe<TokenType>;
};


export type TokenBalanceTokenTransfersArgs = {
  input?: InputMaybe<TokenTransfersNestedInput>;
};

export type TokenBalanceFilter = {
  _and?: InputMaybe<Array<TokenBalanceFilter>>;
  _nor?: InputMaybe<Array<TokenBalanceFilter>>;
  _or?: InputMaybe<Array<TokenBalanceFilter>>;
  formattedAmount?: InputMaybe<Float_Comparator_Exp>;
  owner?: InputMaybe<Identity_Comparator_Exp>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
  tokenType?: InputMaybe<TokenType_Comparator_Exp>;
};

export type TokenBalanceInput = {
  blockchain: TokenBlockchain;
  owner?: InputMaybe<Scalars['Identity']>;
  tokenAddress: Scalars['Address'];
  tokenId?: InputMaybe<Scalars['String']>;
};

export type TokenBalanceOrderBy = {
  lastUpdatedTimestamp?: InputMaybe<OrderBy>;
};

export type TokenBalancesInput = {
  blockchain: TokenBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: TokenBalanceFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<TokenBalanceOrderBy>>;
};

export type TokenBalancesNestedInput = {
  blockchain?: InputMaybe<TokenBlockchain>;
  filter?: InputMaybe<TokenBalanceFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<TokenBalanceOrderBy>>>;
};

export type TokenBalancesOutput = {
  __typename?: 'TokenBalancesOutput';
  TokenBalance?: Maybe<Array<TokenBalance>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum TokenBlockchain {
  Ethereum = 'ethereum',
  Polygon = 'polygon'
}

export type TokenFilter = {
  _and?: InputMaybe<Array<TokenFilter>>;
  _nor?: InputMaybe<Array<TokenFilter>>;
  _or?: InputMaybe<Array<TokenFilter>>;
  address?: InputMaybe<Address_Comparator_Exp>;
  name?: InputMaybe<String_Comparator_Exp>;
  owner?: InputMaybe<Identity_Comparator_Exp>;
  symbol?: InputMaybe<String_Comparator_Exp>;
  type?: InputMaybe<TokenType_Comparator_Exp>;
};

export type TokenInput = {
  address: Scalars['Address'];
  blockchain: TokenBlockchain;
};

export type TokenNft = {
  __typename?: 'TokenNft';
  /** Smart contract address of the token */
  address: Scalars['Address'];
  /** Blockchain where the token smart contract is deployed */
  blockchain?: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Scalars['String'];
  /** Content type of the NFT token (image, video, audio, etc.) */
  contentType?: Maybe<Scalars['String']>;
  /** NFT Media - resized images, animation, videos, etc. */
  contentValue?: Maybe<Media>;
  /** Nested Query - allows querying the erc6551 account */
  erc6551Accounts?: Maybe<Array<Account>>;
  /** Airstack unique identifier for the NFT token */
  id: Scalars['ID'];
  /** Block number of the NFT token most recent transfer */
  lastTransferBlock?: Maybe<Scalars['Int']>;
  /** Transaction hash of the NFT token most recent transfer */
  lastTransferHash?: Maybe<Scalars['String']>;
  /** Timestamp of the NFT token most recent transfer */
  lastTransferTimestamp?: Maybe<Scalars['Time']>;
  /** NFT token metadata and attributes */
  metaData?: Maybe<NftMetadata>;
  /** Nested Query - allows querying the nftSaleTransactions information */
  nftSaleTransactions?: Maybe<Array<NftSaleTransaction>>;
  /** NFT token metadata, mirrored from the smart contract */
  rawMetaData?: Maybe<Scalars['Map']>;
  /** Nested Query - allows retrieving token contract level data */
  token?: Maybe<Token>;
  /** Nested Query - allows querying the tokenBalance information */
  tokenBalances?: Maybe<Array<TokenBalance>>;
  /** Unique NFT token ID */
  tokenId: Scalars['String'];
  /** Nested Query - allows querying the tokenTransfer information */
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
  /** NFT token URI */
  tokenURI?: Maybe<Scalars['String']>;
  /** Amount of NFT tokens in the protocol */
  totalSupply?: Maybe<Scalars['String']>;
  /** NFT Token type: ERC721, or ERC1155 */
  type?: Maybe<TokenType>;
};


export type TokenNftErc6551AccountsArgs = {
  input?: InputMaybe<AccountsNestedInput>;
};


export type TokenNftNftSaleTransactionsArgs = {
  input?: InputMaybe<NftSaleTransactionsNestedInput>;
};


export type TokenNftTokenBalancesArgs = {
  input?: InputMaybe<TokenBalancesNestedInput>;
};


export type TokenNftTokenTransfersArgs = {
  input?: InputMaybe<TokenTransfersNestedInput>;
};

export type TokenNftFilter = {
  _and?: InputMaybe<Array<TokenNftFilter>>;
  _nor?: InputMaybe<Array<TokenNftFilter>>;
  _or?: InputMaybe<Array<TokenNftFilter>>;
  address?: InputMaybe<Address_Comparator_Exp>;
  metaData?: InputMaybe<NftMetadataFilter>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
};

export type TokenNftInput = {
  address: Scalars['Address'];
  blockchain: TokenBlockchain;
  tokenId: Scalars['String'];
};

export type TokenNftOrderBy = {
  tokenId?: InputMaybe<OrderBy>;
};

export type TokenNftsInput = {
  blockchain: TokenBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: TokenNftFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<TokenNftOrderBy>>;
};

export type TokenNftsNestedInput = {
  blockchain?: InputMaybe<TokenBlockchain>;
  filter?: InputMaybe<TokenNftFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<TokenNftOrderBy>>>;
};

export type TokenNftsOutput = {
  __typename?: 'TokenNftsOutput';
  TokenNft?: Maybe<Array<TokenNft>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TokenOrderBy = {
  name?: InputMaybe<OrderBy>;
  symbol?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
};

export type TokenTransfer = {
  __typename?: 'TokenTransfer';
  /** Token amount in the transfer */
  amount?: Maybe<Scalars['String']>;
  /** Token amounts in the transfer, if applicable. This mostly occurs in ERC1155 batch transfers */
  amounts?: Maybe<Array<Scalars['String']>>;
  /** Block number of the token transfer */
  blockNumber?: Maybe<Scalars['Int']>;
  /** Block timestamp of the token transfer */
  blockTimestamp?: Maybe<Scalars['Time']>;
  /** Blockchain where the token transfer took place */
  blockchain?: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId?: Maybe<Scalars['String']>;
  /** Formatted transfer amount in decimals */
  formattedAmount?: Maybe<Scalars['Float']>;
  /** Nested query - sender wallet related information, including address, domains, social profile, other token balances, and transfer history */
  from?: Maybe<Wallet>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  /** Nested query - operator wallet (if the transaction was facilitated via smart contract) related information, including address, domains, social profile, other token balances, and transfer history */
  operator?: Maybe<Wallet>;
  /** Nested query - recipient wallet related information, including address, domains, social profile, other token balances, and transfer history */
  to?: Maybe<Wallet>;
  /** Nested Query - allows retrieving token contract level data */
  token?: Maybe<Token>;
  /** Transferred token smart contract address */
  tokenAddress?: Maybe<Scalars['Address']>;
  /** Unique NFT token ID */
  tokenId?: Maybe<Scalars['String']>;
  /** Unique NFT token IDs if multiple NFTs were a part of the transfer */
  tokenIds?: Maybe<Array<Scalars['String']>>;
  /** Nested Query - allows retrieving token Token NFT level data, such as images, traits, and so on for each unique NFT in the transfer */
  tokenNft?: Maybe<TokenNft>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  tokenType?: Maybe<TokenType>;
  /** Token transfer transction hash */
  transactionHash: Scalars['String'];
  /** Type of the token transfer */
  type?: Maybe<Scalars['String']>;
};

export type TokenTransferFilter = {
  _and?: InputMaybe<Array<TokenTransferFilter>>;
  _nor?: InputMaybe<Array<TokenTransferFilter>>;
  _or?: InputMaybe<Array<TokenTransferFilter>>;
  blockTimestamp?: InputMaybe<Time_Comparator_Exp>;
  formattedAmount?: InputMaybe<Float_Comparator_Exp>;
  from?: InputMaybe<Identity_Comparator_Exp>;
  to?: InputMaybe<Identity_Comparator_Exp>;
  tokenAddress?: InputMaybe<Address_Comparator_Exp>;
  tokenId?: InputMaybe<String_Comparator_Exp>;
  tokenType?: InputMaybe<TokenType_Comparator_Exp>;
  transactionHash?: InputMaybe<String_Comparator_Exp>;
};

export type TokenTransferInput = {
  blockchain: TokenBlockchain;
  transactionHash: Scalars['String'];
};

export type TokenTransferOrderBy = {
  blockTimestamp?: InputMaybe<OrderBy>;
};

export type TokenTransfersInput = {
  blockchain: TokenBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: TokenTransferFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<TokenTransferOrderBy>>;
};

export type TokenTransfersNestedInput = {
  blockchain?: InputMaybe<TokenBlockchain>;
  filter?: InputMaybe<TokenTransferFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<TokenTransferOrderBy>>>;
};

export type TokenTransfersOutput = {
  __typename?: 'TokenTransfersOutput';
  TokenTransfer?: Maybe<Array<TokenTransfer>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum TokenType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export type TokenType_Comparator_Exp = {
  _eq?: InputMaybe<TokenType>;
  _in?: InputMaybe<Array<TokenType>>;
};

export type TokensInput = {
  blockchain: TokenBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: TokenFilter;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<TokenOrderBy>>;
};

export type TokensOutput = {
  __typename?: 'TokensOutput';
  Token?: Maybe<Array<Token>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Wallet = {
  __typename?: 'Wallet';
  /** Returns addresses associated with the identity input */
  addresses?: Maybe<Array<Scalars['Address']>>;
  /** Blockchain associated with the provided identity */
  blockchain?: Maybe<TokenBlockchain>;
  /** Nested query - allows querying domains owned by the address */
  domains?: Maybe<Array<Domain>>;
  /** Blockchain address, ENS domain name, social identity such as Farcaster (for Farcaster use 'fc_fid:' prefix followed by the Farcaster user ID like fc_fid:5650, or use 'fc_fname:' prefix followed by the Farcaster user ID like 'fc_fname:vbuterin') or Lens (e.g. 'stani.lens) */
  identity: Scalars['Identity'];
  /** Nested query - allows querying NFT Sales completed by the wallet */
  nftSaleTransactions?: Maybe<Array<NftSaleTransaction>>;
  /** Returns Poaps owned by the address */
  poaps?: Maybe<Array<Poap>>;
  /** Nested query - allows returning primary domains, if applicable */
  primaryDomain?: Maybe<Domain>;
  /** Returns social profile information related to the address */
  socials?: Maybe<Array<Social>>;
  /** Nested query - allows returning token balances */
  tokenBalances?: Maybe<Array<TokenBalance>>;
  /** Nested query - allows returning token transfers and related information */
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
  /** Nested query - allows querying the XMTP enabled addresses */
  xmtp?: Maybe<Array<Xmtp>>;
};


export type WalletDomainsArgs = {
  input?: InputMaybe<DomainsNestedInput>;
};


export type WalletNftSaleTransactionsArgs = {
  input?: InputMaybe<NftSaleTransactionsNestedInput>;
};


export type WalletPoapsArgs = {
  input?: InputMaybe<PoapsNestedInput>;
};


export type WalletSocialsArgs = {
  input?: InputMaybe<SocialsNestedInput>;
};


export type WalletTokenBalancesArgs = {
  input?: InputMaybe<TokenBalancesNestedInput>;
};


export type WalletTokenTransfersArgs = {
  input?: InputMaybe<TokenTransfersNestedInput>;
};


export type WalletXmtpArgs = {
  input?: InputMaybe<XmtPsNestedInput>;
};

export type WalletInput = {
  blockchain: TokenBlockchain;
  identity: Scalars['Identity'];
};

export type Xmtp = {
  __typename?: 'XMTP';
  blockchain?: Maybe<EveryBlockchain>;
  /** Airstack unique identifier for the data point */
  id?: Maybe<Scalars['ID']>;
  isXMTPEnabled?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<Wallet>;
};

export type XmtpFilter = {
  _and?: InputMaybe<Array<XmtpFilter>>;
  _nor?: InputMaybe<Array<XmtpFilter>>;
  _or?: InputMaybe<Array<XmtpFilter>>;
  owner?: InputMaybe<Identity_Comparator_Exp>;
};

export type XmtPsInput = {
  blockchain: EveryBlockchain;
  cursor?: InputMaybe<Scalars['String']>;
  filter: XmtpFilter;
  limit?: InputMaybe<Scalars['Int']>;
};

export type XmtPsNestedInput = {
  blockchain?: InputMaybe<EveryBlockchain>;
  filter?: InputMaybe<XmtpFilter>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type XmtPsOutput = {
  __typename?: 'XMTPsOutput';
  XMTP?: Maybe<Array<Xmtp>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserNfTsQueryVariables = Exact<{
  req: TokenBalancesInput;
}>;


export type UserNfTsQuery = { __typename?: 'Query', TokenBalances?: { __typename?: 'TokenBalancesOutput', TokenBalance?: Array<{ __typename?: 'TokenBalance', id: string, chainId: string, blockchain?: TokenBlockchain | null, tokenAddress: any, tokenId?: string | null, tokenType?: TokenType | null, formattedAmount?: number | null, tokenNfts?: { __typename?: 'TokenNft', tokenURI?: string | null, metaData?: { __typename?: 'NftMetadata', image?: string | null, animationUrl?: string | null } | null } | null }> | null, pageInfo?: { __typename?: 'PageInfo', prevCursor: string, nextCursor: string } | null } | null };


export const UserNfTsDocument = gql`
    query UserNFTs($req: TokenBalancesInput!) {
  TokenBalances(input: $req) {
    TokenBalance {
      id
      chainId
      blockchain
      tokenAddress
      tokenId
      tokenType
      formattedAmount
      tokenNfts {
        tokenURI
        metaData {
          image
          animationUrl
        }
      }
    }
    pageInfo {
      prevCursor
      nextCursor
    }
  }
}
    `;

/**
 * __useUserNfTsQuery__
 *
 * To run a query within a React component, call `useUserNfTsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNfTsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNfTsQuery({
 *   variables: {
 *      req: // value for 'req'
 *   },
 * });
 */
export function useUserNfTsQuery(baseOptions: Apollo.QueryHookOptions<UserNfTsQuery, UserNfTsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNfTsQuery, UserNfTsQueryVariables>(UserNfTsDocument, options);
      }
export function useUserNfTsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNfTsQuery, UserNfTsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNfTsQuery, UserNfTsQueryVariables>(UserNfTsDocument, options);
        }
export type UserNfTsQueryHookResult = ReturnType<typeof useUserNfTsQuery>;
export type UserNfTsLazyQueryHookResult = ReturnType<typeof useUserNfTsLazyQuery>;
export type UserNfTsQueryResult = Apollo.QueryResult<UserNfTsQuery, UserNfTsQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    