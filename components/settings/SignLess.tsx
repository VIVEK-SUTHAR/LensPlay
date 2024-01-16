import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { black, white } from "constants/Colors";
import { Profile } from "customTypes/generated";
import useSignless from "hooks/useSIgnLess";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useProfile } from "store/Store";
import Logger from "utils/logger";

export default function Signless() {
	const { currentProfile, setCurrentProfile } = useProfile();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { handleSignless } = useSignless();
	const [isSignless, setIsSignless] = React.useState<boolean>(
		currentProfile?.signless || false
	);
	async function ToggleSignless() {
		try {
			setIsLoading(true);
			const data = await handleSignless(!isSignless);
			Logger.Success("data", data);
			if (data) {
				setIsSignless(!isSignless);
				const profile = {
					...currentProfile,
					isSignless: isSignless,
				};
				setCurrentProfile(profile as Profile);
			}
		} catch (error) {
			Logger.Error("error", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View
			style={{
				marginTop: 8,
			}}
		>
			<Heading
				title="Signless transactions"
				style={{
					fontSize: 20,
					fontWeight: "600",
					color: white[700],
				}}
			/>
			<StyledText
				title="You can enable Lens manager to interact with LensPlay without signing any of your transactions."
				style={{
					fontSize: 16,
					fontWeight: "500",
					color: white[200],
					marginTop: 4,
				}}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: 16,
					backgroundColor: black[600],
					borderRadius: 8,
					marginVertical: 16,
				}}
			>
				<StyledText
					title={"Enable Signless"}
					style={{
						fontSize: 16,
						fontWeight: "500",
						color: white[600],
					}}
				/>

				{isLoading ? (
					<ActivityIndicator size={"small"} />
				) : (
					<Switch handleOnPress={ToggleSignless} value={isSignless} />
				)}
			</View>
		</View>
	);
}
