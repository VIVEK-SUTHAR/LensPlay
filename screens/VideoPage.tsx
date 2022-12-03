<<<<<<< HEAD
import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather,AntDesign,Entypo } from '@expo/vector-icons';
import React from 'react'
import { primary } from '../constants/Colors';
import useStore from '../store/Store';
import { useState } from 'react';
=======
import { StyleSheet, Text, View, Image } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import React from "react";
import { primary } from "../constants/Colors";
import { Video } from "expo-av";
>>>>>>> 88c6237 (Video Player Added)

const VideoPage = () => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const [descOpen, setDescOpen] = useState(false);
  // console.log(userFeed)
  console.log(userFeed[currentIndex]?.comments)
  // console.log(currentIndex)
  return (
    <View>
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode="contain"
        useNativeControls={true}
        isLooping={true}
        style={styles.video}
        usePoster={true}
        posterSource={{
          uri: "https://ipfs.io/ipfs/QmUohae5YN2QreKUDERZ34TozrXT2q84opPaNYUKVjk5qh",
        }}
      />

      <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
<<<<<<< HEAD
          <Text style={{ flex: 0.98, fontSize: 20, fontWeight: "800" }}>{userFeed[currentIndex]?.root?.metadata?.name}</Text>
          <Feather name={`chevron-${descOpen?'up':'down'}`} size={34} color="black" onPress={()=>setDescOpen(!descOpen)} />
        </View>
        {
          descOpen?<View>
          <Text>{userFeed[currentIndex]?.root?.metadata?.description}</Text>
        </View>:<Text></Text>
        }
        <View style={{ flexDirection: 'row', opacity: 0.5, marginTop: 8 }}>
          <Text style={{ marginRight: 10 }}>3094505 views</Text>
          <Text>May 16, 2019</Text>
        </View>
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{backgroundColor: primary, width: 80,height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
=======
          <Text style={{ flex: 0.98, fontSize: 18, fontWeight: "600" }}>
            Why this BILLIONAIRE refuses to BUY a HOUSE ft. Nikhil Kamath
          </Text>
          <Feather name="chevron-down" size={34} color="black" />
        </View>
        <View style={{ flexDirection: "row", opacity: 0.5, marginTop: 8 }}>
          <Text style={{ marginRight: 10 }}>3094505 views</Text>
          <Text>May 16, 2019</Text>
        </View>
        <View>
          <View style={{ backgroundColor: primary, width: 24 }}>
>>>>>>> 88c6237 (Video Player Added)
            <AntDesign name="like2" size={24} color="black" />
            <Text style={{marginLeft: 4, fontSize: 15}}>{userFeed[currentIndex]?.root?.stats?.totalUpvotes}</Text>
          </View>
          <View style={{backgroundColor: primary, width: 80,height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
            <AntDesign name="dislike2" size={24} color="black" />
            <Text style={{marginLeft: 4, fontSize: 15}}>{userFeed[currentIndex]?.root?.stats?.totalDownvotes}</Text>
          </View>
          <View style={{backgroundColor: primary, width: 80,height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
            <Entypo name="share" size={24} color="black" />
            <Text style={{marginLeft: 4 , fontSize: 15}}>Share</Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 25, fontWeight: '800', marginTop: 20}}>Comments</Text>
          {
            (userFeed[currentIndex]?.comments == 0)?<Text style={{fontSize: 16, marginTop: 10}}>There are no comments yet</Text>:<View style={{flexDirection: 'row'}}>
            <View style={{height: 60, width: 60 }}>
              <Image style={{height: '100%', width: '100%', borderRadius: 30}} source={{ uri: userFeed[currentIndex]?.comments[0]?.profile?.picture?.original?.url}} />
            </View>
            <View>
            <Text>{userFeed[currentIndex]?.comments[0]?.profile?.name}</Text>
            <Text>{userFeed[currentIndex]?.comments[0]?.metadata?.description}</Text>
            </View>
          </View>
          }
        </View>
      </View>
    </View>
  );
};

export default VideoPage;

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
});
