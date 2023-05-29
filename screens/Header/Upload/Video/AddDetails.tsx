import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import CollectModule, { CollectModuleSheet } from "components/Upload/Video/CollectModule";
import CommentModule, {
  CommentModuleSheet,
  ReferenceModuleListItem
} from "components/Upload/Video/CommentModule";
import { STATIC_ASSET } from "constants/index";
import type { RootStackScreenProps } from "customTypes/navigation";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { useThemeStore, useToast } from "store/Store";
import { useUploadStore } from "store/UploadStore";

const windowHeight = Dimensions.get("window").height;
const ReferenceModuleList: ReferenceModuleListItem[] = [
	{
		name: "Everyone",
		isSelected: true,
	},
	{
		name: "My followers",
		isSelected: false,
	},
	{
		name: "My following",
		isSelected: false,
	},
	{
		name: "Friends of friend",
		isSelected: false,
	},
];

export default function AddDetails({ navigation }: RootStackScreenProps<"AddDetails">) {
	const [activeModule, setActiveModule] = useState(ReferenceModuleList[0]);

	const { title, description, setTitle } = useUploadStore();
	const { PRIMARY } = useThemeStore();
	const referenceModuleRef = React.useRef<BottomSheetMethods>(null);
	const collectModuleRef = React.useRef<BottomSheetMethods>(null);
	const toast = useToast();
	const uploadStore = useUploadStore();

	const handleOnChange = React.useCallback((e: { nativeEvent: { text: string } }) => {
		setTitle(e.nativeEvent.text);
	}, []);

	const handleModuleChange = React.useCallback((module: ReferenceModuleListItem) => {
		setActiveModule(module);
	}, []);

	const handleAddDetails = () => {
		if (title.trim().length === 0) return toast.error("Please enter title");
		if (title.trim().length > 100) return toast.info("Title is too long");
		if (!description) return toast.error("Please enter description");
		navigation.push("VideoTypes");
	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.coverContainer}>
					<Image
						source={{
							uri: uploadStore?.coverURL || STATIC_ASSET,
						}}
						style={styles.coverImage}
					/>
				</View>
				<View style={styles.titelInputContainer}>
					<Heading title={"Title"} style={styles.descHeading} />
					<TextInput
						placeholder="Add title for your video"
						placeholderTextColor={"gray"}
						selectionColor={PRIMARY}
						numberOfLines={2}
						textAlignVertical="top"
						value={title}
						style={styles.titleInput}
						onChange={handleOnChange}
					/>
				</View>
				<Pressable
					onPress={() => {
						navigation.push("AddDescription");
					}}
					android_ripple={{
						color: "gray",
					}}
					style={styles.descriptionContainer}
				>
					<Heading title="Add description" style={styles.descHeading} />
					<Icon name="arrowForward" size={20} color="white" />
				</Pressable>
				<CollectModule collectModuleRef={collectModuleRef} />
				<CommentModule sheetRef={referenceModuleRef} activeModule={activeModule.name} />
				<View style={styles.nextButtonContainer}>
					<Button
						title={"Next"}
						py={8}
						width={"30%"}
						textStyle={{
							color: "black",
							fontSize: 16,
							fontWeight: "600",
						}}
						onPress={handleAddDetails}
						bg={"white"}
					/>
				</View>
			</SafeAreaView>
			<CollectModuleSheet collectModuleRef={collectModuleRef} />
			<CommentModuleSheet
				ReferenceModuleList={ReferenceModuleList}
				activeModule={activeModule}
				referenceModuleRef={referenceModuleRef}
				setActiveModule={handleModuleChange}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	coverContainer: {
		height: windowHeight / 4,
		width: "100%",
	},
	coverImage: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},
	titleInput: {
		color: "white",
		fontSize: 20,
		paddingVertical: 8,
		marginVertical: 4,
	},
	descriptionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 16,
		borderTopColor: "gray",
		borderBottomColor: "gray",
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	descHeading: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	nextButtonContainer: {
		padding: 8,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	titelInputContainer: {
		padding: 8,
		marginVertical: 16,
	},
});
