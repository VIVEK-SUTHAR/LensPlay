import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { freeCollectPublication } from "../../api";
import { SHOT } from "../../constants/tracking";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import TrackAction from "../../utils/Track";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import Sheet from "../Bottom";
import { ShotsPublication } from "../Bytes/ByteCard";
import Icon from "../Icon";
import Button from "../UI/Button";
import { LikeButton } from "../VIdeo";

function ShotReaction({ item }: { item: ShotsPublication }) {
  const [totalCollects, setTotalCollects] = useState<number>(
    item?.stats?.totalAmountOfCollects
  );
  const [collected, setCollected] = useState<boolean>(item?.hasCollectedByMe);
  const collectSheetRef = useRef<BottomSheetMethods>(null);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const { PRIMARY } = useThemeStore();
  const { accessToken } = useAuthStore();
  const toast = useToast();
  const { isGuest } = useGuestStore();

  const collectPublication = React.useCallback(async () => {
    try {
      if (isGuest) {
        toast.show("Please Login", ToastType.ERROR, true);
        return;
      }
      const data = await freeCollectPublication(item?.id, accessToken);
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
        setCollected(true);
        setTotalCollects((prev) => prev + 1);
        TrackAction(SHOT.SHOTS_COLLECT);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
      }
    } finally {
      collectSheetRef?.current?.close();
    }
  }, []);

  const shareVideo = React.useCallback(async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${item?.metadata?.name} on LensPlay,here's link,https://lensplay.xyz/watch/${item.id}`,
      });
    } catch (error) {
      // console.log(error);
    }
  }, []);

  const handleSheet = React.useCallback(() => {
    console.log("here here");
    collectSheetRef?.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <View
        style={{
          position: "absolute",
          bottom: bottomTabBarHeight,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LikeButton
          like={item?.stats?.totalUpvotes}
          id={item?.id}
          isalreadyLiked={item?.reaction === "UPVOTE"}
          bytes={true}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("ShotsComment", {
              publicationId: item?.id,
            });
          }}
        >
          <Icon name="comment" size={32} />
          <Text style={{ color: "white" }}>
            {item?.stats?.totalAmountOfComments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={(e) => {
            collected
              ? toast.show(
                  "You have already collected this shot",
                  ToastType.ERROR,
                  true
                )
              : handleSheet();
          }}
        >
          <Icon
            name="collect"
            color={collected ? PRIMARY : "white"}
            size={28}
          />
          <Text style={{ color: collected ? PRIMARY : "white" }}>
            {totalCollects}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
          }}
          onPress={shareVideo}
        >
          <Icon name="share" size={28} />
        </TouchableOpacity>
      </View>
      <Sheet
        ref={collectSheetRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View style={{ paddingHorizontal: 8 }}>
            <ScrollView
              style={{
                padding: 8,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  height: Dimensions.get("screen").height / 3,
                }}
              >
                <Image
                  source={{
                    uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
                  }}
                  style={{
                    height: 180,
                    borderRadius: 8,
                    resizeMode: "cover",
                  }}
                  progressiveRenderingEnabled={true}
                />
                <Button
                  title={`Collect the Shot for free`}
                  // width={"90%"}
                  mx={12}
                  py={12}
                  textStyle={{
                    fontSize: 20,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                  onPress={collectPublication}
                />
              </View>
            </ScrollView>
          </View>
        }
      />
    </>
  );
}

export default React.memo(ShotReaction);