import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { white } from "constants/Colors";
import { Profile, useProfilesManagedQuery } from "customTypes/generated";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useProfile } from "store/Store";
import formatAddress from "utils/formatAddress";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

export default function ProfilesManaged() {
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
		<View style={{ marginVertical: 16 }}>
			<Heading
				title="Profiles Managed by you"
				style={{
					fontSize: 20,
					fontWeight: "600",
					color: white[700],
				}}
			/>
			<StyledText
				title="Profiles under your oversight and management."
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
					gap: 16,
				}}
				renderItem={({ item }) => <ProfileCard profile={item as Profile} />}
			/>
		</View>
	);
}

function ProfileCard({ profile }: { profile: Profile }) {
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
					gap: 8,
				}}
			>
				<Avatar
					src={getIPFSLink(getRawurl(profile?.metadata?.picture))}
					height={40}
					width={40}
				/>
				<View>
					<Heading
						title={
							profile?.metadata?.displayName ||
							formatAddress(profile?.ownedBy as unknown as string)
						}
						style={{
							color: white[600],
							fontSize: 16,
							fontWeight: "600",
						}}
					/>
					<StyledText
						title={formatHandle(profile?.handle!)}
						style={{
							color: white[200],
							fontSize: 12,
							textAlign: "center",
						}}
					/>
				</View>
			</View>
			{/* <Button
				title={"Remove"}
				textStyle={{ textAlign: "center", fontSize: 16 }}
				onPress={() => {}}
				width={dimensions.window.width / 3}
				bg={white[700]}
				py={12}
			/> */}
		</View>
	);
}
