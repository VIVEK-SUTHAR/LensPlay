import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import type { RootStackScreenProps } from "customTypes/navigation";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, View } from "react-native";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import generateThumbnail from "utils/generateThumbnails";
import Logger from "utils/logger";
import VideoPlayer from "../../../../packages/VideoPlayer";

export default function UploadVideo({
	navigation,
	route,
}: RootStackScreenProps<"UploadVideo">) {
	const [coverPic, setCoverPic] = useState<string | null>(null);
	const [thumbnails, setThumbnails] = useState<string[]>([]);
	const [selectedCover, setSelectedCover] = useState<number>(0);
	const videoRef = useRef<Video>(null);
	const windowHeight = Dimensions.get("window").height;
	const { setURLs } = useUploadStore();
	const { PRIMARY } = useThemeStore();

	const ThumbnailSkeleton = () => {
		return (
			<View
				style={{
					height: windowHeight / 8,
					width: "48%",
					backgroundColor: "rgba(255,255,255,0.2)",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 8,
					marginTop: 16,
				}}
			></View>
		);
	};

	async function getThumbnails() {
		try {
			const data = await generateThumbnail(
				route.params.localUrl,
				route.params.duration
			);
			if (data) {
				setThumbnails(data);
			}
		} catch (error) {
			navigation.reset({ index: 0, routes: [{ name: "Root" }] });
			return;
		}
	}

	useEffect(() => {
		getThumbnails();
	}, []);

	async function selectCoverImage() {
		let coverresult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			aspect: [2, 1],
			base64: true,
		});
		if (coverresult.canceled) {
			return;
		}
		if (!coverresult.canceled) {
			setCoverPic(coverresult.assets[0].uri);
			setSelectedCover(5);
		}
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<VideoPlayer
				source={{
					uri: route?.params?.localUrl,
				}}
				sliderTheme={{
					minimumTrackTintColor: PRIMARY,
				}}
			/>
			<View
				style={{
					padding: 8,
					marginTop: 16,
				}}
			>
				<Heading
					title={"Select cover image"}
					style={{
						color: "white",
						fontSize: 20,
						fontWeight: "600",
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 8,
					flexWrap: "wrap",
				}}
			>
				{thumbnails?.length > 0 ? (
					thumbnails.map((item, index) => {
						return (
							<Pressable
								style={{
									height: windowHeight / 8,
									width: "48%",
									marginTop: 16,
									position: "relative",
								}}
								onPress={() => {
									setSelectedCover(index);
								}}
							>
								<ThumbnailCard url={item} />
								{selectedCover === index ? (
									<View
										style={{
											position: "absolute",
											height: "100%",
											width: "100%",
											backgroundColor: "rgba(0,0,0,0.4)",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 4,
										}}
									>
										<Icon name="done" />
									</View>
								) : null}
							</Pressable>
						);
					})
				) : (
					<>
						<ThumbnailSkeleton />
						<ThumbnailSkeleton />
						<ThumbnailSkeleton />
						<ThumbnailSkeleton />
						<ThumbnailSkeleton />
					</>
				)}
				<View
					style={{
						height: windowHeight / 8,
						width: "48%",
						marginTop: 16,
					}}
				>
					<Pressable
						style={{
							height: "100%",
							width: "100%",
							backgroundColor: "rgba(255,255,255,0.2)",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 8,
						}}
						onPress={selectCoverImage}
					>
						{coverPic ? (
							<>
								<Image
									source={{
										uri: coverPic,
									}}
									style={{
										height: "100%",
										width: "100%",
										resizeMode: "cover",
										borderRadius: 8,
									}}
								/>
								<>
									{selectedCover === 5 ? (
										<View
											style={{
												position: "absolute",
												height: "100%",
												width: "100%",
												backgroundColor: "rgba(0,0,0,0.4)",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Icon name="done" />
										</View>
									) : null}
								</>
							</>
						) : (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Icon name="edit" />
								<StyledText
									title={"Select cover"}
									style={{
										color: "white",
										fontSize: 14,
										fontWeight: "500",
									}}
								/>
							</View>
						)}
					</Pressable>
				</View>
			</View>
			<View
				style={{
					padding: 8,
					marginVertical: 24,
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<Button
					title={"Next"}
					py={8}
					width={"30%"}
					textStyle={{
						justifyContent: "center",
						alignItems: "center",
						fontSize: 16,
						fontWeight: "600",
					}}
					onPress={() => {
						videoRef.current?.pauseAsync();
						navigation.navigate("AddDetails");
						Logger.Log("eeee", route?.params?.localUrl);
						setURLs(
							route?.params?.localUrl,
							selectedCover === 5 ? coverPic! : thumbnails[selectedCover]
						);
					}}
					bg={"white"}
				/>
			</View>
		</SafeAreaView>
	);
}

const ThumbnailCard = React.memo(({ url }: { url: string }) => {
	return (
		<Image
			source={{
				uri: url,
			}}
			style={{
				height: "100%",
				width: "100%",
				resizeMode: "cover",
				borderRadius: 4,
			}}
		/>
	);
});
