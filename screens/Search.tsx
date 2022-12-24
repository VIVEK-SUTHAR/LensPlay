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
import { useQuery } from "@apollo/client";
import AnimatedLottieView from "lottie-react-native";
import { EvilIcons } from "@expo/vector-icons";
const Search = ({ navigation }) => {
  const textRef = useRef(null);
  const [searchPostResult, setSearchPostResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [isfound, setIsfound] = useState(true);
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
    setIsSearching(true);
    try {
      const result = await client.query({
        query: searchPublicationQuery,
        variables: {
          query: searchQuery.toLowerCase().trim(),
        },
      });
      console.log(result);

      setSearchPostResult(result?.data?.search?.items);
      if (searchPostResult.length === 0) {
        setIsfound(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsSearching(false);
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerLeft: () => (
        <View
          style={{
            width: "88%",
            flexDirection: "row",
            alignItems: "center",
            padding: 4,
            borderRadius: 20,
            borderColor: "white",
            borderWidth: 1,
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          <EvilIcons name="search" size={24} color="white" />
          <TextInput
            ref={textRef}
            selectionColor={primary}
            placeholder="Type something to search..."
            placeholderTextColor={"white"}
            clearButtonMode={"always"}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            onSubmitEditing={getSearchResult}
            style={{
              width: "100%",
              marginLeft: 4,
              color: "white",
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_secondary }}>
      <ScrollView>
        {!!isSearching && (
          <>
            <AnimatedLottieView
              autoPlay
              style={{
                height: "auto",
              }}
              source={require("../assets/loader.json")}
            />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  marginVertical: 5,
                  marginHorizontal: 15,
                  fontWeight: "600",
                  alignSelf: "flex-start",
                }}
              >
                Getting videos...
              </Text>
            </View>
          </>
        )}
        {searchPostResult.length > 0 ? (
          <>
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
          <>
            {!!!isfound && (
              <>
                <AnimatedLottieView
                  autoPlay
                  style={{
                    height: "auto",
                  }}
                  source={require("../assets/notfound.json")}
                />
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      marginVertical: 5,
                      marginHorizontal: 15,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    No videos found 😔
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
