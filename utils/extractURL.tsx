import { Linking, Text } from "react-native";
import { URL_REGEX } from "../constants";
import { primary } from "../constants/Colors";
/**
 *
 * @param txt Simple text that may contain URLs
 * @returns Same text with URLs highlighted
 */
function extractURLs(txt: string) {
  const renderText = (txt: string) =>
    txt?.split(" ").map((part, index) =>
      URL_REGEX.test(part) ? (
        <Text
          key={index}
          style={{ color: primary }}
          onPress={() => {
            Linking.openURL(part);
          }}
        >
          {part}{" "}
        </Text>
      ) : (
        part + " "
      )
    );
  return renderText(txt);
}
export default extractURLs;
