import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../components/VideoCard'

const Feed = ({navigation}:{navigation:any}) => {
  return (
        <ScrollView>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
        </ScrollView>
  )
}

export default Feed

const styles = StyleSheet.create({})