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
import { useState } from 'react';
import { ColorSchemeName, TouchableWithoutFeedback, View } from 'react-native';
import VideoPage from '../screens/VideoPage';
import { primary } from '../constants/Colors';
import Feed from '../screens/Feed';
import Login from '../screens/Login';
import { RootTabParamList } from '../types';
import Profile from '../screens/Profile';
import Create from '../components/Create';
import  useStore  from '../store/Store';
import Trending from '../screens/Trending';
import Notification from '../components/Notification'

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
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='VideoPage' component={VideoPage} options={{ headerShown: true, presentation: "card" }} />
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: true, presentation: "card" }} />
      <Stack.Screen name='Create' component={Create} options={{ headerShown: true, presentation: "card" }} />
      <Stack.Screen name='Trending' component={Trending} options={{ headerShown: true, presentation: "card" }} />
      <Stack.Screen name='Notification' component={Notification} options={{ headerShown: true, presentation: "card" }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const state = useStore();
  const setIsOpen = state.setIsOpen;
  const isOpen = state.isOpen;
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
          },
          headerRight: () => {
            return <View
              style={{
                padding: 5,
              }}
            >
              <Feather name="search" size={24} color="black" />
            </View>;
          }
        }}
      />
      <BottomTab.Screen
        name='Trending'
        component={Trending}
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
        name='Create'
        component={Feed}
        options={{
          tabBarLabel: "",
          // tabBarOnPress: () => { setIsOpen(true)},
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableWithoutFeedback onPress={()=> {setIsOpen(!isOpen);}}>
              <View style={{ padding: 5, borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? primary : 'none', height: '100%' }}>
                <AntDesign name="pluscircleo" size={24} color='black' />
              </View>
              </TouchableWithoutFeedback>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='Notifications'
        component={Notification}
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
        component={Profile}
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