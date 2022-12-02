import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather,AntDesign } from '@expo/vector-icons';
import React from 'react'
import { primary } from '../constants/Colors';

const VideoPage = () => {
  return (
    <View>
      <View style={{ height: 200 }}>
        <Image source={require('../assets/images/yt.webp')} style={{ height: '100%', width: '100%', borderRadius: 10, resizeMode: 'contain' }} />
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ flex: 0.98, fontSize: 18, fontWeight: "600" }}>Why this BILLIONAIRE refuses to BUY a HOUSE ft. Nikhil Kamath</Text>
          <Feather name="chevron-down" size={34} color="black" />
        </View>
        <View style={{ flexDirection: 'row', opacity: 0.5, marginTop: 8 }}>
          <Text style={{ marginRight: 10 }}>3094505 views</Text>
          <Text>May 16, 2019</Text>
        </View>
        <View>
          <View style={{backgroundColor: primary, width: 24}}>
            <AntDesign name="like2" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default VideoPage

const styles = StyleSheet.create({})