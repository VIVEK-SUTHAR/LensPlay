import { View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../../store/Store";
import Avatar from "../UI/Avatar";
import uploadMetaDataToArweave from "../../utils/uploadMetaToArweave";
import { ToastType } from "../../types/Store";
import { client } from "../../apollo/client";
import createCommentViaDispatcher from "../../apollo/mutations/createCommentViaDispatcher";
import { Feather } from "@expo/vector-icons";

type CommentInputProps = {
  publicationId: string;
};

const CommentInput = ({ publicationId }: CommentInputProps) => {
  const [commentText, setCommentText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();

  async function publishComment() {
    if (commentText.length === 0) {
      toast.show("Please type something", ToastType.ERROR, true);
      return;
    }
    try {
      toast.show("Comment submitted", ToastType.SUCCESS, true);
      setCommentText("");
      const contenturi = await uploadMetaDataToArweave(
        commentText,
        currentProfile?.handle
      );
      const { data, errors } = await client.mutate({
        mutation: createCommentViaDispatcher,
        variables: {
          profileId: currentProfile?.id,
          publicationId: publicationId,
          uri: contenturi,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      if (errors) {
        toast.show("Something went wrong", ToastType.ERROR, true);
        return;
      }
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
          src={getIPFSLink(currentProfile?.picture.original.url)}
          height={28}
          width={28}
        />
      </View>
      <TextInput
        placeholder="What's in your mind"
        style={{ flex: 1, color: "white" }}
        selectionColor={PRIMARY}
        value={commentText}
        onFocus={(e) => {
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
      {isFocused ? (
        <Pressable
          android_ripple={{
            color: commentText.length === 0 ? "gray" : PRIMARY,
            radius: 20,
          }}
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            // marginHorizontal: 2,
            paddingHorizontal: 12,
          }}
          onPressIn={publishComment}
        >
          <Feather
            name="send"
            color={commentText.length === 0 ? "gray" : PRIMARY}
            size={24}
          />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};

export default React.memo(CommentInput);
