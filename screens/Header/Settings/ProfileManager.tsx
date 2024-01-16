import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ProfilesManaged from "components/settings/ProfilesManaged";
import Signless from "components/settings/SignLess";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useProfile } from "store/Store";

export default function ProfileManager() {
	const { currentProfile } = useProfile();
	const addManagerSheetRef = React.useRef<BottomSheetMethods>(null);

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				<View style={styles.container}>
					<Signless />
					<ProfilesManaged />
				</View>
				{/* <View
					style={{
						position: "absolute",
						bottom: 32,
						padding: 16,
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						title={"Add Manager"}
						width={"100%"}
						textStyle={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
						onPress={() => {
							addManagerSheetRef.current?.snapToIndex(0);
						}}
						py={16}
						bg={white[700]}
					/>
				</View> */}
			</SafeAreaView>
			{/* <AddProfileManager addManagerSheetRef={addManagerSheetRef} /> */}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		padding: 16,
	},
});
