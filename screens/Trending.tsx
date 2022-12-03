import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VideoCard from '../components/VideoCard'
import { primary } from '../constants/Colors'

const Trending = () => {
    return (
        <View>
            <View style={{ marginTop: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ backgroundColor: primary, height: 45, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 18, padding: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Most Rated</Text>
                </View>
                <View style={{ backgroundColor: primary, height: 45, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 18, padding: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Trending</Text>
                </View>
                <View style={{ backgroundColor: primary, height: 45, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 18, padding: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Most liked</Text>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
            </View>
        </View>
    )
}

export default Trending

const styles = StyleSheet.create({})