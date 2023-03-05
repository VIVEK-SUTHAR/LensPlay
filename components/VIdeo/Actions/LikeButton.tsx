import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import formatInteraction from "../../../utils/formatInteraction";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
} from "../../../store/Store";
import { addLike } from "../../../api";
import Icon from "../../Icon";

type LikeButtonProps = {
  id: string;
  like: number;
  isalreadyLiked: string | null;
  bytes?: boolean;
};

const LikeButton = ({
  like,
  isalreadyLiked,
  id,
  bytes = false,
}: LikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isAlreadyLiked, setisAlreadyLiked] = useState<boolean>(isalreadyLiked === "UPVOTE" ? true : false);
  let clicked = false;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(like);
  const { PRIMARY } = useThemeStore();
  const likedPublication = useReactionStore();
  const thumbdown = likedPublication.dislikedPublication;
  const thumbup = likedPublication.likedPublication;

  const checkAlreadyDislike = () => {
      if(isAlreadyLiked && !clicked){
        console.log(clicked, 'clicked');
        
        likedPublication.addToReactedPublications(id, likes, thumbdown);
        console.log('already liked nhi hona');
      }
  };

  const checkClicked = () => {
    thumbdown.map((publication) => {
      if (publication.id === id){
        clicked = true;
      }
    })
    thumbup.map((publication) => {
      if (publication.id === id){
        clicked = true;
      }
    })
  }

  useEffect(() => {
    checkClicked();
  },[]);
 
  useEffect(() => {
    thumbup.map((publication) => {
      if(isAlreadyLiked){
        if (publication.id === id) {
          setIsLiked(true);
          // clicked = true;
        }
      }
      else if(!isAlreadyLiked || !isLiked){
        if (publication.id === id) {
          setIsLiked(true);
          setLikes(publication.likes + 1);
          // clicked = true;
        }
      }
    });
      thumbdown.map((publication) => {
        if(isLiked || clicked){
          if (publication.id === id) {
            setIsLiked(false);
            setisAlreadyLiked(false);
            setLikes(prev => prev - 1);
            console.log('likes after dislike', like)
            clicked = true;
          }
        }
        else{
          if (publication.id === id) {
            setIsLiked(false);
            setisAlreadyLiked(false);
            clicked = true;
          }
        }
        
      })

  },[thumbdown,thumbup])

 

  useEffect(() => {
    checkAlreadyDislike();
  }, [clicked]);

  const onLike = async () => {
    if (!isAlreadyLiked ) {
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "UPVOTE"
      ).then((res) => {
        if (res.addReaction === null) {
          likedPublication.addToReactedPublications(id, likes, thumbdown);
        }
      });
    }
    
  };

  return (
    <Button
      title={formatInteraction(likes) || "0"}
      mx={4}
      px={16}
      width={"auto"}
      bg={bytes ? "transparent" : dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: isLiked ? PRIMARY : "white",
        marginLeft: 4,
      }}
      borderColor={isLiked || isalreadyLiked ? PRIMARY : "white"}
      onPress={onLike}
      bytes={bytes}
      icon={
        <Icon
          name="like"
          size={bytes?28:20}
          color={isLiked || isAlreadyLiked? PRIMARY : "white"}
        />
      }
    />
  );
};

export default LikeButton;
