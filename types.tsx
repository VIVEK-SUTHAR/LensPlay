import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 
 LENS-PLAY NAVIGATION STRUCTURE

                                   Stack-Navigator
    -------------------------------------------------------------------------------------                               
    -Login  |          -Root           | -VideoPage    |  -Proifle  | -Search | -Channel
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

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  VideoPage: {
    publicationId: string;
  };
  Profile: undefined;
  Search: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

/**
 * RootTabScreenProps Means the Every Screen which is going to rendered by bottom tabs will receive
 * -The Props Of Bottom Tab Screen
 * -As they are in Stack Navigator,it will also receive the Stack navigator props
 * -For defining this composite screen props we are using
 * `CompositeScreenProps` which accepts the two arguments
 * -1st is the primary navigator
 * -2nd is type of a parent navigator or any other source of secondary navigation
 */

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
