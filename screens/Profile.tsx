import * as React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import {
  dark_primary,
  dark_secondary,
  primary,
  secondary,
} from "../constants/Colors";
import MyVideos from "../components/MyVideos";
import useStore from "../store/Store";
import getPublications from "../apollo/Queries/getPublications";
import { Feather } from "@expo/vector-icons";
import VideoCard from "../components/VideoCard";

const Profile = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isVideoAvilable, setIsVideoAvilable] = useState<boolean>(true);
  const store = useStore();
  useEffect(() => {
    getProfleInfo();
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "LensPlay",
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerRight: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="search" size={24} color="white" />
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
            {profile?.profile?.name || "LensPlay"}
          </Text>
        </View>
      ),
    });
  }, []);
  const getProfleInfo = async () => {
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: store.profileId,
        },
      });
      console.log(store.profileId);

      setProfile(profiledata.data);
      store.setProfiledata(profiledata.data);
      const getUserVideos = await client.query({
        query: getPublications,
        variables: {
          id: store.profileId,
        },
      });

      setallVideos(getUserVideos.data.publications.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
          <View
            style={{
              height: 150,
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          >
            <Image
              source={{ uri: profile?.profile?.coverPicture?.original?.url }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
                resizeMode: "contain",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              marginTop: "-10%",

            }}
          >
            <Image
              source={{
                uri: `https://ipfs.io/ipfs/${profile?.profile?.picture?.original?.url.split("//")[1]
                  }`,
              }}
              style={{
                height: 100,
                width: 100,
                marginTop: -30,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: dark_primary,
                backgroundColor: primary
              }}
            />
          </View>

          <View style={{ padding: 4, alignItems: 'center' }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              numberOfLines={1}
            >
              {profile?.profile?.name}
            </Text>
            <Text style={{ fontSize: 12, color: "white", marginTop: 2 }}>
              iamharsh &middot; 23 subscribers &middot; 34 videos
            </Text>
            <Text style={{ fontSize: 14, color: "gray", textAlign: 'center' }}>
              {profile?.profile?.bio}Doing nothing but doing something which is nothing
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                paddingVertical: 8,
                marginVertical: 16,
              }}
            >
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Subscribe
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ paddingHorizontal: 4, paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              Videos
            </Text>
            {allVideos?.map((item, index) => {
              if (item.appId.includes("lenstube")) {
                console.log(item);

                return (
                  <VideoCard
                    navigation={navigation}
                    key={index}
                    title={item?.metadata?.name}
                    avatar={item?.profile?.picture?.original?.url}
                    playbackId={item?.metadata?.media[0]?.original?.url}
                    uploadedBy={item?.profile?.name}
                  />
                );
              }
            })}
            {/* <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
