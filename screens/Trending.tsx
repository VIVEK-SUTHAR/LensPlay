import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import VideoCard from '../components/VideoCard'
import { primary } from '../constants/Colors'
import { client } from '../apollo/client'
import getTrendingPublication from '../apollo/Queries/getTrendingPublication'
import { useEffect } from 'react';

type TrendingPageProps = {
    navigation: any;
};

const Trending = ({ navigation }: TrendingPageProps) => {

    const [TrendingItems, setTrendingItems] = useState([])

    async function getTrendingData() {
        const trendingData = await client.query({
            query: getTrendingPublication,
        });
        setTrendingItems(trendingData.data.explorePublications.items);
        console.log(TrendingItems);
    }

    useEffect(() => {
        getTrendingData();
    }, [])

    return (
        <View>
            {/* <View style={{ margin: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ backgroundColor: primary, paddingHorizontal: 16, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Most Rated</Text>
                </View>
                <View style={{ backgroundColor: primary, paddingHorizontal: 16, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Trending</Text>
                </View>
                <View style={{ backgroundColor: primary, paddingHorizontal: 16, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: 'white' }}>Most liked</Text>
                </View>
            </View> */}
            <ScrollView>
                <View style={{ marginTop: 10 }}>
                    {TrendingItems &&
                        TrendingItems?.map((item, index) => {
                            // if (
                            //     item?.appId?.includes("lenstube") ||
                            //     item?.appId?.includes("lenstube-bytes")
                            // ) {
                            return (
                                <VideoCard
                                    key={index}
                                    navigation={navigation}
                                    title={item?.metadata?.name}
                                    banner={item?.metadata?.media[0]?.original?.url}
                                    avatar={item?.profile?.picture?.original?.url}
                                    uploadedBy={item?.profile?.handle}
                                />
                            );
                            // }
                        })}
                </View>
            </ScrollView>
        </View>
    )
}

export default Trending

const styles = StyleSheet.create({})