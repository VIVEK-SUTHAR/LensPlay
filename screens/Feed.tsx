import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../components/VideoCard'
import Create from '../components/Create'
import useStore from '../store/Store'

const Feed = ({navigation}:{navigation:any}) => {
  const state = useStore();
  const isOpen = state.isOpen;
  return (
        <View>
          {
            isOpen?<View>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
        </View>:<ScrollView>
        <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
            <VideoCard navigation={navigation}></VideoCard>
        </ScrollView>
          }
        {
          isOpen?<View style={{position: 'absolute', top: 640, left: 0, right: 0}}>
          <Create />
        </View>:<View><Text>Sahil</Text></View>
        }
        </View>
  )
}

export default Feed;

const styles = StyleSheet.create({});
