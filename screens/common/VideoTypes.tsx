import React, { useState } from "react";
import { RootStackScreenProps } from "../../types/navigation/types";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { dark_primary } from "../../constants/Colors";
import Button from "../../components/UI/Button";
import { UploadStore } from "../../store/UploadStore";

const Types: string[] = [
  "Arts & Entertainment",
  "Business",
  "Technology",
  "Health & Fitness",
  "Food & Drink",
  "Hobbies & Interests",
  "News",
  "Family & Parenting",
  "Education",
  "Law, Government and Politics",
  "Career",
  "Home & Garden",
  "Crypto",
  "Lens",
  "NSFW",
];

function Tag({ name }: { name: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "#1c1c1c",
        marginVertical: 4,
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: dark_primary,
      }}
    >
      <StyledText
        title={name}
        style={{
          fontSize: 14,
          color: "white",
        }}
      />
    </View>
  );
}

export default function VideoTypes({
  navigation,
}: RootStackScreenProps<"AddDetails">) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // const uploadStore = UploadStore();
  // console.log(uploadStore.collectModule);
  // console.log(uploadStore.isFollowersOnlyCollect);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 24,
        }}
      >
        <Heading
          title={"Please select video type"}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        />
        <StyledText
          title={"Max 5 type"}
          style={{
            color: "gray",
            fontSize: 14,
            fontWeight: "600",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 16,
            height: 120,
          }}
        >
          {selectedTags.map((type) => (
            <Pressable
              key={type}
              onPress={() => {
                const index = selectedTags.indexOf(type);
                selectedTags.splice(index, 1);
              }}
            >
              <Tag name={type} />
            </Pressable>
          ))}
        </View>
      </View>
      <Pressable
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          padding: 16,
          marginBottom: 24,
        }}
        onPress={() => {
          setSelectedTags([]);
        }}
      >
        <StyledText
          title={"CLEAR"}
          style={{
            fontSize: 12,
            color: "gray",
            fontWeight: "600",
          }}
        />
      </Pressable>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {Types.map((type) => {
          if (!selectedTags.includes(type)) {
            return (
              <Pressable
                key={type}
                onPress={() => {
                  if (selectedTags.length === 5) {
                    return;
                  }
                  setSelectedTags([...selectedTags, type]);
                }}
              >
                <Tag name={type} />
              </Pressable>
            );
          }
        })}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 16,
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Button
          title={"Upload"}
          width={"100%"}
          py={12}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
