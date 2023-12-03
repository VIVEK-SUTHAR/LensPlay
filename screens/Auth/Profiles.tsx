import { useNavigation } from "@react-navigation/native";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { HandleInfo, HandleLinkedTo, MetadataAttribute, Profile } from "customTypes/generated";
import { ScrollView } from "react-native";
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
import Icon from "components/Icon";
import { StatusBar } from "expo-status-bar";

function ProfileCard({ profile }: { profile: Profile | undefined }) {
	const { width } = useWindowDimensions();
	const { setCurrentProfile } = useProfile();
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			style={{
				width: "100%",
				// flex: 1,
				paddingVertical: 16,
				justifyContent: "center",
				alignItems: "center",
				// borderBottomWidth: 1,
				// borderRadius: 8,
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
					flexDirection: "row",
				}}
			>
				<Avatar
					src={getIPFSLink(getRawurl(profile?.metadata?.picture))}
					height={width / 8}
					width={width / 8}
				/>
				<View
					style={{
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
						flex: 1,
					}}
				>
					<View style={{ marginHorizontal: 8 }}>
						<StyledText
							title={profile?.metadata?.displayName}
							style={{
								fontSize: 16,
								fontWeight: "500",
								alignItems: "center",
								color: white[700],
							}}
						/>
						<StyledText
							title={formatHandle(profile?.handle as HandleInfo)}
							style={{
								fontSize: 12,
								fontWeight: "500",
								alignItems: "center",
								color: white[500],
							}}
						/>
					</View>
					<Icon name="rightArrow" color="white" size={16} />
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default function Profiles({ navigation, route }: RootStackScreenProps<"Profiles">) {
	const profiles = route?.params?.profiles;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar/>
				<Heading
					title={"Choose acount to login"}
					style={{
						fontSize: 24,
						fontWeight: "500",
						color: white[700],
						marginTop:44,
						marginBottom:32,
						textAlign:"center"
					}}
				/>
			<FlatList
				style={{
					paddingHorizontal: 16,
					// flex: 1,
				}}
				ItemSeparatorComponent={()=>{
					return (
						<View style={{backgroundColor:black[200],height:1}} >

						</View>
					)
				}}
				data={profiles}
				renderItem={(item) => {
					return (
						<View>
							<ProfileCard profile={item.item} />
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#161616",
		padding:16
	},
});
