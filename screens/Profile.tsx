import * as React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import {
  dark_primary,
  primary,
} from "../constants/Colors";
import useStore from "../store/Store";
import getPublications from "../apollo/Queries/getPublications";
import VideoCard from "../components/VideoCard";
import convertDate from "../utils/formateDate";

const Profile = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isVideoAvilable, setIsVideoAvilable] = useState<boolean>(true);
  const store = useStore();

  console.log(profile);

  useEffect(() => {
    getProfleInfo();
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
                backgroundColor: primary,
              }}
            />
          </View>

          <View style={{ padding: 4, alignItems: "center" }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              numberOfLines={1}
            >
              {profile?.profile?.name}
            </Text>
            <Text style={{ fontSize: 12, color: "white", marginTop: 2 }}>
              @{profile?.profile?.handle} &middot; {profile?.profile?.stats?.totalFollowers} subscribers &middot; {profile?.profile?.stats?.totalPublications} videos
            </Text>
            <Text style={{ fontSize: 14, color: "gray", textAlign: "center" }}>
              {profile?.profile?.bio}
            </Text>
          </View>

          {/* <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                paddingVertical: 8,
                marginVertical: 16,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginHorizontal: 4,
                }}
              >
                Edit Channel
              </Text>
              <Feather name="edit-3" size={24} />
            </View>
          </TouchableOpacity> */}

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
