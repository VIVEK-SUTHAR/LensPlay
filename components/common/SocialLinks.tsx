import Instagram from "assets/Icons/Instagram";
import Link from "assets/Icons/Link";
import Twitter from "assets/Icons/Twitter";
import Youtube from "assets/Icons/Youtube";
import { dark_primary } from "constants/Colors";
import { Maybe, Profile } from "customTypes/generated";
import React, { ReactElement, useEffect, useState } from "react";
import { Linking, Pressable, View } from "react-native";

type socialLinksProps = {
	instagram: Maybe<string> | undefined;
	website: Maybe<string> | undefined;
	twitter: Maybe<string> | undefined;
	youtube: Maybe<string> | undefined;
};

type linksData = {
	icon: ReactElement;
	link: Maybe<string> | undefined;
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
		const twitter = profile?.attributes?.find(
			(item) => item.key || item.traitType === "twitter"
		)?.value;
		const youtube = profile?.attributes?.find((item) => item.key === "youtube")?.value;
		const insta = profile?.attributes?.find((item) => item.key === "instagram")?.value;
		const website = profile?.attributes?.find((item) => item.key === "website")?.value;
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
			icon: <Twitter height={16} width={16} color={"#1DA1F2"} />,
			link: getLink("twitter", links.twitter),
		},
		{
			icon: <Instagram height={16} width={16} color={"#1DA1F2"} />,
			link: getLink("instagram", links.instagram),
		},
		{
			icon: <Youtube height={16} width={16} color={"#1DA1F2"} />,
			link: getLink("youtube", links.youtube),
		},
		{
			icon: <Link height={16} width={16} color={"#1DA1F2"} />,
			link: links.website,
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
						{link.icon}
					</Pressable>
				) : null
			)}
		</View>
	);
}
const SocialLinks = React.memo(_SocialLinks);
export default SocialLinks;
