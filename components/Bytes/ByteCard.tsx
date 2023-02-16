import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { client } from "../../apollo/client";
import getBytes from "../../apollo/Queries/getBytes";
import { useAuthStore, useProfile } from "../../store/Store";
import { Root } from "../../types/Lens/Feed";
import SingleByte from "./SingleByte";

const ByteCard = () => {
  const [bytesData, setBytesData] = useState<Root[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userStore = useProfile();
  const authStore = useAuthStore();

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  async function getBytesData() {
    try {
      const bytesdata = await client.query({
        query: getBytes,
        variables: {
          id: userStore.currentProfile?.id,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
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
    <SafeAreaView>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Loading....</Text>
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
            <SingleByte item={item} index={index} currentIndex={currentIndex} />
          )}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default ByteCard;