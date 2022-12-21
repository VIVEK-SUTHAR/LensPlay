import * as React from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import getPublications from "../apollo/Queries/getPublications";
import VideoCard from "../components/VideoCard";
import convertDate from "../utils/formateDate";
import getIPFSLink from "../utils/getIPFSLink";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";

const Profile = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isVideoAvilable, setIsVideoAvilable] = useState<boolean>(true);
  const store = useStore();
  useEffect(() => {
    getProfleInfo();
  }, [navigation]);

  const getProfleInfo = async () => {
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: store.profileId,
        },
      });
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
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo().then(() => {
      if (profile == profile) {
        ToastAndroid.show("Profile is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} colors={[primary]} progressBackgroundColor={dark_secondary} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
          <View
            style={{
              height: 150,
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          >
            <Image
              source={{
                uri: getIPFSLink(profile?.profile?.coverPicture?.original?.url),
              }}
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
                uri: getIPFSLink(profile?.profile?.picture?.original?.url),
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
            <Heading title={profile?.profile?.name} style={{ fontSize: 20, fontWeight: "bold", color: "white" }}/>
            <SubHeading title={`@${profile?.profile?.handle} · ${profile?.profile?.stats?.totalFollowers} Subscribers · ${profile?.profile?.stats?.totalPosts} Videos`} style={{ fontSize: 12, color: "white", marginTop: 2 }}/>
            <SubHeading title={profile?.profile?.bio} style={{ fontSize: 14, color: "gray", textAlign: "center" }}/>
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

          <View style={{ paddingVertical: 10 }}>
            <Heading title="Videos" style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
              }}/>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
