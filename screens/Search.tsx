import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { dark_primary } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Heading from "../components/UI/Heading";
import recommendedProfiles from "../apollo/Queries/recommendedProfiles";
import ProfileCardSkeleton from "../components/UI/ProfileCardSkeleton";
import Icon from "../components/Icon";
import searchPublicationQuery from "../apollo/Queries/searchPublicationQuery";
import Tabs, { Tab } from "../components/UI/Tabs";

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

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
  const theme = useThemeStore();
  const authStore = useAuthStore();

  const [searchPostResult, setSearchPostResult] = useState<LensPublication[]>(
    []
  );
  const [recommended, setRecommended] = useState<LensPublication[]>([]);
  const [isRecommended, setIsRecommended] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isfound, setIsfound] = useState<boolean>(true);
  const [searchType, SetSearchType] = useState("profile");
  const debouncedValue = useDebounce<string>(keyword, 500);

  const onDebounce = async () => {
    if (keyword.trim().length > 0) {
      try {
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
        console.log(result?.data?.search?.items);

        if (result?.data?.search?.items.length === 0) {
          setIsfound(false);
        } else {
          setIsfound(true);
          setSearchPostResult(result?.data?.search?.items);
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

  console.log(searchType);

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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.94,
              paddingHorizontal: 8,
              backgroundColor: dark_primary,
              borderWidth: 1,
              borderRadius: 50,
              paddingVertical: 4,
            }}
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
              // autoFocus={true}
              style={{
                flex: 1,
                color: "white",
                fontSize: 12,
              }}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="transparent" style="auto" />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic"> */}
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
              style={{
                fontSize: 16,
                color: "white",
                marginVertical: 5,
                marginHorizontal: 15,
                fontWeight: "600",
                alignSelf: "flex-start",
              }}
            ></StyledText>
          </View>
        </>
      )}
      {searchPostResult.length > 0 ? (
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
                  data={searchPostResult}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ProfileCard
                      profileIcon={item?.picture?.original?.url}
                      profileName={item?.name || item?.profileId}
                      profileId={item?.profileId}
                      isFollowed={item?.isFollowedByMe}
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
                // searchPostResult.map((item, index) => {
                //   return (
                //     <View key={index}>
                //       <Heading
                //         title={item.metadata?.name}
                //         style={{
                //           fontSize: 16,
                //           fontWeight: "600",
                //         }}
                //         numberOfLines={1}
                //       />
                //     </View>
                //   );
                // })
                <FlatList
                  style={{
                    backgroundColor: "black",
                    height: "100%",
                  }}
                  data={searchPostResult}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: "black",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderWidth: 2,
                        borderBottomColor: dark_primary,
                      }}
                    >
                      <Heading
                        title={item.metadata?.name}
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "white",
                        }}
                        numberOfLines={1}
                      />
                    </View>
                  )}
                />
              )
            }
          />
        </Tabs>
      ) : (
        <>
          {isRecommended && (
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
              {recommended.length === 0 && (
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
              )}
              {recommended.map((item, index) => {
                return (
                  <ProfileCard
                    key={index}
                    profileIcon={item?.picture?.original?.url}
                    profileName={item?.name || item?.id}
                    profileId={item?.id}
                    isFollowed={item?.isFollowedByMe}
                    handle={item?.handle}
                    owner={item?.ownedBy}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Search;
