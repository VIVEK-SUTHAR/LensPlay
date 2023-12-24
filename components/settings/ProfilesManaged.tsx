import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import { FlatList } from "react-native-gesture-handler";
import { HandleInfo, Profile, useProfilesManagedQuery } from "customTypes/generated";
import { useProfile } from "store/Store";
import Avatar from "components/UI/Avatar";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import formatHandle from "utils/formatHandle";

const ProfilesManaged = () => {
	const { currentProfile } = useProfile();
	const { data, error, loading } = useProfilesManagedQuery({
		variables: {
			request: {
				for: currentProfile?.ownedBy?.address,
				includeOwned: true,
			},
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginVertical: 16 }}>
				<Heading
					title="Profiles Managed By You"
					style={{
						fontSize: 20,
						fontWeight: "600",
						color: white[700],
					}}
				/>
				<StyledText
					title="You are managing below profiles"
					style={{
						fontSize: 16,
						fontWeight: "500",
						color: white[200],
						marginTop: 4,
					}}
				/>
				<FlatList
					style={{
						marginVertical: 16,
					}}
					ListEmptyComponent={() => {
						return (
							<Heading
								title=" No profile managers found"
								style={{
									color: white[200],
									fontSize: 16,
									marginVertical: 64,
									textAlign: "center",
									fontWeight: "600",
								}}
							/>
						);
					}}
					data={data?.profilesManaged?.items}
					contentContainerStyle={{
						marginVertical: 16,
						gap: 8,
					}}
					renderItem={({ item }) => <MyManagedProfile profile={item as Profile} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfilesManaged;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingHorizontal: 8,
	},
});

type MyManagedProfileProps = {
	profile: Profile;
};
const MyManagedProfile = ({ profile }: MyManagedProfileProps) => {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: 12,
				}}
			>
				<Avatar src={getIPFSLink(getRawurl(profile?.metadata?.picture))} height={40} width={40} />
				<View>
					<Heading
						title={profile?.metadata?.displayName || formatHandle(profile?.handle as HandleInfo)}
						style={{
							color: white[600],
							fontSize: 16,
							fontWeight: "500",
						}}
					/>
					<View
						style={{
							paddingVertical: 2,
							paddingHorizontal: 4,
							backgroundColor: black[400],
							borderRadius: 4,
							width: 100,
						}}
					>
						<StyledText
							title={"Managed by you"}
							style={{
								color: white[600],
								fontSize: 12,
								textAlign: "center",
								fontWeight: "400",
							}}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};
