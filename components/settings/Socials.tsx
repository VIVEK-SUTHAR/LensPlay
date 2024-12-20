import React from "react";
import {
  LENSPLAY_DISCORD,
  LENSPLAY_SITE,
  LENSPLAY_TWITTER,
} from "constants/index";
import Icon from "components/Icon";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";

type SocialMediaBadgeProps = {
  icon: JSX.Element;
  name: string;
  link: string;
};

const SocialMedia: SocialMediaBadgeProps[] = [
  {
    icon: <Icon name="discord" size={16} color="#7289da" />,
    name: "Discord",
    link: LENSPLAY_DISCORD,
  },
  {
    icon: <Icon name="twitter" size={16} color="#1DA1F2" />,
    name: "Twitter",
    link: LENSPLAY_TWITTER,
  },
  {
    icon: <Icon name="link" size={16} color="#2AD95C" />,
    name: "Website",
    link: LENSPLAY_SITE,
  },
];

function SocialMediaBadge({ icon, name, link }: SocialMediaBadgeProps) {
  return (
    <Pressable
      android_ripple={{
        color: "rgba(255,255,255,0.1)",
        radius: 50,
      }}
      style={styles.badgeContainer}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      {icon}
      <StyledText title={name} style={styles.badgeText} />
    </Pressable>
  );
}

export default function Socials() {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View style={styles.socialMediaContainer}>
        {SocialMedia.map((el, index) => (
          <SocialMediaBadge
            key={index}
            icon={el.icon}
            name={el.name}
            link={el.link}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: dark_primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
  },
});
