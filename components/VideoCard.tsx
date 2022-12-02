import * as React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { primary, secondary } from '../constants/Colors'

type videoPageProp = {
  navigation: any,
}

const VideoCard = ({ navigation }: videoPageProp) => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('VideoPage')
    }}>
      <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
        <View style={{ height: 150 }}>
          <Image source={require('../assets/images/test.png')} style={{ height: '100%', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'contain' }} />
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: primary, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <View style={{ flex: 0.95 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>How to use tailwind with svelte kansf ksnf </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>By Someone on 23 June</Text>
          </View>
          <View style={{ height: 40, width: 40 }}>
            <Image source={require('../assets/images/harshbhai.png')} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default VideoCard

const styles = StyleSheet.create({})