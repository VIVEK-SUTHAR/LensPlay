import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { primary, secondary } from "../constants/Colors";

const Login = ({ navigation }: { navigation: any }) => {
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(() => {
    return connector.connect().then(() => {
      setIsconnected(true);
    });
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Image
          source={require("../assets/images/test.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        /> */}
      </View>
      <View style={{borderWidth:2,justifyContent:"center",alignItems:"center" }}>
        <Text
          style={{
            fontSize: 44,
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          Welcome to <Text style={{
            fontSize: 64,
            color: primary,
          }}>LensPlay</Text>
        </Text>
        <View style={{height:'50%',width:'90%',alignItems:"center"}}>
          <Image source={require('../assets/images/lensplay.png')} style={{height:'90%',width:"100%", resizeMode:'center'}}/>
        </View>
        <Text
          style={{
            color: "black",
            fontSize: 28,
            fontWeight: "600",
            textAlign: "center",
            marginVertical: 40,
          }}
        >
          Login
        </Text>
          <ActivityIndicator color={"red"} size="small"/>
        {!!connector.connected && (
          <>
            <Text style={{ color: "black" }}>{connector.accounts[0]}</Text>
          </>
        )}
        {!!connector.connected ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Root");
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 15,
                marginVertical: 10,
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
                Login with Lens
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={connectWallet}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 15,
                marginVertical: 10,
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
                Connect Wallet
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
