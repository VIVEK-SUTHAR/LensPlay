import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
function ConnectWallet({ navigation }: RootStackScreenProps<"ConnectWallet">){

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return (    
<SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ position: "relative",alignItems:"center"}}>
        <Image
          source={require("../assets/images/Vector257.png")}
          style={{ width: windowWidth, height: windowWidth + 105 }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login2.png")}
          style={{ width: windowWidth*0.9, height: 495, position: "absolute",bottom:32,right:0 }}
          resizeMode={"contain"}
        />
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <Heading
          title={"LensPlay"}
          style={{
            fontSize: 64,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        />
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal:34,
            marginTop:8
          }}
        >
          <StyledText
            title={"See the world in a"}
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "500",
              textAlign: "right",
            }}
          />
          <View style={{flexDirection:"row" }} >
            <StyledText
              title={"different"}
              style={{
                fontSize: 24,
                color: "#93E9C8",
                fontWeight: "500",
                textAlign: "right",
                marginRight:8
              }}
            />
            <StyledText
              title={"way"}
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "500",
                textAlign: "right",
              }}
            />
          </View>
        </View>
        <View style={{ padding: 16,marginTop:16 }}>
          <Button
            title="Connect Wallet"
            bg="#93E9C8"
            borderRadius={5}
            textStyle={{ fontWeight: "700", fontSize: 24 }}
            py={16}
          />
        </View>
      </View>
    </SafeAreaView>
    )
}
export default ConnectWallet;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
  });