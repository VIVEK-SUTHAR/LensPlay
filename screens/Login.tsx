import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { MotiImage, MotiView } from "moti";
import * as React from "react";
import { Dimensions, Image, Linking, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { LENSPLAY_SITE } from "../constants";
import linking from "../navigation/LinkingConfiguration";
import { RootStackScreenProps } from "../types/navigation/types";
import ConnectWallet from "./ConnectWallet";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [login, setLogin] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", top: "20%" }}>
        <View>
          <MotiView
            style={styles.box1}
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 350,
              delay: 450,
            }}
          >
            <Icon name="shots_outline" color="white" size={64} />
          </MotiView>
        </View>
        <View style={{ flexDirection: "row", padding: 8 }}>
          <MotiView
            style={styles.box2}
            from={{ opacity: 0, scale: 0.5, translateX: -150 }}
            animate={{ opacity: 1, scale: 1, translateX: 0 }}
            transition={{
              type: "timing",
              duration: 550,
              delay: 450,
            }}
          >
            <Icon name="play" color="white" size={36} />
          </MotiView>
          <MotiView
            style={styles.box3}
            from={{ opacity: 0, scale: 0.5, translateX: 150 }}
            animate={{ opacity: 1, scale: 1, translateX: 0 }}
            transition={{
              type: "timing",
              duration: 550,
              delay: 450,
            }}
          >
            <Image
              style={{ width: 64, height: 64 }}
              source={require("../assets/images/lens.png")}
            />
            {/* <Icon name="play" color="white" size={36} /> */}
          </MotiView>
          {/* <MotiImage
            source={{ uri: require("../assets/images/lens.png") }}
          /> */}
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          top: "25%",
        }}
      >
        <View style={{}}>
          <Heading
            title={"LensPlay"}
            style={{
              fontSize: 64,
              color: "white",
              fontWeight: "800",
              textAlign: "center",
              // fontFamily:"Raleway"
              // marginTop:"70%"
            }}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              // paddingHorizontal: 34,
              marginTop: 8,
              justifyContent: "flex-end",
              paddingTop: "4%",
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
            <View style={{ flexDirection: "row", marginTop: -4 }}>
              <StyledText
                title={"different"}
                style={{
                  fontSize: 24,
                  color: "#01B35A",
                  fontWeight: "500",
                  textAlign: "right",
                  marginRight: 8,
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
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
        <StyledText
          title={
            <>
              <StyledText
                title={"By clicking on get started you agree to our"}
                style={{color:"gray",fontSize:12}}
              />{" "}
              <StyledText
                style={{ textDecorationLine: "underline",color:"white",fontSize:12 }}
                title={"Privacy Policy"}
                onPress={()=>{Linking.openURL(LENSPLAY_SITE)}}
              />{" "}
              <StyledText title={"and "} style={{color:"gray"}}/>
              <StyledText
                style={{ textDecorationLine: "underline",color:"white",fontSize:12 }}
                title={"Terms and Condition"}
                onPress={()=>{Linking.openURL(LENSPLAY_SITE)}}

              />{" "}
            </>
          }
          style={{marginBottom:8}}
        />
        <Button
          onPress={async () => {
            navigation.navigate("ConnectWallet");
          }}
          title="Get Started"
          bg="#333333"
          borderRadius={10}
          textStyle={{ fontWeight: "800", fontSize: 24, color: "white" }}
          py={10}
          icon={<AntDesign name="arrowright" size={20} color="white" />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  box1: {
    width: 144,
    height: 144,
    backgroundColor: "#56CBF9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    width: 66,
    height: 66,
    backgroundColor: "#EBDD4E",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal:4,
    marginHorizontal: 5,
  },
  box3: {
    width: 66,
    height: 66,
    backgroundColor: "#9EF01A",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal:4,
    marginHorizontal: 5,
  },
});