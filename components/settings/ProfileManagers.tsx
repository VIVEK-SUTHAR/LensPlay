import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { white } from "constants/Colors";
import {
	Profile,
	useProfileManagersQuery,
	useProfileQuery,
	useProfilesManagedQuery,
	useProfilesQuery,
} from "customTypes/generated";
import useProfileManager from "hooks/useProfileManager";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useProfile } from "store/Store";
import formatAddress from "utils/formatAddress";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

export default function ProfileManagers() {
	const { currentProfile } = useProfile();
	const { data, error, loading } = useProfileManagersQuery({
		variables: {
			request: {
				for: currentProfile?.id,
			},
		},
	});

	const managers = data?.profileManagers?.items?.filter((manager) => {
		return manager.isLensManager !== true;
	});

	return (
		<View style={{ marginVertical: 16, flex: 1 }}>
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
				data={managers}
				contentContainerStyle={{
					marginVertical: 16,
					gap: 16,
				}}
				renderItem={({ item }) => <ProfileCard profile={item} />}
			/>
		</View>
	);
}

function ProfileCard({
	profile,
}: {
	profile: {
		__typename?: "ProfilesManagedResult" | undefined;
		address: any;
		isLensManager: boolean;
	};
}) {
	const {
		removeManager,
		signProfileManagerMessage,
		broadcastProfileManagerTx,
	} = useProfileManager();
	const [isLoading, setIsLoading] = useState(false);

	async function handleRemoveProfile() {
		try {
			setIsLoading(true);
			const typedata = await removeManager(profile?.address);
			if (typedata) {
				const data = await signProfileManagerMessage(typedata);
				if (data?.id && data?.sign) {
					const da = await broadcastProfileManagerTx(data.id, data.sign);
				}
			}
		} catch (error) {
			Logger.Error("error", error);
		} finally {
			setIsLoading(false);
		}
	}

	const { data, loading, error } = useProfilesQuery({
		variables: {
			request: {
				where: {
					ownedBy: profile?.address,
				},
			},
		},
	});

	if (error || loading || profile?.isLensManager) return;

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
					src={getIPFSLink(
						getRawurl(data?.profiles?.items[0]?.metadata?.picture)
					)}
					height={40}
					width={40}
				/>
				<View>
					<Heading
						title={
							data?.profiles?.items[0]?.metadata?.displayName ||
							formatAddress(profile.address)
						}
						style={{
							color: white[600],
							fontSize: 16,
							fontWeight: "600",
						}}
					/>
					{data?.profiles?.items[0]?.handle && (
						<StyledText
							title={formatHandle(data?.profiles?.items[0]?.handle)}
							style={{
								color: white[200],
								fontSize: 12,
							}}
						/>
					)}
				</View>
			</View>
			{isLoading ? (
				<View
					style={{
						width: Dimensions.get("window").width / 3,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator />
				</View>
			) : (
				<Button
					title={"Remove"}
					textStyle={{ textAlign: "center", fontSize: 16 }}
					onPress={handleRemoveProfile}
					width={Dimensions.get("window").width / 3}
					bg={white[700]}
					py={12}
				/>
			)}
		</View>
	);
}
