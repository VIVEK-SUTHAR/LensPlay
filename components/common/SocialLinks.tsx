import Icon, { IconProps } from "components/Icon";
import { dark_primary } from "constants/Colors";
import { Maybe, Profile } from "customTypes/generated";
import React, { useEffect, useState } from "react";
import { Linking, Pressable, View } from "react-native";

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
			if (value?.startsWith("@")) {
				return value ? `https://twitter.com/${value.slice(1)}` : undefined;
			}
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
function _SocialLinks({ profile }: { profile: Profile }) {
	const [links, setLinks] = useState<socialLinksProps>({
		twitter: "",
		instagram: "",
		youtube: "",
		website: "",
	});
	const getLinks = React.useCallback(() => {
		console.log(profile.metadata);
		
		const attributes = profile.metadata?.attributes;
		if (!attributes) return;
		const twitter = attributes.find((item) => item.key==="twitter")?.value;
		const youtube = attributes.find((item) => item.key === "youtube")?.value;
		const insta = attributes.find((item) => item.key === "instagram")?.value;
		const website = attributes.find((item) => item.key === "website")?.value;
		setLinks({
			instagram: insta,
			website: website,
			twitter: twitter,
			youtube: youtube,
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
const SocialLinks = React.memo(_SocialLinks);
export default SocialLinks;
