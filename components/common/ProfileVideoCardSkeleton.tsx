import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Dimensions } from 'react-native'

type Props = {}

const ProfileVideoCardSkeleton = (props: Props) => {
  return (
    <Pressable
    style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        marginTop: 16,
    }}
>
    <View>
        <View
            style={{
                width: 160,
                height: 100,
                borderRadius: 8,
                backgroundColor: "#1d1d1d",
            }}
        />
    </View>
    <View>
        <View
            style={{
                width: Dimensions.get("screen").width * 0.36,
                height: 16,
                backgroundColor: "#1d1d1d",
                marginHorizontal: 8,
                marginVertical: 8,
            }}
        />
        <View
            style={{
                width: Dimensions.get("screen").width * 0.3,
                height: 12,
                backgroundColor: "#1d1d1d",
                marginHorizontal: 8,
                marginVertical: 4,
            }}
        />
        <View
            style={{
                width: Dimensions.get("screen").width * 0.2,
                height: 12,
                backgroundColor: "#1d1d1d",
                marginHorizontal: 8,
                marginVertical: 4,
            }}
        />
    </View>
</Pressable>
  )
}

export default ProfileVideoCardSkeleton

const styles = StyleSheet.create({})