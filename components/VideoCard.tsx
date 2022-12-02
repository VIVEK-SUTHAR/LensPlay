import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VideoCard = () => {
  return (
    <View style={{ paddingHorizontal: 10 , marginVertical: 10 }}>
        <View style={{ height: 150 }}>
            <Image source={require('../assets/images/test.png')} style={{height: '100%', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius:10, resizeMode: 'contain' }} />
        </View>
        <View style={{flex: 1, height: 80, padding: 10, flexDirection: 'row', justifyContent:'space-between', alignItems:'center', backgroundColor: '#bdbcf1', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View>
                <Text style={{fontSize: 22}}>Video Title</Text>
                <Text style={{fontSize: 18}}>Lens Handle</Text>
            </View>
            <View style={{height: 60, width: 60 }}>
            <Image source={require('../assets/images/harshbhai.png')} style={{height: '100%', width: '100%' }} />
            </View>
        </View>
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({})