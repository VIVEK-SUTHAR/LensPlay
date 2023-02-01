import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useComments } from '../../hooks/useFeed'
import Heading from '../UI/Heading'
import AnimatedLottieView from 'lottie-react-native'
import CommentSkeleton from '../UI/CommentSkeleton'
import SubHeading from '../UI/SubHeading'
import CommentCard from '../CommentCard'
import { Comments } from "../../types/Lens/Feed";



const Comment = ({publicationId}:{publicationId: string}) => {
    const { data: commentData, error, loading } = useComments(publicationId);

    if (error) {
        console.log('error aya');
        
        return <NotFound />;
    }

    if (loading) {
        console.log('loading');
        return <Loading />
        
    };

    if (!commentData) {
        console.log('nahi mila');
        
        return <NotFound />
    };

    const comments = commentData.publications.items;
    
    return (
       <SafeAreaView>
        <ScrollView>
        <View>
            <SubHeading
              title="Comments"
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
                marginBottom: 8,
              }}
            />
             {comments?.map((item:Comments) => {
                    return (
                      <CommentCard
                        key={item?.id}
                        username={item?.profile?.handle}
                        avatar={item?.profile?.picture?.original?.url}
                        commentText={
                          item?.metadata?.content || item?.metadata?.description
                        }
                        commentTime={item?.createdAt}
                        id={item?.profile?.id}
                        isFollowdByMe={item?.profile?.isFollowedByMe}
                        name={item?.profile?.name}
                        stats={item?.stats}
                        commentId={item?.id}
                      />
                    );
                  })
            }
            </View>
        </ScrollView>
       </SafeAreaView>
    )
}

export default Comment;


const NotFound = () => {
    return (
        <SafeAreaView>
            <View style={{ maxHeight: 200 }}>
                <AnimatedLottieView
                    autoPlay
                    style={{
                        height: "90%",
                        alignSelf: "center",
                        width: "100%",
                    }}
                    source={require("../../assets/nocomments.json")}
                />
                <Heading
                    title="There are no comments yet"
                    style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: "600",
                    }}
                ></Heading>
            </View>
        </SafeAreaView>
    )
}

const Loading = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
            </ScrollView>
        </SafeAreaView>

    )
}
