import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { dark_secondary, primary } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { client } from "../apollo/client";
import searchPublicationQuery from "../apollo/Queries/searchPublicationQuery";
import VideoCard from "../components/VideoCard";
import { EvilIcons } from "@expo/vector-icons";

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
      console.log(result.data);

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
        <View style={{
          width: "88%",
          flexDirection: 'row',
          alignItems: 'center',
          padding: 4,
          borderRadius: 20,
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: "rgba(255,255,255,0.04)",
        }}>
          <EvilIcons name="search" size={24} color="white" />
          <TextInput
            ref={textRef}
            selectionColor={primary}
            placeholder="Type something to search..."
            placeholderTextColor={"gray"}
            clearButtonMode={"while-editing"}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            onSubmitEditing={getSearchResult}
            style={{
              width: "100%",
              marginLeft: 4,
              color: 'white',
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
