import { KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'moti'
import Heading from '../components/UI/Heading'
import Button from '../components/UI/Button'
import { primary } from '../constants/Colors'
import AnimatedLottieView from 'lottie-react-native'

type Props = {}

const JoinWaitlist = (props: Props) => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}>
        <ScrollView 
        contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
            <View
          style={{
            marginBottom: 48,
            paddingVertical: 96,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            backgroundColor: "white",
          }}
        >
          <AnimatedLottieView
            autoPlay
            autoSize
            style={{
              width: "100%",
            }}
            source={ require("../assets/notInWaitlist.json") }
          />
        </View>
    <View>
            <Heading
              title="seems like you have not yet joined waitlist"
              style={{
                fontSize: 24,
                color: "white",
                marginVertical: 10,
                textAlign: "center",
                fontWeight: "600",
              }}
            />
            <Button
              title={"Join waitlist"}
              onPress={() =>
                Linking.openURL(
                  "https://form.waitlistpanda.com/go/WzNdl6Tusvm3k89B3yKL"
                )
              }
              px={8}
              py={12}
              borderRadius={8}
              my={8}
              width={"auto"}
              type={"filled"}
              textStyle={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
              }}
              bg={primary}
            />
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default JoinWaitlist

const styles = StyleSheet.create({})