import { useNavigation } from "@react-navigation/native";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { HandleInfo, Profile } from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import React from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import { useProfile } from "store/Store";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

function ProfileCard({ profile }: { profile: Profile }) {
	const { width } = useWindowDimensions();
	const { setCurrentProfile } = useProfile();
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			style={{
				width: "48%",
				padding: 16,
				justifyContent: "center",
				alignItems: "center",
				borderWidth: 1,
				borderRadius: 8,
				borderColor: black[200],
			}}
			activeOpacity={0.4}
			onPress={() => {
				setCurrentProfile(profile);
				navigation.navigate("LoginWithLens");
			}}
		>
			<View
				style={{
					width: "100%",
					alignItems: "center",
				}}
			>
				<Avatar
					src={getIPFSLink(getRawurl(profile?.metadata?.picture))}
					height={width / 4}
					width={width / 4}
				/>
			</View>
			<StyledText
				title={formatHandle(profile?.handle as HandleInfo)}
				style={{
					fontSize: 24,
					fontWeight: "500",
					marginTop: 16,
					color: white[700],
				}}
			/>
		</TouchableOpacity>
	);
}

export default function Profiles({ navigation, route }: RootStackScreenProps<"Profiles">) {
	const profiles = route?.params?.profiles;

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					padding: 16,
					justifyContent: "center",
				}}
			>
				<Heading
					title={"Choose acount to login"}
					style={{
						fontSize: 24,
						fontWeight: "500",
						marginTop: 16,
						color: white[700],
					}}
				/>
			</View>
			<FlatList
				style={{
					padding: 16,
				}}
				numColumns={2}
				columnWrapperStyle={{
					flex: 1,
					justifyContent: "space-between",
					rowGap: 16,
				}}
				data={profiles}
				renderItem={(item) => {
					return <ProfileCard profile={item.item} />;
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#161616",
	},
});
