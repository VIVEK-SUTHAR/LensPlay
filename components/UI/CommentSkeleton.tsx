import React from "react";
import { View } from "react-native";

const CommentSkeleton = () => {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "#000000",
				paddingHorizontal: 8,
				paddingTop: 8,
				paddingBottom: 24,
				marginVertical: 4,
				borderRadius: 4,
				borderBottomWidth: 1,
				borderColor: "#111111",
			}}
		>
			<View style={{ height: 40, width: 40, marginRight: 8 }}>
				<View
					style={{
						width: 40,
						height: 40,
						backgroundColor: "rgba(255,255,255,0.1)",
						borderRadius: 50,
					}}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: 2,
					}}
				>
					<View style={{ width: 90, height: 10, backgroundColor: "rgba(255,255,255,0.1)" }} />
					<View style={{ width: 40, height: 10, backgroundColor: "rgba(255,255,255,0.1)" }} />
				</View>

				{/* <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }> */}
				<View
					style={{
						width: "100%",
						height: 10,
						marginTop: 12,
						backgroundColor: "rgba(255,255,255,0.1)",
					}}
				/>
				<View
					style={{
						width: "85%",
						height: 10,
						marginTop: 8,
						backgroundColor: "rgba(255,255,255,0.1)",
					}}
				/>

				{/* </Hyperlink> */}
			</View>
		</View>
	);
};

export default CommentSkeleton;
