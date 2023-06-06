import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	Dimensions,
	Pressable,
	RefreshControl,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorMessage from "components/common/ErrorMesasge";
import { RootStackScreenProps } from "customTypes/navigation";
import { useProfile, useThemeStore } from "store/Store";
import useInviteCodes from "hooks/useInviteCodes";
import { GetInviteResponse } from "customTypes/Store";
import CommonStyles from "styles/index";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import getRawurl from "utils/getRawUrl";
import Heading from "components/UI/Heading";
import formatHandle from "utils/formatHandle";
import { black, white } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import InviteCard from "components/invite/InviteCard";

const StatusBarHeight = Constants.statusBarHeight;

const Invite = ({ navigation }: RootStackScreenProps<"Invite">) => {
	const { currentProfile } = useProfile();
	const { invites, inviteError, isLoading, refetch } = useInviteCodes(currentProfile?.id);
	const { width, height } = useWindowDimensions();
	const theme = useThemeStore();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		try {
			refetch();
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	}, []);

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);
	if (isLoading) return <InviteSkleton />;

	if (inviteError === GetInviteResponse.ZERO_INVITES) {
		return (
			<View style={CommonStyles.screenContainer}>
				<Pressable style={styles.closeContainer} onPress={() => navigation.pop()}>
					<Icon name="close" size={20} />
				</Pressable>
				<ErrorMessage message="Sorry,You don't have invites at this moment" />
			</View>
		);
	}

	if (inviteError === GetInviteResponse.ERROR) {
		return (
			<View style={CommonStyles.screenContainer}>
				<Pressable style={styles.closeContainer} onPress={() => navigation.pop()}>
					<Icon name="close" size={20} />
				</Pressable>
				<ErrorMessage message="Looks like something went wrong" />
			</View>
		);
	}

	if (invites) {
		const leftInvites = invites.filter((code) => code.isValid).length;
		return (
			<SafeAreaView style={[CommonStyles.screenContainer]}>
				<StatusBar style="auto" />
				<Pressable style={styles.closeContainer} onPress={() => navigation.pop()}>
					<Icon name="close" size={20} />
				</Pressable>
				<ScrollView
					style={[CommonStyles.screenContainer, { padding: 16 }]}
					contentContainerStyle={{
						alignItems: "center",
						justifyContent: "space-around",
					}}
					refreshControl={_RefreshControl}
				>
					<View style={styles.upperContainer}>
						<Avatar
							src={getRawurl(currentProfile?.picture)}
							height={80}
							width={80}
							borderRadius={100}
						/>
						<View
							style={{
								marginTop: 16,
							}}
						>
							<Heading
								title={`Hey, ${currentProfile?.name || formatHandle(currentProfile?.handle)} 👋`}
								style={{
									color: white[700],
									fontSize: width / 16,
									fontWeight: "600",
								}}
							/>
							<StyledText
								title={`${leftInvites}/5 Invites Left`}
								style={{
									color: white[100],
									fontSize: 20,
									fontWeight: "500",
									marginTop: 4,
								}}
							/>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flexWrap: "wrap",
						}}
					>
						{invites.map((invite) => {
							return (
								<InviteCard
									key={invite.id}
									inviteCode={invite.inviteCode}
									isValid={invite.isValid}
								/>
							);
						})}
						<View
							style={{
								height: 150,
								width: "48%",
								marginTop: 16,
								position: "relative",
								backgroundColor: black[600],
								borderRadius: 8,
								padding: 16,
								justifyContent: "space-between",
							}}
						>
							<Heading
								title={"Bring your friend to LensPlay 😉"}
								style={{
									color: white[500],
									fontSize: width / 18,
									fontWeight: "600",
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
	return <></>;
};
export default Invite;

const _InviteSkleton = () => {
	return (
		<SafeAreaView style={[CommonStyles.screenContainer]}>
			<StatusBar style="auto" />
			<View style={styles.closeContainer}>
				<Icon name="close" size={20} />
			</View>
			<ScrollView
				style={[CommonStyles.screenContainer, { padding: 16 }]}
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<View style={styles.upperContainer}>
					<View
						style={{
							height: 80,
							width: 80,
							backgroundColor: "#1d1d1d",
							borderRadius: 50,
						}}
					/>
					<View
						style={{
							marginTop: 16,
						}}
					>
						<View
							style={{
								height: 22,
								width: Dimensions.get("screen").width / 2.5,
								backgroundColor: "#1d1d1d",
								borderRadius: 4,
							}}
						/>
						<StyledText
							title={`Invites Left`}
							style={{
								color: white[100],
								fontSize: 24,
								fontWeight: "500",
								marginTop: 4,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 16,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<View style={{ marginVertical: 2 }}>
							<View
								style={{
									height: 12,
									width: "80%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									height: 12,
									width: "60%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
						</View>
						<View
							style={{
								height: 32,
								borderRadius: 50,
								width: "90%",
								alignSelf: "center",
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>
					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 16,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<View style={{ marginVertical: 2 }}>
							<View
								style={{
									height: 12,
									width: "80%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									height: 12,
									width: "60%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
						</View>
						<View
							style={{
								height: 32,
								borderRadius: 50,
								width: "90%",
								alignSelf: "center",
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>

					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 16,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<View style={{ marginVertical: 2 }}>
							<View
								style={{
									height: 12,
									width: "80%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									height: 12,
									width: "60%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
						</View>
						<View
							style={{
								height: 32,
								borderRadius: 50,
								width: "90%",
								alignSelf: "center",
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>

					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 16,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<View style={{ marginVertical: 2 }}>
							<View
								style={{
									height: 12,
									width: "80%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									height: 12,
									width: "60%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
						</View>
						<View
							style={{
								height: 32,
								borderRadius: 50,
								width: "90%",
								alignSelf: "center",
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>

					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 16,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<View style={{ marginVertical: 2 }}>
							<View
								style={{
									height: 12,
									width: "80%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
							<View
								style={{
									height: 12,
									width: "60%",
									backgroundColor: "#1d1d1d",
									marginVertical: 4,
								}}
							/>
						</View>
						<View
							style={{
								height: 32,
								borderRadius: 50,
								width: "90%",
								alignSelf: "center",
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>

					<View
						style={{
							height: 150,
							width: "48%",
							marginTop: 16,
							position: "relative",
							backgroundColor: "#111111",
							borderRadius: 8,
							padding: 16,
							justifyContent: "space-between",
						}}
					>
						<Heading
							title={"Bring your friend to LensPlay 😉"}
							style={{
								color: white[500],
								fontSize: 24,
								fontWeight: "600",
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const InviteSkleton = React.memo(_InviteSkleton);

const styles = StyleSheet.create({
	closeContainer: {
		position: "absolute",
		top: StatusBarHeight - 8,
		right: 0,
		padding: 16,
		zIndex: 1,
	},
	upperContainer: {
		justifyContent: "space-around",
		width: "100%",
	},
	skletonAvatar: {
		height: 100,
		width: 100,
		backgroundColor: black[400],
		borderRadius: 50,
	},
	skletonText: {
		width: Dimensions.get("screen").width / 6,
		height: 30,
		borderRadius: 8,
		backgroundColor: black[400],
		padding: 12,
	},
});
