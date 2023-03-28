import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, SafeAreaView, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { client } from "../../apollo/client";
import getBytes from "../../apollo/Queries/getBytes";
import { useGuestStore } from "../../store/GuestStore";
import { useProfile } from "../../store/Store";
import { Root } from "../../types/Lens/Feed";
import Heading from "../UI/Heading";
import SingleByte from "./SingleByte";

const ByteCard = ({ navigation }: { navigation: any }) => {
  const [bytesData, setBytesData] = useState<Root[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userStore = useProfile();
  const { isGuest, profileId } = useGuestStore();

  const handleChangeIndexValue = ({ index }: { index: number }) => {
    setCurrentIndex(index);
  };

  async function getBytesData() {
    try {
      const bytesdata = await client.query({
        query: getBytes,
        variables: {
          id: isGuest ? profileId : userStore.currentProfile?.id,
        },
      });
      setBytesData(bytesdata.data.explorePublications.items);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBytesData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedLottieView
              autoPlay
              style={{
                height: "auto",
              }}
              source={require("../../assets/loader.json")}
            />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Heading
                title="Getting Shots for you"
                style={{
                  fontSize: 16,
                  color: "white",
                  marginVertical: 5,
                  marginHorizontal: 15,
                  fontWeight: "600",
                  alignSelf: "flex-start",
                }}
              />
            </View>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      {bytesData.length > 0 ? (
        <SwiperFlatList
          vertical={true}
          keyExtractor={(item, index) => index.toString()}
          onChangeIndex={handleChangeIndexValue}
          data={bytesData}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: Dimensions.get("window").height,
              }}
            >
              <SingleByte
                item={item}
                index={index}
                currentIndex={currentIndex}
              />
            </View>
          )}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default ByteCard;
