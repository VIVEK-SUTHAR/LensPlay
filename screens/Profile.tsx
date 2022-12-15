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
import convertDate from "../utils/formateDate";

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
              justifyContent: "space-between",
              width: "100%",
              marginTop: "-10%",
            }}
          >
            <Image
              source={{
                uri: `https://ipfs.io/ipfs/${
                  profile?.profile?.picture?.original?.url.split("//")[1]
                }`,
              }}
              style={{
                height: 100,
                width: 100,
                marginTop: -30,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: dark_primary,
              }}
            />
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  // backgroundColor: primary,
                  borderRadius: 50,
                  borderColor: primary,
                  borderWidth: 1,
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: primary,
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Subscribe
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 4 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              numberOfLines={1}
            >
              {profile?.profile?.name}
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              {profile?.profile?.bio}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              borderRadius: 20,
              paddingVertical: 5,
              // backgroundColor: primary,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
              borderWidth: 1,
              borderColor: primary,
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: primary,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20, color: primary }}>
                {profile?.profile?.stats?.totalPosts}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: primary,
                }}
              >
                Post
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20, color: primary }}>
                {profile?.profile?.stats?.totalFollowers}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: primary,
                }}
              >
                Subscribers
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 4, paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginVertical: 20,
                color: "white",
              }}
            >
              Videos
            </Text>
            {allVideos?.map((item, index) => {
              if (item.appId.includes("lenstube")) {
                return (
                  <VideoCard
                    navigation={navigation}
                    key={item?.id}
                    id={item?.id}
                    date={convertDate(item?.createdAt)}
                    banner={item?.metadata?.cover}
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
