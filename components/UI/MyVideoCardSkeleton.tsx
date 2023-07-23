import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Heading from "./Heading";
import StyledText from "./StyledText";
import Icon from "components/Icon";

type Props = {};

const MyVideoCardSkeleton = (props: Props) => {
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					maxWidth: Dimensions.get("window").width,
					padding: 8,
				}}
			>
				<View>
					<View
						style={{
							width: 160,
							height: 100,
							borderRadius: 8,
							backgroundColor: "#191919",
						}}
					/>
				</View>
				<View
					style={{
						height: "100%",
						width: "50%",
						marginLeft: 16,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							width: "80%",
						}}
					>
						<Heading
							title={""}
							style={{
								color: "white",
								fontSize: 16,
								fontWeight: "500",
								width: "100%",
								backgroundColor: "#191919",
								borderRadius: 2,
								marginVertical: 2,
							}}
							numberOfLines={1}
						/>
						<Heading
							title={""}
							style={{
								color: "white",
								fontSize: 16,
								fontWeight: "500",
								width: "90%",
								backgroundColor: "#191919",
								borderRadius: 2,
								marginVertical: 2,
							}}
							numberOfLines={1}
						/>
						<View
							style={{
								marginTop: 4,
							}}
						>
							<StyledText
								title={""}
								numberOfLines={1}
								style={{
									color: "gray",
									fontSize: 12,
									width: "55%",
									height: 12,
									backgroundColor: "#191919",
                                    marginVertical:3
								}}
							/>
						</View>
						<View
							style={{
								marginTop: 2,
							}}
						>
							<StyledText
								title={""}
								style={{
									color: "gray",
									fontSize: 12,
									width: "40%",
									height: 12,
									backgroundColor: "#191919",
								}}
							/>
						</View>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						style={{
							padding: 4,
							height: "30%",
						}}
					>
						<Icon name="more" size={16} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default MyVideoCardSkeleton;

const styles = StyleSheet.create({});
