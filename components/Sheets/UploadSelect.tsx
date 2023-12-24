import { Pressable, View } from "react-native";
import React from "react";
import Sheet from "components/Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { black } from "constants/Colors";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";

type Props = {
	uploadRef: React.RefObject<BottomSheetMethods>;
	uploadTypeRef: React.RefObject<BottomSheetMethods>;
};

const UploadSelect = ({ uploadRef, uploadTypeRef }: Props) => {
	return (
		<Sheet
			ref={uploadRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			snapPoints={[110]}
		>
			<View
				style={{
					maxWidth: "100%",
					height: "100%",
				}}
			>
				<Pressable
					android_ripple={{
						color: "rgba(0,0,0,0.2)",
					}}
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
					onPress={() => {
						uploadRef.current?.close();
						uploadTypeRef.current?.snapToIndex(0);
					}}
				>
					<View
						style={{
							padding: 16,
							backgroundColor: black[700],
							borderRadius: 50,
						}}
					>
						<Icon name="create" size={24} />
					</View>
					<StyledText
						title={"Create a video"}
						style={{
							color: "white",
							fontSize: 20,
							marginHorizontal: 16,
						}}
					/>
				</Pressable>
				{/* <Pressable
						android_ripple={{
							color: "rgba(0,0,0,0.2)",
						}}
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
						onPress={async () => {
							//   const cameraPermission = await Camera.requestCameraPermission();
							//   const microphonePermission = await Camera.requestMicrophonePermission();
							//   if (
							//     cameraPermission === "authorized" &&
							//     microphonePermission === "authorized"
							//   ) {
							//     navigation.push("UploadShots");
							//   } else {
							//     uploadRef.current?.close();
							//   }
						}}
					>
						<View
							style={{
								padding: 16,
								backgroundColor: black[700],
								borderRadius: 50,
							}}
						>
							<Icon name="shots_outline" size={24} />
						</View>
						<StyledText
							title={"Create a shots"}
							style={{
								color: "white",
								fontSize: 20,
								marginHorizontal: 16,
							}}
						/>
					</Pressable> */}
			</View>
		</Sheet>
	);
};

export default UploadSelect;
