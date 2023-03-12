import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../apollo/client";
import AnimatedLottieView from "lottie-react-native";
import { RootStackScreenProps } from "../types/navigation/types";
import { useAuthStore, useThemeStore } from "../store/Store";
import { LensPublication } from "../types/Lens/Feed";
import searchProfileQuery from "../apollo/Queries/searchProfileQuery";
import ProfileCard from "../components/ProfileCard";
import useDebounce from "../hooks/useDebounce";
import StyledText from "../components/UI/StyledText";
import { StatusBar } from "expo-status-bar";
import Heading from "../components/UI/Heading";
import recommendedProfiles from "../apollo/Queries/recommendedProfiles";
import ProfileCardSkeleton from "../components/UI/ProfileCardSkeleton";
import Icon from "../components/Icon";
import searchPublicationQuery from "../apollo/Queries/searchPublicationQuery";
import Tabs, { Tab } from "../components/UI/Tabs";
import { Profile } from "../types/Lens";
import VideoCard from "../components/VideoCard";
import { useGuestStore } from "../store/GuestStore";

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
  const { DARK_PRIMARY } = useThemeStore();
  const authStore = useAuthStore();

  const [searchPostResult, setSearchPostResult] = useState<LensPublication[]>(
    []
  );
  const [searchChannelResult, setSearchChannelResult] = useState<Profile[]>([]);
  const [recommended, setRecommended] = useState<Profile[]>([]);
  const [isRecommended, setIsRecommended] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isfound, setIsfound] = useState<boolean>(true);
  const [searchType, SetSearchType] = useState<"profile" | "videos">("profile");
  const debouncedValue = useDebounce<string>(keyword, 500);
  const { isGuest } = useGuestStore();

  const onDebounce = async () => {
    if (keyword.trim().length > 0) {
      try {
        if (isGuest) {
          const result = await client.query({
            query:
              searchType === "profile"
                ? searchProfileQuery
                : searchPublicationQuery,
            variables: {
              query: keyword.trim().toLowerCase(),
            },
          });
          if (result?.data?.search?.items.length === 0) {
            setIsfound(false);
          } else {
            setIsfound(true);
            if (searchType === "profile") {
              setSearchChannelResult(result?.data?.search?.items);
            } else {
              setSearchPostResult(result?.data?.search?.items);
            }
          }
        } else {
          const result = await client.query({
            query:
              searchType === "profile"
                ? searchProfileQuery
                : searchPublicationQuery,
            variables: {
              query: keyword.trim().toLowerCase(),
            },
            context: {
              headers: {
                "x-access-token": `Bearer ${authStore.accessToken}`,
              },
            },
          });
          if (result?.data?.search?.items.length === 0) {
            setIsfound(false);
          } else {
            setIsfound(true);
            if (searchType === "profile") {
              setSearchChannelResult(result?.data?.search?.items);
            } else {
              setSearchPostResult(result?.data?.search?.items);
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setIsSearching(false);
        }
      } finally {
        setIsSearching(false);
      }
    }
  };

  useEffect(() => {
    onDebounce();
  }, [debouncedValue, searchType]);

  const getRecommendedProfiles = async () => {
    if (!isSearching) {
      try {
        const data = await client.query({
          query: recommendedProfiles,
          variables: {},
          context: {
            headers: {
              "x-access-token": `Bearer ${authStore.accessToken}`,
            },
          },
        });
        setRecommended(data.data.recommendedProfiles);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    getRecommendedProfiles();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "black" },
      headerTitle: "",
      headerTintColor: "white",
      headerTransparent: false,
      headerLeft: () => {
        return (
          <View
            style={[styles.headerContainer, { backgroundColor: DARK_PRIMARY }]}
          >
            <Pressable
              onPress={(e) => {
                e.preventDefault();
                navigation.goBack();
              }}
              style={{ marginRight: 8 }}
            >
              <Icon name="arrowLeft" size={20} />
            </Pressable>
            <TextInput
              placeholder="Search by channel"
              placeholderTextColor={"white"}
              selectionColor={"white"}
              onChange={(e) => {
                setIsRecommended(false);
                setKeyword(e.nativeEvent.text);
                onDebounce();
              }}
              style={styles.textInput}
              onBlur={() => {
                setIsRecommended(false);
              }}
            />
          </View>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="auto" />
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
            <StyledText
              title="Getting videos..."
              style={styles.searchingLoader}
            />
          </View>
        </>
      )}
      {searchPostResult?.length > 0 || searchChannelResult?.length > 0 ? (
        <Tabs>
          <Tab.Screen
            name="Profile"
            listeners={{
              focus: () => {
                SetSearchType("profile");
              },
            }}
            children={() =>
              !isfound ? (
                <NotFound />
              ) : (
                <FlatList
                  style={{
                    backgroundColor: "black",
                    height: "100%",
                  }}
                  data={searchChannelResult}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ProfileCard
                      profileIcon={item?.picture?.original?.url}
                      profileName={item?.name || item?.id}
                      profileId={item?.id}
                      isFollowed={item?.isFollowedByMe || false}
                      handle={item?.handle}
                      owner={item?.ownedBy}
                    />
                  )}
                />
              )
            }
          />
          <Tab.Screen
            name="Videos"
            listeners={{
              focus: () => {
                SetSearchType("videos");
              },
            }}
            children={() =>
              !isfound ? (
                <NotFound />
              ) : (
                <FlatList
                  style={{
                    backgroundColor: "black",
                    height: "100%",
                  }}
                  data={searchPostResult}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        backgroundColor: "black",
                        // paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                    >
                      {/* <Heading
                        title={item?.metadata?.name}
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "white",
                        }}
                        numberOfLines={1}
                      /> */}
                      <VideoCard publication={item} id={index.toString()} />
                    </View>
                  )}
                />
              )
            }
          />
        </Tabs>
      ) : (
        <>
          {isRecommended && !isGuest && (
            <View style={{ marginVertical: 10 }}>
              <Heading
                title={"Recommended Channels"}
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "600",
                  marginHorizontal: 20,
                }}
              />
              {recommended.length === 0 && searchType === "videos" ? (
                <Loader />
              ) : (
                <FlatList
                  data={recommended}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <ProfileCard
                        profileIcon={item?.picture?.original?.url}
                        profileName={item?.name || item?.id}
                        profileId={item?.id}
                        isFollowed={item?.isFollowedByMe || false}
                        handle={item?.handle}
                        owner={item?.ownedBy}
                      />
                    );
                  }}
                />
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;

function Loader() {
  return (
    <>
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
    </>
  );
}
function NotFound() {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
      }}
    >
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
        <StyledText
          title="No data found"
          style={{
            fontSize: 16,
            color: "white",
            marginVertical: 4,
            marginHorizontal: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.94,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 4,
  },
  searchingLoader: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
    marginHorizontal: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  textInput: {
    flex: 1,
    color: "white",
    fontSize: 12,
  },
});
