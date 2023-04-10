import React from "react";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { View } from "react-native";
import Sheet from "../Bottom";
import { SheetProps } from "../common/MyVideoCard";
import { useHidePublicationMutation } from "../../types/generated";
import TrackAction from "../../utils/Track";
import { SETTINGS } from "../../constants/tracking";
import { useAuthStore, useToast } from "../../store/Store";

export default function DeleteVideo({ sheetRef, pubId }: SheetProps) {
  const toast = useToast();
  const { accessToken } = useAuthStore();

  const [deleteVideo, { data, error, loading }] = useHidePublicationMutation({
    onCompleted: (data) => {
      console.log(data);

      toast.success("video deleted successfully");
      TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
    },
    onError: () => {
      toast.error("some error occured please try again");
    },
  });

  return (
    <Sheet
      ref={sheetRef}
      snapPoints={["50%"]}
      enablePanDownToClose={true}
      enableOverDrag={true}
      bottomInset={32}
      style={{
        marginHorizontal: 8,
      }}
      detached={true}
      children={
        <View
          style={{
            justifyContent: "space-between",
            padding: 16,
            height: "100%",
          }}
        >
          <View>
            <Heading
              title="Are you sure you want to delete this video?"
              style={{
                color: "white",
                fontSize: 20,
                marginVertical: 4,
                textAlign: "left",
                fontWeight: "600",
              }}
            />
            <StyledText
              title="By doing this, you are not able to get this video back."
              style={{
                color: "gray",
                fontSize: 14,
                marginVertical: 4,
                fontWeight: "500",
              }}
            />
          </View>
          <View>
            <Button
              onPress={() => {
                sheetRef.current?.close();
              }}
              title="Cancel"
              bg={"rgba(255,255,255,0.1)"}
              textStyle={{
                fontWeight: "600",
                fontSize: 16,
                color: "white",
              }}
              py={12}
              borderRadius={8}
            />
            <Button
              onPress={() => {
                deleteVideo({
                  variables: {
                    request: {
                      publicationId: pubId,
                    },
                  },
                  context: {
                    headers: {
                      "x-access-token": `Bearer ${accessToken}`,
                    },
                  },
                });
              }}
              mt={16}
              title="Delete"
              bg={"#f5f5f5"}
              textStyle={{
                fontWeight: "600",
                fontSize: 16,
                color: "black",
              }}
              py={12}
              borderRadius={8}
            />
          </View>
        </View>
      }
    />
  );
}
