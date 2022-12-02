/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
//@ts-ignore
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import VideoPage from '../screens/VideoPage';
import { primary } from '../constants/Colors';
import Feed from '../screens/Feed';
import Login from '../screens/Login';
import { RootStackParamList, RootTabParamList } from '../types';

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

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='VideoPage' component={VideoPage} options={{ headerShown: true, presentation: "card" }} />
    </Stack.Navigator>
  );
}

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