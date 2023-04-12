import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
} from "react-native";
import Heading from "./Heading";
import StyledText from "./StyledText";
import VideoCardSkeleton from "./VideoCardSkeleton";

const ProfileSkeleton = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 10,
        backgroundColor: "#111111",
        height:Dimensions.get("screen").height
      }}
    >
      <View
        style={{
          height: 180,
          alignItems: "flex-start",
          marginBottom: 30,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "-20%",
          marginLeft: 8,
        }}
      >
        <View
          style={{
            height: 90,
            width: 90,
            borderRadius: 50,
            backgroundColor: "#1d1d1d",
          }}
        />
        <View
          style={{
            position: "relative",
            height: 36,
            width: 108,
            marginTop: 44,
            marginRight: 16,
            borderRadius: 50,
            backgroundColor: "#1d1d1d",
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            marginVertical: 10,
            width: 80,
            height: 16,
            backgroundColor: "#1d1d1d",
          }}
        />
        <View
          style={{
            // marginHorizontal: 5,
            width: 100,
            height: 10,
            backgroundColor: "#1d1d1d",
          }}
        />
        <View
          style={{
            height: 10,
            width: 200,
            backgroundColor: "#1d1d1d",
            marginVertical: 10,
            justifyContent: "center",
          }}
        />
      </View>
      <View style={{flexDirection:"row",marginTop:4}}>
        <View
          style={{
            width: 72,
            height: 12,
            backgroundColor: "#1d1d1d",
            marginLeft: 12,
          }}
        />
        <View
          style={{
            width: 72,
            height: 12,
            backgroundColor: "#1d1d1d",
            marginLeft: 12,
          }}
        />
      </View>
      <View
        style={{flexDirection:"row"}}
      >
        <View
          style={{width:36,height:36,borderRadius:50,backgroundColor:'#1d1d1d',marginLeft:12,marginTop:12}}
        />
        <View
          style={{width:36,height:36,borderRadius:50,backgroundColor:'#1d1d1d',marginLeft:8,marginTop:12}}
        />
        <View
          style={{width:36,height:36,borderRadius:50,backgroundColor:'#1d1d1d',marginLeft:8,marginTop:12}}
        />
      </View>
      {/* <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            paddingVertical: 8,
            marginTop: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingHorizontal: 16,
            }}
          >
            <View
              // title=' • Subscribers'
              style={{ width: 108, height: 16, backgroundColor: "#E9E8E8" }}
            />
            <View
              style={{
                height: 24,
                backgroundColor: "black",
                width: 2,
              }}
            ></View>
            <View
              style={{ width: 108, height: 16, backgroundColor: "#E9E8E8" }}
            />
          </View>
        </View>
      </View> */}
      <View style={{ marginTop: 24 }}>
        <View>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledText
              title={"Videos"}
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "600",
                marginLeft:16
              }}
            />
            <Feather name={`chevron-right`} size={24} color="white" />
          </Pressable>
          <ScrollView
            horizontal={true}
            style={{ marginLeft: -12, marginTop: 8 }}
            showsHorizontalScrollIndicator={false}
          >
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
          </ScrollView>
        </View>
        <View style={{ marginTop: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Heading
              title={"Mirrored Videos"}
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "600",
                marginLeft:16,
              }}
            />
            <Feather name={`chevron-right`} size={24} color="white" />
          </View>
          <ScrollView
            horizontal={true}
            style={{ marginLeft: -12, marginTop: 8 }}
            showsHorizontalScrollIndicator={false}
          >
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
            <VideoCardSkeleton width={310} />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSkeleton;
