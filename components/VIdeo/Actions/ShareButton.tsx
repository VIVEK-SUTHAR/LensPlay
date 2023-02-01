import { View, Text, Share } from "react-native";
import React from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import ShareIcon from "../../svg/ShareIcon";

type ShareButtonProps = {
	title: string;
	id: string;
};

const ShareButton = ({ title, id }: ShareButtonProps) => {
	const shareVideo = async () => {
		try {
			const result = await Share.share({
				message: `Let's watch ${title} on LensPlay,here's link https://lensplay.xyz/watch/${id}`,
			});
			if (result.action) {
			}
		} catch (error) {
			if (error instanceof Error) {
			}
		}
	};

	return (
		<Button
			title={"Share"}
			mx={4}
			px={10}
			width={"auto"}
			bg={dark_primary}
			type={"filled"}
			borderRadius={8}
			icon={<ShareIcon height={20} width={20} />}
			onPress={shareVideo}
			textStyle={{ color: "white", marginHorizontal: 4 }}
		/>
	);
};

export default ShareButton;
