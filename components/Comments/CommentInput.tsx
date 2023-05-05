import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useGuestStore } from "../../store/GuestStore";
import {
  useActivePublication,
  useAuthStore,
  useOptimisticStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../../store/Store";
import { useCreateCommentViaDispatcherMutation } from "../../types/generated";
import { ToastType } from "../../types/Store";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import uploadMetaDataToArweave from "../../utils/uploadMetaToArweave";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";

type CommentInputProps = {
  publicationId: string;
};

const CommentInput = ({ publicationId }: CommentInputProps) => {
  const { setOptimitisticComment } = useOptimisticStore();

  const [commentText, setCommentText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const { isGuest } = useGuestStore();
  

  const [createComment] = useCreateCommentViaDispatcherMutation({
    onError: () => {
      toast.error("Something went wrong");
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  async function publishComment() {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (commentText.length === 0) {
      toast.show("Please type something", ToastType.ERROR, true);
      return;
    }
    try {
      toast.success("Comment submitted!");
      setCommentText("");
      setIsFocused(false);
      // setOptimitisticComment({
      //   commentText: commentText,
      //   handle: currentProfile?.handle,
      //   isIndexing: true,
      //   username: currentProfile?.name,
      // });
      const contenturi = await uploadMetaDataToArweave(
        commentText,
        currentProfile?.handle
      );
      await createComment({
        variables: {
          request: {
            profileId: currentProfile?.id,
            publicationId: publicationId,
            contentURI: contenturi,
            collectModule: {
              revertCollectModule: true,
            },
          },
        },
      });
    } catch (error) {
      setCommentText("");
      toast.show("Something Went wrong", ToastType.ERROR, true);
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#1A1A1A",
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={getIPFSLink(getRawurl(currentProfile?.picture))}
          height={28}
          width={28}
        />
      </View>
      <TextInput
        placeholder="What's in your mind"
        style={{ flex: 1, color: "white" }}
        selectionColor={PRIMARY}
        value={commentText}
        onFocus={() => {
          setIsFocused((state) => !state);
        }}
        onSubmitEditing={() => {
          setIsFocused((state) => !state);
        }}
        onPressIn={() => {
          setIsFocused((state) => !state);
        }}
        onPressOut={() => {
          setIsFocused((state) => !state);
        }}
        onBlur={() => {
          setIsFocused((state) => !state);
        }}
        onChange={(e) => {
          setCommentText(e.nativeEvent.text);
        }}
        placeholderTextColor={"white"}
      />
        <Pressable
          android_ripple={{
            color: commentText.length === 0 ? "gray" : PRIMARY,
            radius: 20,
          }}
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 12,
          }}
          onPressIn={publishComment}
        >
          <Icon
            name="send"
            color={commentText.length === 0 ? "gray" : PRIMARY}
            size={24}
          />
        </Pressable>
    </View>
  );
};

export default React.memo(CommentInput);
