import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { text } from "stream/consumers";
import { client } from "../apollo/client";
import searchPublicationQuery from "../apollo/Queries/searchPublicationQuery";
import VideoCard from "../components/VideoCard";
import { useQuery } from "@apollo/client";
const Search = ({ navigation }) => {
  const textRef = useRef(null);
  const [searchPostResult, setSearchPostResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useFocusEffect(
    useCallback(() => {
      const focus = () => {
        setTimeout(() => {
          textRef?.current?.focus();
        }, 1);
      };
      focus();
      return focus;
    }, [])
  );
  useEffect(() => {
    return setSearchQuery("");
  }, []);

  async function getSearchResult() {
    try {
      const result = await client.query({
        query: searchPublicationQuery,
        variables: {
          query: searchQuery.toLowerCase(),
        },
      });
      console.log(result);
      
      setSearchPostResult(result?.data?.search?.items);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerLeft: () => (
        <View style={{ width: "89%", padding: 4 }}>
          <TextInput
            ref={textRef}
            selectionColor={primary}
            placeholder="Type something to search..."
            placeholderTextColor={"white"}
            clearButtonMode={"while-editing"}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            onSubmitEditing={getSearchResult}
            style={{
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              color: "white",
              borderColor: primary,
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_secondary }}>
      <ScrollView>
        <Text
          style={{
            paddingHorizontal: 5,
            fontSize: 20,
            marginHorizontal: 8,
            fontWeight: "500",
            color: "white",
          }}
        >
          Here's what we found
        </Text>
        {searchPostResult.length > 0 ? (
          <>
            {searchPostResult.map((item, index) => {
              return (
                <VideoCard
                  key={index}
                  navigation={navigation}
                  avatar={item?.profile?.picture?.original?.url}
                  id={item?.id}
                  banner={item?.profile?.coverPicture?.original?.url}
                  uploadedBy={item?.profile?.handle}
                  title={item?.metadata?.name}
                  playbackId={item?.metadata?.media[0]?.original?.url}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
