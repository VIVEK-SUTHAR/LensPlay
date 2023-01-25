import React, { FC } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import Heading from "./Heading";

const CommentSkeleton=()=>{
    return (
<View
      style={{
        flexDirection: "row",
        backgroundColor: "#111111",
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
          <View style={{width:40,height:40,backgroundColor: "rgba(255,255,255,0.1)",borderRadius:50}} />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{width:90,height:10,backgroundColor: "rgba(255,255,255,0.1)" }} />
          <View style={{width:40,height:10,backgroundColor: "rgba(255,255,255,0.1)" }} />
        </View>

        {/* <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }> */}
        <View style={{width:'100%',height:10,marginTop:7,backgroundColor:'rgba(255,255,255,0.1)'}}/>
        <View style={{width:'85%',height:10,marginTop:4,backgroundColor:'rgba(255,255,255,0.1)'}}/>
          
        {/* </Hyperlink> */}
      </View>
    </View>
    )
}

export default CommentSkeleton;