import React from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import { white } from "constants/Colors";
import Pin from "assets/Icons/Pin";

const ProfileSkeleton = () => {
	return (
		<ScrollView
			style={{
				backgroundColor: "#111111",
				height: Dimensions.get("screen").height,
			}}
			showsVerticalScrollIndicator={false}
		>
			<View
				style={{
					height: 180,
					alignItems: "flex-start",
					marginBottom: 30,
					backgroundColor: "rgba(255,255,255,0.1)",
				}}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					marginTop: "-20%",
					marginLeft: 8,
				}}
			>
				<View
					style={{
						height: 90,
						width: 90,
						borderRadius: 50,
						backgroundColor: "#1d1d1d",
					}}
				/>
				<View
					style={{
						position: "relative",
						height: 36,
						width: 108,
						marginTop: 56,
						marginRight: 16,
						borderRadius: 50,
						backgroundColor: "#1d1d1d",
					}}
				/>
			</View>
			<View
				style={{
					justifyContent: "space-between",
					marginLeft: 12,
				}}
			>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						marginVertical: 10,
						width: 80,
						height: 16,
						backgroundColor: "#1d1d1d",
					}}
				/>
				<View
					style={{
						// marginHorizontal: 5,
						width: 100,
						height: 10,
						backgroundColor: "#1d1d1d",
					}}
				/>
				<View
					style={{
						height: 10,
						width: 200,
						backgroundColor: "#1d1d1d",
						marginVertical: 10,
						justifyContent: "center",
					}}
				/>
			</View>
			<View style={{ flexDirection: "row", marginTop: 4 }}>
				<View
					style={{
						width: 72,
						height: 12,
						backgroundColor: "#1d1d1d",
						marginLeft: 12,
					}}
				/>
				<View
					style={{
						width: 72,
						height: 12,
						backgroundColor: "#1d1d1d",
						marginLeft: 12,
					}}
				/>
			</View>
			<View style={{ flexDirection: "row" }}>
				<View
					style={{
						width: 32,
						height: 32,
						borderRadius: 50,
						backgroundColor: "#1d1d1d",
						marginLeft: 12,
						marginTop: 12,
					}}
				/>
				<View
					style={{
						width: 32,
						height: 32,
						borderRadius: 50,
						backgroundColor: "#1d1d1d",
						marginLeft: 8,
						marginTop: 12,
					}}
				/>
				<View
					style={{
						width: 32,
						height: 32,
						borderRadius: 50,
						backgroundColor: "#1d1d1d",
						marginLeft: 8,
						marginTop: 12,
					}}
				/>
			</View>
			<View style={{ marginTop: 24, paddingHorizontal: 12 }}>
				<View
					style={{
						marginTop: 16,
						marginBottom: 32,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 4,
						}}
					>
						<Pin height={12} width={12} color={white[200]} />
						<StyledText
							title="Pinned video"
							style={{
								color: white[200],
								fontSize: 12,
								marginLeft: 8,
							}}
						/>
					</View>
					<Pressable
						style={{
							flexDirection: "row",
							maxWidth: Dimensions.get("window").width,
							marginTop: 16,
						}}
					>
						<View>
							<View
								style={{
									width: 160,
									height: 100,
									borderRadius: 8,
									backgroundColor: "#1d1d1d",
								}}
							/>
						</View>
						<View>
							<View
								style={{
									width: Dimensions.get("screen").width * 0.36,
									height: 16,
									backgroundColor: "#1d1d1d",
									marginHorizontal: 8,
									marginVertical: 8,
								}}
							/>
							<View
								style={{
									width: Dimensions.get("screen").width * 0.3,
									height: 12,
									backgroundColor: "#1d1d1d",
									marginHorizontal: 8,
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									width: Dimensions.get("screen").width * 0.2,
									height: 12,
									backgroundColor: "#1d1d1d",
									marginHorizontal: 8,
									marginVertical: 4,
								}}
							/>
						</View>
					</Pressable>

					<View>
						<View
							style={{
								marginVertical: 24,
							}}
						>
							<Heading
								title={"Stats"}
								style={{
									fontSize: 24,
									fontWeight: "600",
									color: white[500],
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									flexWrap: "wrap",
								}}
							>
								{[...Array(4)].map((_, index) => (
									<View
										key={index}
										style={{
											height: 130,
											width: "48%",
											marginTop: 16,
											position: "relative",
											backgroundColor: "#1d1d1d",
											borderRadius: 16,
											padding: 16,
											justifyContent: "space-between",
										}}
									/>
								))}
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default ProfileSkeleton;
