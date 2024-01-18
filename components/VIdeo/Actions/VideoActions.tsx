import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import LikeButton from "./LikeButton";
import DisLikeButton from "./DisLikeButton";
import MirrorButton from "./MirrorButton";
import ShareButton from "./ShareButton";
import ReportButton from "./ReportButton";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useActivePublication, useReactionStore } from "store/Store";
import CollectButton from "./CollectButton";

type VideoActionsProps = {
	mirrorRef: React.RefObject<BottomSheetMethods>;
	collectRef: React.RefObject<BottomSheetMethods>;
};

const VideoActions: FC<VideoActionsProps> = ({ mirrorRef,collectRef }) => {
	const { activePublication } = useActivePublication();
	const { videopageStats, setVideoPageStats, setCollectStats, setMirrorStats } = useReactionStore();
	React.useEffect(() => {
		setVideoPageStats(
			//@ts-expect-error
			activePublication?.operations?.upvote,
			activePublication?.operations.downvote,
			activePublication?.stats?.reactions || 0
		);
		setCollectStats(
			activePublication?.operations?.hasActed?.value || false,
			activePublication?.stats?.countOpenActions || 0
		);
		if (activePublication?.__typename === "Post") {
			setMirrorStats(
				activePublication?.operations.hasMirrored,
				activePublication?.stats?.mirrors || 0
			);
		}
	}, [activePublication]);
	return (
		<ScrollView
			style={styles.videoActionsContainer}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
		>
			<LikeButton
				like={videopageStats?.likeCount}
				id={activePublication?.id}
				isalreadyLiked={videopageStats?.isLiked}
			/>
			<DisLikeButton isalreadyDisLiked={videopageStats?.isDisliked} id={activePublication?.id} />
			<MirrorButton mirrorRef={mirrorRef} />
			 <CollectButton collectRef={collectRef} /> 
			<ShareButton />
			<ReportButton />
		</ScrollView>
	);
};

export default VideoActions;

const styles = StyleSheet.create({
	videoActionsContainer: {
		marginBottom: 16,
		marginStart: 4,
	},
});
