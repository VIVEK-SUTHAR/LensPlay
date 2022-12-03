// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import MyVideos from "../components/MyVideos";
import VideoCard from "../components/VideoCard";
import { primary, secondary } from "../constants/Colors";
import useStore from "../store/Store";
import getPublications from "../apollo/Queries/getPublications";

const Profile = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isVideoAvilable, setIsVideoAvilable] = useState<boolean>(true);
  const store = useStore();
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
      setProfile(profiledata.data);
      const getUserVideos = await client.query({
        query: getPublications,
        variables: {
          id: store.profileId,
        },
      });
      console.log(getUserVideos.data.publications.items[0].appId);
      setallVideos(getUserVideos.data.publications.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
        <View
          style={{
            height: 150,
            display: "flex",
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
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
                  borderWidth: 5,
                  borderColor: secondary,
                }}
              />
              <View style={{ padding: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold" }}
                  numberOfLines={1}
                >
                  {profile?.profile?.name}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {profile?.profile?.bio}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: primary,
                  borderRadius: 50,
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
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
          {/* <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ut delectus enim corporis. Quod libero laudantium sequi nihil neque quas iste cupiditate, nemo magni saepe vero! Debitis ratione officia sint corporis perspiciatis a facilis nihil inventore, dicta error. Esse obcaecati ut quam optio consequatur in repellat hic quas amet nobis?</Text> */}
        </View>
        <View
          style={{
            width: "100%",
            borderRadius: 15,
            paddingVertical: 5,
            backgroundColor: primary,
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              borderRightWidth: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: 20 }}>{profile?.profile?.stats?.totalPosts}</Text>
            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: 'bold' }}>Post</Text>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 20 }}>{profile?.profile?.stats?.totalFollowers}</Text>
            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: 'bold' }}>Subscribers</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginVertical: 20 }}>Videos</Text>
          <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} />
          <MyVideos navigation={navigation} />
        </View>
      </View>
    </ScrollView >
  );
};

export default Profile;

const styles = StyleSheet.create({});
