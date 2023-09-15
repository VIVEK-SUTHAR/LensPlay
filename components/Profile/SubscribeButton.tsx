import Button from "components/UI/Button";
import { ToastType } from "customTypes/Store";
import { Profile } from "customTypes/generated";
import useSubscribe from "hooks/useSubscribe";
import useUnsubscribe from "hooks/useUnsubscribe";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import { useToast } from "store/Store";
import Logger from "utils/logger";

function SubscribeButton({ profile }: { profile: Profile }) {
	const [isFollowing, setIsFollowing] = React.useState<boolean>(profile?.isFollowedByMe || false);
	const { subscribeChannel } = useSubscribe();
	const { signUnsubscribeMessage, unSubscribeChannel } = useUnsubscribe();
	const toast = useToast();
	const { isGuest } = useGuestStore();

	const getButtonText = React.useCallback(() => {
		return isFollowing ? "Unsubscribe" : "Subscribe";
	}, [isFollowing]);

	const handleButtonClick = React.useCallback(() => {
		return isFollowing ? handleUnsubscribe() : handleSubscribe();
	}, [isFollowing]);

	const handleSubscribe = async () => {
		try {
			if (isGuest) {
				toast.show("Please Login", ToastType.ERROR, true);
				return;
			}
			setIsFollowing(true);
			subscribeChannel(profile);
		} catch (error) {
			Logger.Error("error in following", error);
		}
	};

	const handleUnsubscribe = async () => {
		try {
			if (isGuest) {
				toast.show("Please Login", ToastType.ERROR, true);
				return;
			}
			const hasSigned = await signUnsubscribeMessage(profile);
			if (hasSigned) {
				setIsFollowing(false);
				await unSubscribeChannel(profile);
			}
		} catch (error) {
			Logger.Error("error in Unsubscribe", error);
		}
	};

	return (
		<Button
			title={getButtonText()}
			width={"auto"}
			px={24}
			py={8}
			type={"filled"}
			bg={"white"}
			textStyle={{
				fontSize: 14,
				fontWeight: "600",
				color: "black",
			}}
			onPress={handleButtonClick}
		/>
	);
}

export default React.memo(SubscribeButton);
