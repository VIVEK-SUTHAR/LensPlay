import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { primary } from '../constants/Colors';

const Create = () => {
  return (
    <Animated.View style={{ alignItems: 'center', backgroundColor: primary, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <TouchableOpacity
        onPress={async () => {
          //   navigation.navigate("Root");
          // await logInWithLens();
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            // padding: 15,
            marginVertical: 20,
            // marginTop:30,
            height: 70,
            width: 300,
            // display: "flex",
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Start Livestream
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // navigation.navigate("Root");
          // await logInWithLens();
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            // padding: 15,
            marginVertical: 20,
            // marginTop:30,
            height: 70,
            width: 300,
            // display: "flex",
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Upload your video
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Create

const styles = StyleSheet.create({})