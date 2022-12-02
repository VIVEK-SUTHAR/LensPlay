import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../components/VideoCard'

const Feed = ({navigation}:{navigation:any}) => {
  return (
    <SafeAreaView>
        <ScrollView>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>

        </ScrollView>
    </SafeAreaView>
  )
}

export default Feed

const styles = StyleSheet.create({})