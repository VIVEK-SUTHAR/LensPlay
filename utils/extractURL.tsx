import React from "react";
import { Linking, Text } from "react-native";
import { MENTION_REGEX, URL_REGEX } from "../constants";
import { primary } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../components/UI/StyledText";

/**
 *
 * @param txt Simple text that may contain URLs
 * @returns Same text with URLs highlighted
 */

function extractURLs(txt: string | undefined) {
  const navigation = useNavigation();
  const renderText = (txt: string | undefined) =>
    txt?.split(" ").map((part, index) =>
      URL_REGEX.test(part) ? (
        <StyledText
          title={part+" "}
          key={index}
          style={{ color: primary, textDecorationLine: "underline" }}
          onPress={() => {
            Linking.openURL(part);
          }}
        />
      ) : (
        <>{checkIsLens(part)} </>
      )
    );
  const checkIsLens = (string: string) => {
    if (MENTION_REGEX.test(string)) {
      return (
        <StyledText
          title={string}
          key={string}
          style={{ color: primary }}
          onPress={() => {
            // navigation.navigate("Channel");
          }}
        >
          {string}
        </StyledText>
      );
    } else return string;
  };
  return renderText(txt);
}
export default extractURLs;
