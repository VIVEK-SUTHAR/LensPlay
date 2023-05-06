import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FeedItem, LensPublication, VideoPageStats } from "../Lens/Feed";
import type { Mirror, Post, Profile, ProfileQuery } from "../generated";
/**
 
 LENS-PLAY NAVIGATION STRUCTURE

                                   Stack-Navigator
    -------------------------------------------------------------------------------------                               
    -Login  |          -Root           | -VideoPage    |  -Profile  | -Search | -Channel
    -------------------------------------------------------------------------------------                    
                    ->Home     
                    ->Trending
                    ->Create
                    ->Notifications
                    ->Profile
    -------------------------------------------------------------------------------------

 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Root Stack is our main Stack defined in navigation/index.tsx
 * It contains many screens like RootTabs,Search,Channel etc...
 * Here the Type of Root is NavigatorScreenParams<RootTabParamList>
 * Explaination: From the login screen  we will navigate to Root Stack Screen
 * Which we will contain the bottom tab navigation so it will receive the props
 *
 */

/**
 * RootStackParamList defines our Main Stack Screen and The parameters of this screens
 *
 * Screen under Stack include
 * -Root
 * -Login
 * -VideoPage
 * -Profile
 * -Search
 *
 * Here undefined means the screen is not receiving any data throught route
 * Ex:We are not passing any data in Login Screen,so it is defined as undefined
 * As We are passing data in VideoPage like banner,title,publicationId we are defing types
 * and it can be accessed in Screen by navigation.route.params.KEY_NAME;
 *
 */

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  Waitlist: undefined;
  CreateProfile: undefined;
  Loader: undefined;
  JoinWaitlist: undefined;
  ReportPublication: {
    publicationId: string;
  };
  LoginWithLens: undefined;
  EditProfile: undefined;
  LeaderBoard: {
    referralsCount: number;
    rankingPoints: number;
    rankingPosition: number;
    refferalLink: string;
  };
  UserStats: {
    profileId?: string;
    activeTab: string;
  };
  VideoPage: {
    playBackurl?: string;
  };
  Channel: {
    profileId: string;
    isFollowdByMe?: boolean;
    name?: string | null;
    ethAddress?: string;
    handle?: string;
  };
  Search: undefined;
  YourVideos: {
    videos: Post[] | Mirror[];
    title: string;
  };
  ShotsComment: {
    publicationId: string;
  };
  LinkingVideo: {
    id: string;
  };
  FullImage: {
    url: string;
    source: "avatar" | "cover";
  };
  QRLogin: undefined;
  Settings: undefined;
  BugReport: undefined;
  Scanner: undefined;
  UploadVideo: {
    localUrl: string;
    duration?: number | null | undefined;
  };
  UploadShots: undefined;
  AddDetails: undefined;
  AddDescription: undefined;
  VideoTypes: undefined;
  ProfileScanner: undefined;
};

/**
 *
 * RootStackScreenProps defines the props received by Evey screen in Stack
 * They will be type of Native Screen props
 */

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

/**
 * RootTabParamList defins the parameters recived by Screen which will be
 * rendered by Bottom Tab Navigator
 */

export type RootTabParamList = {
  Home: undefined;
  Trending: undefined;
  Shots: undefined;
  Create: undefined;
  Notifications: undefined;
  Account: undefined;
};

export type UploadTabParamsList = {
  Index: undefined;
  UploadScreen: undefined;
  GoLive: undefined;
};

export type UploadScreenProps<
  Screen extends keyof UploadTabParamsList
> = NativeStackScreenProps<UploadTabParamsList, Screen>;

/**
 * RootTabScreenProps Means the Every Screen which is going to rendered by bottom tabs will receive
 * -The Props Of Bottom Tab Screen
 * -As they are in Stack Navigator,it will also receive the Stack navigator props
 * -For defining this composite screen props we are using
 * `CompositeScreenProps` which accepts the two arguments
 * -1st is the primary navigator
 * -2nd is type of a parent navigator or any other source of secondary navigation
 */

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
