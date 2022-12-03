

import * as React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { primary, secondary } from '../constants/Colors'

type videoPageProp = {
  navigation: any,
}

const VideoCard = ({ navigation }: videoPageProp) => {
  return (
    <>
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('VideoPage')
    }}>
      <View style={{ paddingHorizontal: 10, marginVertical: 10,display:'flex',flexDirection:'row' }}>
        <View style={{ height: 150 ,width:'50%'}}>
          <Image source={require('../assets/images/test.png')} style={{ height: '100%', width: '100%', borderRadius:10, resizeMode: 'contain' }} />
        </View>
        <View style={{width:'50%', padding: 10, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: primary, borderRadius: 10}}>
          <View style={{ flex: 0.95 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>How to use tailwind with svelte kansf ksnf </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>By June</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
      </>
  )
}

export default VideoCard

const styles = StyleSheet.create({})