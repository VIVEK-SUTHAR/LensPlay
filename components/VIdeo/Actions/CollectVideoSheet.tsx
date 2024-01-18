import { ApolloCache } from "@apollo/client";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import LPImage from "components/UI/LPImage";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { HandleInfo } from "customTypes/generated";
import useCollectAction from "hooks/reactions/useCollectAction";
import usePaidCollectAction from "hooks/reactions/usePaidCollectAction";
import useApproveAllownce from "hooks/useApproveAllownce";
import React from "react";
import { Pressable, View } from "react-native";
import {
	useActivePublication,
	useAuthStore,
	useReactionStore,
	useThemeStore,
	useToast,
} from "store/Store";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

type CollectVideoSheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
};

const CollectVideoSheet: React.FC<CollectVideoSheetProps> = ({
	sheetRef: collectRef,
}) => {
	const { activePublication } = useActivePublication();
	const { collectStats } = useReactionStore();
	const theme = useThemeStore();

	const { collect } = useCollectAction();
	const a = usePaidCollectAction();
	const { approveAllowance } = useApproveAllownce();
	const collectPublication = async () => {
		try {
			await collect();
			// collectRef?.current?.close();
		} catch (error) {}
	};

	return (
		<Sheet
			ref={collectRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			snapPoints={[580]}
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
				>
					<Heading
						title={"Collect video"}
						style={{
							fontSize: 20,
							color: white[800],
							fontWeight: "500",
						}}
					/>
					<Pressable
						onPress={() => {
							collectRef?.current?.close();
						}}
					>
						<Icon name="close" size={16} />
					</Pressable>
				</View>
				<View
					style={{
						borderBottomColor: black[300],
						borderBottomWidth: 1.5,
						marginTop: 8,
					}}
				/>
				<BottomSheetScrollView
					style={{
						flex: 1,
						paddingHorizontal: 16,
					}}
				>
					<View
						style={{
							marginTop: 20,
						}}
					>
						<LPImage
							source={{
								uri: getIPFSLink(
									getRawurl(activePublication?.metadata?.asset?.cover)
								),
							}}
							style={{
								height: 200,
								borderRadius: 8,
								width: "100%",
							}}
						/>

						<StyledText
							title={activePublication?.metadata?.title}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "600",
								marginTop: 16,
							}}
							numberOfLines={2}
						/>
					</View>
					<View
						style={{
							marginTop: 16,
						}}
					>
						<Heading
							title={"Posted by"}
							style={{
								fontSize: 16,
								color: white[100],
								fontWeight: "600",
							}}
						/>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginTop: 8,
							}}
						>
							<Avatar
								src={getRawurl(activePublication?.by?.metadata?.picture)}
								height={40}
								width={40}
							/>
							<View
								style={{
									marginHorizontal: 8,
									maxWidth: "100%",
								}}
							>
								<Heading
									title={activePublication?.by?.metadata?.displayName}
									numberOfLines={1}
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "500",
									}}
								/>
								<StyledText
									title={formatHandle(
										activePublication?.by?.handle as HandleInfo
									)}
									style={{
										color: "gray",
										fontSize: 12,
										fontWeight: "500",
									}}
								/>
							</View>
						</View>
					</View>
					<View
						style={{
							marginVertical: 24,
						}}
					>
						{a?.allowence && a.allowence > 0 ? (
							<Button
								title={
									collectStats?.isCollected
										? "Video already collected"
										: `Collect Video`
								}
								py={12}
								textStyle={{
									fontSize: 20,
									fontWeight: "600",
									textAlign: "center",
								}}
								bg={collectStats?.isCollected ? "#c0c0c0" : theme.PRIMARY}
								onPress={() => {
									collectPublication();
								}}
							/>
						) : (
							<Button
								title={`Approve Collect Module`}
								py={12}
								textStyle={{
									fontSize: 20,
									fontWeight: "600",
									textAlign: "center",
								}}
								bg={collectStats?.isCollected ? "#c0c0c0" : theme.PRIMARY}
								onPress={() => {
									approveAllowance(activePublication!);
								}}
							/>
						)}
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default CollectVideoSheet;
