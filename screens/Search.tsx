import {
  Dimensions,
  Platform,
  Pressable,
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
import StyledText from "../components/UI/StyledText";
import { dark_primary } from "../constants/Colors";
import BackIcon from "../components/svg/BackIcon";
import { StatusBar } from "expo-status-bar";

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
              backgroundColor: dark_primary,
              borderWidth: 1,
              borderRadius: 50,
              paddingVertical:6
            }}
          >
            <Pressable
              onPress={(e) => {
                e.preventDefault();
                navigation.goBack();
              }}
              style={{ marginRight: 8 }}
            >
              <BackIcon height={24} width={24} />
            </Pressable>
            <TextInput
              placeholder="Search by channel"
              placeholderTextColor={"white"}
              selectionColor={"white"}
              onChange={(e) => {
                setKeyword(e.nativeEvent.text);
                onDebounce();
              }}
              autoFocus={true}
              style={{
                flex: 1,
                color: "white",
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
            />
          </View>
        );
      },
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="black"/>
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
                  <StyledText
                    title=" No profile found 😔"
                    style={{
                      fontSize: 18,
                      color: "white",
                      marginVertical: 5,
                      marginHorizontal: 15,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  />
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
