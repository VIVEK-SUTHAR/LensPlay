import React, { useState } from 'react'
import Button from '../../UI/Button'
import { dark_primary } from '../../../constants/Colors'
import formatInteraction from '../../../utils/formatInteraction'
import { useAuthStore, useProfile, useReactionStore, useThemeStore } from '../../../store/Store'
import LikeIcon from '../../svg/LikeIcon'
import { addLike } from "../../../api";


type LikeButtonProps = {
    id: string,
    likes: number,
    isalreadyLiked: boolean,
    setisalreadyDisLiked: React.Dispatch<React.SetStateAction<boolean>>,
    setLikes: React.Dispatch<React.SetStateAction<number>>

}

const LikeButton = ({ likes, setLikes, isalreadyLiked, setisalreadyDisLiked, id }: LikeButtonProps) => {

    const authStore = useAuthStore();
    const userStore = useProfile();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { PRIMARY } = useThemeStore();
    const likedPublication = useReactionStore();
    const thumbdown = likedPublication.dislikedPublication;

    const onLike = async () => {
		if (!isalreadyLiked && !isLiked) {
			setLikes((prev) => prev + 1);
			setIsLiked(true);
			setisalreadyDisLiked(false);
			addLike(authStore.accessToken, userStore.currentProfile?.id, id, "UPVOTE").then(
				(res) => {
					if (res.addReaction === null) {
						likedPublication.addToReactedPublications(id, likes, thumbdown);
					}
				}
			);
		}
	};

    return (
        <Button title={formatInteraction(likes) || "0"}
            mx={4}
            px={16}
            width={"auto"}
            bg={dark_primary}
            type={"filled"}
            borderRadius={8}
            textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white",
                marginLeft: 4,
            }}
            borderColor={isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white"}
            onPress={onLike}
            icon={
                <LikeIcon
                    height={20}
                    width={20}
                    filled={isalreadyLiked || isLiked ? true : false}
                />
            } />
    )
}

export default LikeButton
