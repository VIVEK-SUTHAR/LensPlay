import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { RootStackScreenProps } from "customTypes/navigation";
import { PublicationMainFocus, PublicationMetadataDisplayTypes } from "customTypes/generated";
import { v4 as uuidV4 } from "uuid";
import LPImage from "components/UI/LPImage";
import { black, white } from "constants/Colors";
import ProfileCard from "components/ProfileCard";
import { useProfile } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import StyledText from "components/UI/StyledText";
import Button from "components/UI/Button";
import Icon from "components/Icon";
import extractURLs from "utils/extractURL";
import { APP_ID } from "constants/index";

const PostContent = `I just checked out my follower's growth 📊 on @lensplayxyz.lens ,
  
  You can check yours on @lensplay.xyz
  
  Go , Check and Share yours 🚀

  cc:@lensplayxyz.lens`;

const ShareOnLens = ({ route, navigation }: RootStackScreenProps<"ShareOnLens">) => {
	const { currentProfile } = useProfile();

	const metadata = {
		version: "2.0.0",
		metadata_id: uuidV4(),
		description: PostContent,
		content: PostContent,
		locale: "en-US",
		mainContentFocus: PublicationMainFocus.Image,
		name: `Post By @${currentProfile?.handle}`,
		attributes: [
			{
				traitType: "handle",
				value: currentProfile?.handle,
				displayType: PublicationMetadataDisplayTypes.String,
			},
		],
		appId: APP_ID,
		media: [
			{
				item: "",
				type: "",
			},
		],
		image: "",
		imageMimeType: "",
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black", alignItems: "center" }}>
			<View
				style={{
					padding: 8,
					borderWidth: 1,
					borderColor: white[200],
					width: "95%",
					borderRadius: 8,
				}}
			>
				<View>
					<ProfileCard
						handle={currentProfile?.handle}
						profileIcon={getIPFSLink(getRawurl(currentProfile?.picture))}
						owner={currentProfile?.ownedBy}
						profileId={currentProfile?.id}
						profileName={currentProfile?.name || ""}
						isFollowed={true}
					/>
					<StyledText
						title={extractURLs(PostContent)}
						style={{
							fontSize: 14,
							textAlign: "left",
							color: white[300],
						}}
					/>
				</View>
				<Image
					source={{
						uri: route.params.imageUri,
					}}
					style={{
						height: 260,
						width: "100%",
						borderRadius: 10,
						resizeMode: "contain",
					}}
				/>
			</View>
			<View style={{ marginVertical: 12, width: "95%" }}>
				<Button
					title={"Post "}
					textStyle={{ fontSize: 18, fontWeight: "600", color: black[500] }}
					bg={white[600]}
					borderColor={white[400]}
					icon={<Icon name="share" size={24} color={black[500]} />}
					py={8}
					iconPosition="right"
					onPress={() => {}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ShareOnLens;
