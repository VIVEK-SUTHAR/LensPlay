import {
  Dimensions,
  Platform,
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
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { useAuthStore, useThemeStore } from "../store/Store";
import { LensPublication } from "../types/Lens/Feed";
import searchProfileQuery from "../apollo/Queries/searchProfileQuery";
import ProfileCard from "../components/ProfileCard";
import useDebounce from "../hooks/useDebounce";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";

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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "black" },
      headerTitle: "",
      headerTintColor: "white",
      headerTransparent: false,
      headerLeft: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.94,
              paddingHorizontal: 8,
            }}
          >
            <MaterialIcons
              name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
              color={"white"}
              size={24}
              onPress={(e) => {
                e.preventDefault();
                navigation.goBack();
              }}
              style={{
                marginHorizontal: 2,
              }}
            />
            <TextInput
              placeholder="Enter profile name..."
              placeholderTextColor={"white"}
              selectionColor={"white"}
              onChange={(e) => {
                setKeyword(e.nativeEvent.text);
                onDebounce();
              }}
              autoFocus={true}
              style={{
                backgroundColor: "#232323",
                flex: 1,
                color: "white",
                borderColor: "white",
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 2,
                borderRadius: 50,
              }}
            />
          </View>
        );
      },
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
                    profileId={item?.profileId}
                    isFollowed={item?.isFollowedByMe}
                    handle={item?.handle}
                    owner={item?.ownedBy}
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
