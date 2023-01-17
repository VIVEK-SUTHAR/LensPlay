import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { client } from "../apollo/client";
import searchPublicationQuery from "../apollo/Queries/searchPublicationQuery";
import VideoCard from "../components/VideoCard";
import AnimatedLottieView from "lottie-react-native";
import { EvilIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { useAuthStore, useThemeStore } from "../store/Store";
const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
  const theme = useThemeStore();
  const authStore = useAuthStore();
  const textRef = useRef<HTMLInputElement>(null);

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
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
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
      headerStyle: { backgroundColor: "black" },
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
            selectionColor={theme.PRIMARY}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
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
              if (!item.hidden) {
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
              }
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
                  <Button
                    title="Continue browsing..."
                    width={"auto"}
                    type="outline"
                    borderColor={theme.PRIMARY}
                    px={16}
                    textStyle={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "600",
                    }}
                    onPress={() => {
                      navigation.navigate("Root");
                    }}
                  />
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
