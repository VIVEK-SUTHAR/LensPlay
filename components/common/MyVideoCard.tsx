import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import { black } from "../../constants/Colors";
import {
  useActivePublication,
  useAuthStore,
  useProfile,
  useToast,
} from "../../store/Store";
import {
  Mirror,
  Post,
  Profile,
  PublicationMetadataDisplayTypes,
  Scalars,
  useCreateSetProfileMetadataViaDispatcherMutation,
} from "../../types/generated";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";

type MyVideoCardProps = {
  publication: Mirror | Post;
  id: string;
  sheetRef?: React.RefObject<BottomSheetMethods>;
  setPubId?: (pubId: Scalars["InternalPublicationId"]) => void;
};

export default function MyVideoCard({
  publication,
  id,
  sheetRef,
  setPubId,
}: MyVideoCardProps) {
  const navigation = useNavigation();
  const { setActivePublication } = useActivePublication();

  return (
    <Pressable
      key={id}
      android_ripple={{
        color: black[400],
      }}
      style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        padding: 16,
      }}
      onPress={() => {
        setActivePublication(publication);
        navigation.navigate("VideoPage");
      }}
    >
      <View>
        <Image
          source={{
            uri: getIPFSLink(getRawurl(publication?.metadata?.cover)),
          }}
          style={{
            width: 160,
            height: 100,
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          height: "100%",
          width: "50%",
          marginLeft: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Heading
            title={publication?.metadata?.name}
            style={{ color: "white", fontSize: 16, fontWeight: "500" }}
            numberOfLines={3}
          />
          <View
            style={{
              marginTop: 4,
            }}
          >
            <StyledText
              title={publication?.metadata?.content || publication?.metadata?.description}
              numberOfLines={1}
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
          <View
            style={{
              marginTop: 2,
            }}
          >
            <StyledText
              title={getDifference(publication?.createdAt)}
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (setPubId) {
              setPubId(publication.id);
            }
            sheetRef?.current?.snapToIndex(0);
          }}
        >
          <Icon name="more" size={16} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

type SheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods>;
  pubId: Scalars["InternalPublicationId"];
};

export const VideoActionSheet = ({ sheetRef, pubId }: SheetProps) => {
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();

  const uploadMetadata = async (newProfile: Profile) => {
    const bodyContent = JSON.stringify({
      oldProfileData: currentProfile,
      newProfileData: newProfile,
    });

    const headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer ENGINEERCANTAKEOVERWORLD",
    };

    const response = await fetch(
      "https://lensplay-api.vercel.app/api/upload/profileMetadata",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    const metadata = await response.json();

    console.log(metadata?.id);

    // useCreateSetProfileMetadataViaDispatcherMutation({
    //   variables: {
    //     request: {
    //       metadata: `https://arweave.net/${metadata.id}`,
    //       profileId: currentProfile?.id,
    //     },
    //   },
    //   context: {
    //     headers: {
    //       "x-access-token": `Bearer ${accessToken}`,
    //     },
    //   },
    // });
  };

  const pinPublication = async () => {
    // toast.success("Implementation baki hai");
    const newProfile = currentProfile;

    const isAlreadyPinned = newProfile?.attributes?.find(
      (attr) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    console.log(isAlreadyPinned);

    if (!isAlreadyPinned) {
      const newAttribute = {
        displayType: PublicationMetadataDisplayTypes.String,
        traitType: "pinnedPublicationId",
        key: "pinnedPublicationId",
        value: pubId,
      };
      newProfile?.attributes?.push(newAttribute);
      return;
    }
    isAlreadyPinned.value = pubId;

    console.log(newProfile?.metadata);
    // uploadMetadata(newProfile as Profile);
  };

  const actionList = [
    {
      name: "Pin this video to your channel",
      icon: "success",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {
        pinPublication();
      },
    },
    {
      name: "Share this video",
      icon: "share",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {
        Share.share({
          message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
          title: "Watch video on LensPlay",
        });
      },
    },
    {
      name: "Delete",
      icon: "delete",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {},
    },
  ];
  return (
    <Sheet
      ref={sheetRef}
      snapPoints={["34%"]}
      enablePanDownToClose={true}
      enableOverDrag={true}
      bottomInset={32}
      style={{
        marginHorizontal: 8,
      }}
      detached={true}
      children={
        <FlatList
          data={actionList}
          renderItem={({ item }) => {
            return (
              <Ripple
                onTap={() => {
                  item.onPress(pubId);
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "auto",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon name={item.icon} color={"white"} />
                  <StyledText
                    title={item.name}
                    style={{
                      fontSize: 16,
                      marginHorizontal: 8,
                      color: "white",
                    }}
                  />
                </View>
              </Ripple>
            );
          }}
        />
      }
    />
  );
};
