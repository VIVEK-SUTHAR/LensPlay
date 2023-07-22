import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import { black } from "constants/Colors";
import { useActivePublication } from "store/Store";
import CommentInput from "./CommentInput";
import React from "react";
import Comment from ".";
import { Scalars } from "customTypes/generated";
type CommentsSheetProps = {
	commentSheetRef: React.RefObject<BottomSheetMethods>;
	pubId?: Scalars["InternalPublicationId"];
};
const CommentsSheet = ({ commentSheetRef, pubId }: CommentsSheetProps) => {
	const { activePublication } = useActivePublication();
	return (
		<Sheet
			ref={commentSheetRef}
			snapPoints={["75%", "100%"]}
			index={-1}
			enablePanDownToClose={true}
			enableOverDrag={true}
			style={{
				paddingHorizontal: 12,
			}}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<CommentInput publicationId={activePublication?.id || pubId} />
			<BottomSheetFlatList
				data={[0]}
				renderItem={() => {
					return <Comment publicationId={activePublication?.id || pubId} shots={false} />;
				}}
			></BottomSheetFlatList>
		</Sheet>
	);
};

export default React.memo(CommentsSheet);
