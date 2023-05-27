import React, { useEffect, useState } from "react";
import { Linking, Pressable, View } from "react-native";
import { dark_primary } from "../../constants/Colors";

import { type Maybe, type Profile } from "../../types/generated";
import Icon, { type IconProps } from "../Icon";

interface socialLinksProps {
  instagram: Maybe<string> | undefined;
  website: Maybe<string> | undefined;
  twitter: Maybe<string> | undefined;
  youtube: Maybe<string> | undefined;
}

interface linksData {
  icon: IconProps["name"];
  link: Maybe<string> | undefined;
  color: string;
}

interface socialProps{
  profile: Profile
}

function getLink(key: string, value: Maybe<string> | undefined): string | undefined {
	switch (key) {
	case "twitter":
		if ((value?.startsWith("@")) === true) {
			return (value.length > 0) ? `https://twitter.com/${value.slice(1)}` : undefined;
		}
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return (value?.length !== 0 ) ? `https://twitter.com/${value}` : undefined;

	case "instagram":
		return (value != null) ? `https://www.instagram.com/${value}` : undefined;
	case "youtube":
		return (value != null) ? `https://www.youtube.com/@${value}` : undefined;
	default:
		return undefined;
	}
}

const _SocialLinks:React.FC<socialProps > = ({ profile }) => {
	const [links, setLinks] = useState<socialLinksProps>({
		twitter: "",
		instagram: "",
		youtube: "",
		website: "",
	});
	const getLinks = React.useCallback(() => {
		const twitter = profile?.attributes?.find(
			(item) => (item.key.length > 0) || item.traitType === "twitter"
		)?.value;
		const youtube = profile?.attributes?.find((item) => item.key === "youtube")
			?.value;
		const insta = profile?.attributes?.find((item) => item.key === "instagram")
			?.value;
		const website = profile?.attributes?.find((item) => item.key === "website")
			?.value;
		setLinks({
			instagram: insta,
			website,
			twitter,
			youtube,
		});
	}, []);

	useEffect(() => {
		getLinks();
	}, []);

	const linksData: linksData[] = [
		{
			icon: "twitter",
			link: getLink("twitter", links.twitter),
			color: "#1DA1F2",
		},
		{
			icon: "instagram",
			link: getLink("instagram", links.instagram),
			color: "#1DA1F2",
		},
		{
			icon: "youtube",
			link: getLink("youtube", links.youtube),
			color: "#1DA1F2",
		},
		{
			icon: "link",
			link: links.website,
			color: "#1DA1F2",
		},
	];
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginTop: 16,
			}}
		>
			{linksData.map((link) =>
				(link.link != null) ? (
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
							if ((link?.link) != null) {
								void Linking.openURL(link?.link);
							}
						}}
					>
						<Icon name={link.icon} color={link.color} size={16} />
					</Pressable>
				) : null
			)}
		</View>
	);
};
const SocialLinks = React.memo(_SocialLinks);
export default SocialLinks;
