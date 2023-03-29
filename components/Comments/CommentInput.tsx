import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { getProxyActionStatus } from "../../api";
import { client } from "../../apollo/client";
import createCommentViaDispatcher from "../../apollo/mutations/createCommentViaDispatcher";
import { useGuestStore } from "../../store/GuestStore";
import {
  useAuthStore,
  useOptimisticStore,
  useProfile,
  useThemeStore,
  useToast
} from "../../store/Store";
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
  const { optimitisticComment, setOptimitisticComment } = useOptimisticStore();

  const [commentText, setCommentText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const { isGuest } = useGuestStore();

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
      toast.show("Comment submitted", ToastType.SUCCESS, true);
      setOptimitisticComment({
        commentText: commentText,
        handle: currentProfile?.handle,
        isIndexing: true,
        username: currentProfile?.name,
      });
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
      if (data?.createCommentViaDispatcher?.__typename === "RelayerResult") {
        while (true) {
          const status = await getProxyActionStatus(
            data?.createCommentViaDispatcher?.txId,
            accessToken
          );
          if (status) {
            setOptimitisticComment({
              ...optimitisticComment,
              isIndexing: false,
            });
            break;
          }
          if (!status) {
            setOptimitisticComment({
              ...optimitisticComment,
              isIndexing: false,
            });
            break;
          }
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
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
      ) : (
        <></>
      )}
    </View>
  );
};

export default React.memo(CommentInput);
