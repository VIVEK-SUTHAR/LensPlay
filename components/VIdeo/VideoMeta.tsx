import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { Feather } from "@expo/vector-icons";
import RBSheet from "../UI/BottomSheet";
import extractURLs from "../../utils/extractURL";

type VideoMetaProps = {
  title: string;
  description: string;
};

const VideoMeta = (props: VideoMetaProps) => {
  const [descOpen, setDescOpen] = useState<boolean>(false);

  const { title, description } = props;

  const descRef = useRef();

  return (
    <>
      <RBSheet
        ref={descRef}
        height={Dimensions.get("window").height / 1.4}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "#1A1A1A",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      >
        <ScrollView
          style={{
            paddingHorizontal: 16,
          }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          <StyledText
            title={"Description"}
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginVertical: 4,
              color: "white",
            }}
          />
          <StyledText
            title={extractURLs(description)}
            style={{
              textAlign: "justify",
              color: "white",
            }}
          />
        </ScrollView>
      </RBSheet>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading
          title={title}
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "white",
            maxWidth: 300,
          }}
        />
      </View>
      <></>
      <View>
        <View style={{ marginTop: 8, flexDirection: "row" }}>
          <StyledText
            title={description}
            style={{ color: "white", fontSize: 14 }}
            numberOfLines={1}
          />
          {description?.length > 0 && (
            <Pressable
              android_ripple={{
                borderless: true,
                color: "darkgray",
              }}
              onPress={(e) => {
                e.preventDefault();
                descRef.current.open();
              }}
            >
              <StyledText
                title={"more"}
                style={{ color: "white", fontSize: 14 }}
              />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default VideoMeta;

const styles = StyleSheet.create({});
