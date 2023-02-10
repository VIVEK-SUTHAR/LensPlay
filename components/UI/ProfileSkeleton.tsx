import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import {
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
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#111111",
      }}
    >
      <View
        style={{
          height: 180,
          alignItems: "flex-start",
          marginBottom: 30,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "-20%",
          marginLeft: 18,
        }}
      >
        <View
          style={{
            // padding:30,
            height: 90,
            width: 90,
            borderRadius: 50,
            // justifyContent: "center",
            backgroundColor: "white",
          }}
        />
        <View
          style={{
            position: "relative",
            // justifyContent: "flex-end",
            height: 36,
            width: 108,
            marginTop: 44,
            marginRight: 16,
            borderRadius: 50,
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 12,
          // alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            marginVertical: 10,
            width: 80,
            height: 16,
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        />
        <View
          style={{
            // marginHorizontal: 5,
            width: 100,
            height: 10,
            backgroundColor: "gray",
          }}
        />
        <View
          style={{
            height: 10,
            width: 200,
            backgroundColor: "gray",
            marginVertical: 10,
            justifyContent: "center",
          }}
        />
      </View>

      <View
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
      </View>
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
      {/* <View style={{ paddingVertical: 10 }}>
        <View style={{ paddingVertical: 10 }}>
          <Heading
            title="Videos"
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "white",
            }}
          />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </View>
      </View> */}
    </View>
  );
};

export default ProfileSkeleton;
