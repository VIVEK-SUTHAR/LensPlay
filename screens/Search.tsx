import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../apollo/client";
import AnimatedLottieView from "lottie-react-native";
import { EvilIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { useAuthStore, useThemeStore } from "../store/Store";
import { LensPublication } from "../types/Lens/Feed";
import searchProfileQuery from "../apollo/Queries/searchProfileQuery";
import { dark_primary } from "../constants/Colors";
import ProfileCard from "../components/ProfileCard";
import useDebounce from "../hooks/useDebounce";
import { useSearchProfile } from "../hooks/useFeed";
import getIPFSLink from "../utils/getIPFSLink";

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
  const theme = useThemeStore();
  const authStore = useAuthStore();

  const [searchPostResult, setSearchPostResult] = useState<LensPublication[]>(
    []
  );
  const [keyword, setKeyword] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isfound, setIsfound] = useState<boolean>(true);
  const debouncedValue = useDebounce<string>(keyword, 500);

  const onDebounce = async () => {
    if (keyword.trim().length) {
      // const { data, error, loading } = useSearchProfile(keyword);
      // setSearchPostResult(data?.search?.items);
      try {
        const result = await client.query({
          query: searchProfileQuery,
          variables: {
            query: keyword.trim().toLowerCase(),
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
          setIsSearching(false);
        }
      } finally {
        setIsSearching(false);
      }
    }
  };

  useEffect(() => {
    onDebounce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  async function getSearchResult() {
    setIsSearching(true);
    try {
      const result = await client.query({
        query: searchProfileQuery,
        variables: {
          query: keyword.trim().toLowerCase(),
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
        setIsSearching(false);
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
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: dark_primary,
          }}
        >
          <EvilIcons name="search" size={24} color="white" />
          <TextInput
            selectionColor={theme.PRIMARY}
            placeholder="Search by profile"
            placeholderTextColor={"white"}
            clearButtonMode={"always"}
            onChange={(e) => {
              setKeyword(e.nativeEvent.text);
            }}
            // onSubmitEditing={getSearchResult}
            style={{
              width: "100%",
              marginLeft: 8,
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
            <View
              style={{
                padding: 10,
              }}
            >
              {searchPostResult.map((item, index) => {
                return (
                  <ProfileCard
                    key={index}
                    profileIcon={item?.picture?.original?.url}
                    profileName={item?.name || item?.profileId}
                    handle={item?.handle}
                  />
                );
              })}
            </View>
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
