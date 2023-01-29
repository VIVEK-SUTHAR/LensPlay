import {
	View,
	Share,
	ScrollView,
	SafeAreaView,
	ToastAndroid,
	BackHandler,
	TextInput,
    Text,
    Linking
} from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
	useAuthStore,
	useProfile,
	useReactionStore,
	useThemeStore,
	useToast,
} from "../store/Store";
import { useState } from "react";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import formatInteraction from "../utils/formatInteraction";
import { ToastType } from "../types/Store";
import fetchPublicationById from "../apollo/Queries/fetchPublicationById";


const LinkingVideo = ({ navigation, route }: RootStackScreenProps<"LinkingVideos">) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
	const [descOpen, setDescOpen] = useState<boolean>(false);
	const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
	const [isMute, setIsMute] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videoData, setVideoData] = useState({});

	const theme = useThemeStore();
	const authStore = useAuthStore();
	const userStore = useProfile();
	const toast = useToast();



	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) navigation.goBack();
		return true;
	}

	useEffect(() => {
        let publicationId = "";
        Linking.addEventListener("url", (event) => {
      const id = event.url.split("=")[1];
      publicationId = id;
      getVideoById(publicationId);
      return;
    });
    Linking.getInitialURL().then((res) => {
        const id = res?.split("=")[1];
        publicationId = id ? id : "";
        getVideoById(publicationId);
        return;
      });
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
	}, []);

    const getVideoById = async (pubId) => {
        setIsLoading(true);
        try {
          const feed = await client.query({
            query: fetchPublicationById,
            variables: {
                pubId: pubId,
            },
            context: {
                headers: {
                    "x-access-token": authStore.accessToken
                      ? `Bearer ${authStore.accessToken}`
                      : "",
                  },
            },
          });
          setVideoData(feed.data.publication);
          return feed;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("Something went wrong", { cause: error });
          }
        } finally {
          setIsLoading(false);
        }
    }
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: `Let's watch ${route.params.title} by ${route.params.uploadedBy} on LensPlay,
        
        `,
			});
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};
    if (isLoading) {
        return (
          <Text>Loading</Text>
        );
      } 

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor={"black"} translucent={true} />
			<Player
				poster={videoData?.metadata?.cover}
				title={videoData?.metadata?.name}
				url={videoData?.metadata?.media?.original?.url}
				inFullscreen={inFullscreen}
				isMute={isMute}
				setInFullscreen={setInFullsreen}
				setIsMute={setIsMute}
			/>
			<Drawer isOpen={ismodalopen} setIsOpen={setIsmodalopen}>
				<View
					style={{
						width: "100%",
						height: "100%",
						opacity: 1,
						alignItems: "center",
					}}
				>
					<View style={{ maxWidth: "90%" }}>
                    <Player
				poster={videoData?.metadata?.cover}
				title={videoData?.metadata?.name}
				url={videoData?.metadata?.media?.original?.url}
				inFullscreen={inFullscreen}
				isMute={isMute}
				setInFullscreen={setInFullsreen}
				setIsMute={setIsMute}
			/>
					</View>
					<Heading
						title={`${videoData?.metadata?.name} by ${videoData?.profile?.name}`}
						style={{
							textAlign: "center",
							fontSize: 16,
							color: "white",
							fontWeight: "600",
							marginVertical: 12,
						}}
					/>
					<Button
						title="Collect for free"
						width={"90%"}
						py={8}
						my={4}
						textStyle={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}
						onPress={() => {
							setIsmodalopen(false);
							toast.show("Collect Submitted", ToastType.SUCCESS, true);
						}}
					/>
				</View>
			</Drawer>
			<ScrollView>
				<View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Heading
							title={videoData?.metadata?.name}
							style={{
								fontSize: 16,
								fontWeight: "700",
								color: "white",
							}}
						/>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Feather
								name={`chevron-${descOpen ? "up" : "down"}`}
								size={28}
								color="white"
								onPress={() => setDescOpen(!descOpen)}
							/>
						</View>
					</View>
					<View>
						{descOpen ? (
							<View style={{ marginTop: 8 }}>
								<SubHeading
									title={videoData?.metadata?.description}
									style={{ color: "white", fontSize: 14 }}
								/>
							</View>
						) : (
							<></>
						)}
					</View>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							paddingVertical: 4,
							justifyContent: "space-between",
							marginTop: 8,
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Avatar src={videoData?.profile?.picture?.original?.url} width={40} height={40} />
							<View style={{ marginHorizontal: 8 }}>
								<Heading
									title={videoData?.profile?.name}
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "500",
									}}
								/>
								<SubHeading
									title={`@${videoData?.profile?.handle}`}
									style={{
										color: "gray",
										fontSize: 12,
										fontWeight: "500",
									}}
								/>
							</View>
						</View>
						<Button
							title={"Subscribe"}
							width={"auto"}
							px={16}
							py={8}
							type={"filled"}
							bg={theme.PRIMARY}
							textStyle={{
								fontSize: 16,
								fontWeight: "700",
								marginHorizontal: 4,
								color: "black",
							}}
							onPress={async () => {
							}}
						/>
					</View>
					<ScrollView
						style={{
							paddingVertical: 24,
						}}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Button
							title={videoData?.stats?.totalUpvotes}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: "white",
								marginLeft: 4,
							}}
							borderColor={"white"}
							onPress={()=>{'Like not allowed'}}
							icon={
								<AntDesign
									name={"like1"}
									size={16}
									color={"white"}
								/>
							}
						/>
						<Button
							title=""
							onPress={()=>console.log('cant dislike')}
							mx={4}
							px={16}
							width={"auto"}
							type={"outline"}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: "white",
							}}
							borderColor={"white"}
							icon={
								<AntDesign
									name={ "dislike1" }
									size={16}
									color={"white"}
								/>
							}
						/>
						<Button
							title={`${videoData?.stats?.totalAmountOfCollects} Collects`}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<Entypo name="folder-video" size={18} color={"white"} />}
							onPress={() => {
								setIsmodalopen(true);
							}}
							textStyle={{ color: "white", marginHorizontal: 4 }}
						/>
						<Button
							title={"Share"}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<FontAwesome name="share" size={16} color="white" />}
							onPress={onShare}
							textStyle={{ color: "white", marginHorizontal: 4 }}
						/>
						<Button
							title={"Report"}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<MaterialIcons name="report" size={16} color="white" />}
							textStyle={{ color: "white", marginHorizontal: 4 }}
							onPress={() => {
								toast.show("Thanks for reporting", ToastType.INFO, true);
							}}
						/>
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LinkingVideo;
