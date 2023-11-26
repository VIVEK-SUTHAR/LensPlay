import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Profile, useProfileManagersQuery } from "customTypes/generated";
import { useProfile } from "store/Store";
import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import { FlatList } from "react-native-gesture-handler";
import useSignless from "hooks/useSIgnLess";
import useProfileManager from "hooks/useProfileManager";
import Logger from "utils/logger";
import Avatar from "components/UI/Avatar";
import formatAddress from "utils/formatAddress";
import Button from "components/UI/Button";
import dimensions from "constants/Layout";
import Signless from "./SignLess";
import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AddProfileManager from "components/Sheets/AddProfileManager";

const ProfileManagers = () => {
	const { currentProfile } = useProfile();
	const addManagerSheetRef = React.useRef<BottomSheetMethods>(null);
	const { data, loading, error, fetchMore } = useProfileManagersQuery({
		variables: {
			request: {
				for: currentProfile?.id,
			},
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			<Signless />
			<View style={{ marginVertical: 16 }}>
				<Heading
					title="Profile Managers"
					style={{
						fontSize: 20,
						fontWeight: "600",
						color: white[700],
					}}
				/>
				<StyledText
					title="Accounts with control over your profile can act on your behalf."
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
					data={data?.profileManagers?.items}
					contentContainerStyle={{
						marginVertical: 16,
						gap: 8,
					}}
					renderItem={({ item }) => <ProfileManagerCard manager={item} />}
				/>
			</View>
			<View style={{ alignSelf: "center" }}>
				<Button
					title={"Add Manager"}
					width={dimensions.window.width / 3}
					textStyle={{ textAlign: "center" }}
					onPress={()=>{addManagerSheetRef.current?.snapToIndex(0)}}
				/>
			</View>
			<AddProfileManager addManagerSheetRef={addManagerSheetRef} />
		</SafeAreaView>
	);
};

export default ProfileManagers;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingHorizontal: 4,
	},
});
type manager = {
	address: string;
	isLensManager: boolean;
};
function ProfileManagerCard({ manager }: { manager: manager }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { currentProfile, setCurrentProfile } = useProfile();
	const { handleSignless } = useSignless();
	const { removeManager } = useProfileManager();

	async function handleManager() {
		try {
			setIsLoading(true);
			if (manager?.isLensManager) {
				const data = await handleSignless(false);
				if (data) {
					const profile = {
						...currentProfile,
						isSignless: false,
					};
					setCurrentProfile(profile as Profile);
				}
			}

			const data = await removeManager(manager?.address);
		} catch (error) {
			Logger.Error("ProfileManagers, handleManager()", error);
		} finally {
			setIsLoading(false);
		}
	}

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
				<Avatar src="" height={40} width={40} />
				<View>
					<Heading
						title={formatAddress(manager?.address)}
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
						}}
					>
						<StyledText
							title={manager?.isLensManager ? "Managed by Lens" : "Managed by you"}
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
			<Button
				title={"Remove"}
				textStyle={{ textAlign: "center" }}
				onPress={() => {}}
				width={dimensions.window.width / 4}
			/>
		</View>
	);
}
