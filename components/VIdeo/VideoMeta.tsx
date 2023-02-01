import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Heading from "../UI/Heading";
import SubHeading from "../UI/SubHeading";
import { Feather } from "@expo/vector-icons";

type VideoMetaProps = {
	title: string;
	description: string;
};

const VideoMeta = (props: VideoMetaProps) => {
	const [descOpen, setDescOpen] = useState<boolean>(false);

	const { title, description } = props;
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Heading
					title={title}
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
			<></>
			<View>
				{descOpen ? (
					<View style={{ marginTop: 8 }}>
						<SubHeading title={description} style={{ color: "white", fontSize: 14 }} />
					</View>
				) : (
					<></>
				)}
			</View>
		</>
	);
};

export default VideoMeta;

const styles = StyleSheet.create({});
