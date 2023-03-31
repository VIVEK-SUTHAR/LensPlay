import React from "react";
import { Linking, Pressable, View } from "react-native";
import Icon, { IconProps } from "../Icon";
import { Maybe } from "../../types/generated";
import { dark_primary } from "../../constants/Colors";

type socialLinksProps = {
  instagram: Maybe<string> | undefined;
  website: Maybe<string> | undefined;
  twitter: Maybe<string> | undefined;
  youtube: Maybe<string> | undefined;
};

type linksData = {
  icon: IconProps["name"];
  link: Maybe<string> | undefined;
  color: string;
};

function getLink(key: string, value: Maybe<string> | undefined) {
  switch (key) {
    case "twitter":
      return value ? `https://twitter.com/${value}` : undefined;
    case "instagram":
      return value ? `https://www.instagram.com/${value}` : undefined;
    case "youtube":
      return value ? `https://www.youtube.com/@${value}` : undefined;
    default:
      undefined;
      break;
  }
}

export default function SocialLinks({
  instagram,
  website,
  twitter,
  youtube,
}: socialLinksProps) {
  const linksData: linksData[] = [
    {
      icon: "twitter",
      link: getLink("twitter", twitter),
      color: "#1DA1F2",
    },
    {
      icon: "instagram",
      link: getLink("instagram", instagram),
      color: "#1DA1F2",
    },
    {
      icon: "youtube",
      link: getLink("youtube", youtube),
      color: "#1DA1F2",
    },
    {
      icon: "link",
      link: website,
      color: "#1DA1F2",
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      {linksData.map((link) =>
        link.link ? (
          <Pressable
            key={link.icon}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: dark_primary,
              padding: 8,
              marginRight: 8,
              borderRadius: 50,
            }}
            onPress={(e) => {
              e.preventDefault();
              if (link?.link) {
                Linking.openURL(link?.link);
              }
            }}
          >
            <Icon name={link.icon} color={link.color} size={16} />
          </Pressable>
        ) : null
      )}
    </View>
  );
}
