

import * as React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
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

      <View style={{ marginVertical: 5,display:'flex',flexDirection:'row',backgroundColor:'white',borderRadius:20}}>
        <View style={{ height: 130 ,width:'50%'}}>
          <Image source={require('../assets/images/yt.webp')} style={{ height: '100%', width: '100%', borderBottomLeftRadius:10,borderTopLeftRadius:10, resizeMode: 'contain' }} />
        </View>
        <View style={{width:'50%', padding: 10, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',borderRadius: 10}}>
          <View style={{ flex: 0.95}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold',flex:1,flexWrap:'wrap'}}>How to use tailwind with svelte kansf ksnf </Text>
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