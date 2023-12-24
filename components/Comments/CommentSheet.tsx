import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import { black, white } from "constants/Colors";
import { Scalars } from "customTypes/generated";
import React from "react";
import { useActivePublication } from "store/Store";
import Comment from ".";
import CommentInput from "./CommentInput";
import { BottomSheetFooter, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultFooterProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types";
import { Pressable, View } from "react-native";
import Heading from "components/UI/Heading";
import Icon from "components/Icon";

type CommentsSheetProps = {
	commentSheetRef: React.RefObject<BottomSheetMethods>;
	pubId?: Scalars["PublicationId"];
};

const CommentsSheet = ({ commentSheetRef, pubId }: CommentsSheetProps) => {
	const { activePublication } = useActivePublication();

	const renderFooter = React.useCallback(
		(props: BottomSheetDefaultFooterProps) => (
			<BottomSheetFooter {...props} bottomInset={0}>
				<CommentInput publicationId={activePublication?.id || pubId} />
			</BottomSheetFooter>
		),
		[]
	);

	return (
		<Sheet
			ref={commentSheetRef}
			snapPoints={["75%", "95%"]}
			android_keyboardInputMode="adjustResize"
			enableDynamicSizing={true}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			footerComponent={renderFooter}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 16,
					paddingVertical: 16,
					borderBottomWidth: 1,
					borderColor: black[400],
				}}
			>
				<Heading
					title={"Comments"}
					style={{
						fontSize: 16,
						color: white[800],
						fontWeight: "600",
					}}
				/>
				<Pressable
					onPress={() => {
						commentSheetRef?.current?.close();
					}}
				>
					<Icon name="close" size={16} />
				</Pressable>
			</View>
			<BottomSheetScrollView>
				<Comment publicationId={activePublication?.id || pubId} shots={false} />
			</BottomSheetScrollView>
		</Sheet>
	);
};

export default React.memo(CommentsSheet);
