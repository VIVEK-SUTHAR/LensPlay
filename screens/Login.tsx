import { Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const Login = () => {
    const connector = useWalletConnect();
    const [isconnected, setIsconnected] = useState<boolean>(false)
  const connectWallet = React.useCallback(() => {
    return connector.connect().then(()=>{
        setIsconnected(true)
    });
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
    return (
        <SafeAreaView>
            <View style={{ height: "50%", paddingEnd: 10, width: '100%' }}>
                <Image source={require("../assets/images/test.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
            </View>
            <View style={{ height: "50%", padding: 20 }}>
                <Text style={{ color: "white", fontSize: 32, fontWeight: "800", textAlign: "center" }}>Welcome to LensPlay</Text>
                <Text style={{ color: "white", fontSize: 28, fontWeight: "600", textAlign: "center" }}>Login</Text>
                {!!connector.connected && (
        <>
          <Text style={{color:"white"}}>{connector.accounts[0]}</Text>
          <TouchableOpacity>
            
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </>
      )}
                <TouchableOpacity onPress={connectWallet}>
                    <View style={{backgroundColor:"white",borderRadius:50,padding:10,marginVertical:10}}>
                        <Text style={{color:"black",fontSize:24,fontWeight:"600",textAlign:"center"}}>{
                            isconnected ? (<Text>Login with Lens</Text>):(<Text>Connect Wallet</Text>)
                        }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})