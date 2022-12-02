/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
//@ts-ignore
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';
import VideoPage from '../screens/VideoPage';
import { primary, secondary } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Feed from '../screens/Feed';
import Login from '../screens/Login';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='VideoPage' component={VideoPage} options={{ headerShown: true, presentation: "card" }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 50,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 10,
        }
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>
                <Feather name="home" size={24} color='black' />
              </View>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='Trending'
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>

                <Feather name="trending-up" size={24} color="black" />
              </View>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='Add'
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>
                <AntDesign name="pluscircleo" size={24} color='black' />
              </View>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='Notifications'
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>
                <Ionicons name="notifications-outline" size={24} color="black" />
              </View>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>
                <Feather name="user" size={24} color="black" />
              </View>
            )
          }
        }}
      />
    </BottomTab.Navigator>
  );
}

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */

// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
