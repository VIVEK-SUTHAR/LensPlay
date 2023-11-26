import { StyleSheet, View } from "react-native";
import React from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import { black, white } from "constants/Colors";
import Heading from "components/UI/Heading";
import dimensions from "constants/Layout";
import StyledText from "components/UI/StyledText";
import Button from "components/UI/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "constants/Storage";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "store/Store";
import TrackAction from "utils/Track";
import { AUTH } from "constants/tracking";
type Props = {
	logoutref: React.RefObject<BottomSheetMethods>;
};

const LogOutSheet = ({ logoutref }: Props) => {
	const { disconnect } = useDisconnect();
	const navigation = useNavigation();
	const { setCurrentProfile } = useProfile();
	return (
		<Sheet
			ref={logoutref}
			index={-1}
			snapPoints={[230]}
			bottomInset={32}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			detached={true}
			style={{
				marginHorizontal: 16,
			}}
		>
			<View style={styles.sheetContentContainer}>
				<View>
					<Heading
						title="Are you sure?"
						style={{
							color: "white",
							fontSize: dimensions.window.width / 16,
							marginVertical: 4,
							textAlign: "left",
							fontWeight: "600",
						}}
					/>
					<StyledText
						title="By doing this,next time when you open LensPlay, you need to connect your wallet again."
						style={{
							color: "gray",
							fontSize: dimensions.window.width / 24,
							marginVertical: 4,
							fontWeight: "500",
						}}
					/>
				</View>
				<Button
					onPress={async () => {
						const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
						await AsyncStorage.removeItem("@user_tokens");
						await AsyncStorage.removeItem(StorageKeys.UserAddress);
						if (isDeskTopLogin) {
							await AsyncStorage.removeItem("@viaDeskTop");
							navigation.reset({ index: 0, routes: [{ name: "LetsGetIn" }] });
							return;
						} else {
							// await connector?.disconnect();
							disconnect();
							navigation.reset({ index: 0, routes: [{ name: "LetsGetIn" }] });
						}
						setCurrentProfile(undefined);
						TrackAction(AUTH.LOGOUT);
					}}
					my={16}
					title="Confirm"
					bg={white[800]}
					textStyle={{
						fontWeight: "600",
						fontSize: 16,
						color: "black",
					}}
					py={12}
					borderRadius={8}
				/>
			</View>
		</Sheet>
	);
};

export default LogOutSheet;

const styles = StyleSheet.create({
	sheetContentContainer: {
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 16,
		height: "100%",
	},
});
