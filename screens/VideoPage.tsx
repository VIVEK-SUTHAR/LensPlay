import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons';
import React from 'react'
import { primary } from '../constants/Colors';
import useStore from '../store/Store';

const VideoPage = () => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = +.userFeed;
  // console.log(userFeed)
  console.log(currentIndex)
  return (
    <View>
      <View style={{ height: 200 }}>
        <Image source={require('../assets/images/yt.webp')} style={{ height: '100%', width: '100%', borderRadius: 10, resizeMode: 'contain' }} />
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ flex: 0.98, fontSize: 18, fontWeight: "600" }}>{userFeed[currentIndex]?.root?.metadata?.name}</Text>
          <Feather name="chevron-down" size={34} color="black" />
        </View>
        <View style={{ flexDirection: 'row', opacity: 0.5, marginTop: 8 }}>
          <Text style={{ marginRight: 10 }}>3094505 views</Text>
          <Text>May 16, 2019</Text>
        </View>
        <View style={{marginTop: 10}}>
          <View style={{ backgroundColor: primary, width: 70,height: 4 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
            <AntDesign name="like2" size={24} color="black" />
            <Text style={{marginLeft: 4}}>51K</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default VideoPage

const styles = StyleSheet.create({})