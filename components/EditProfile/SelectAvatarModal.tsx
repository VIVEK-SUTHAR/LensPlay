import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { white } from "constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { MediaTypeOptions } from "expo-image-picker";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Logger from "utils/logger";

type OptionProps = {
	label: string;
	icon: JSX.Element;
	onPress: () => void;
};

const SelectAvatarModal = React.forwardRef(({}, ref: React.Ref<BottomSheetMethods>) => {
	const navigation = useNavigation();

	const selectImageFromGallery = React.useCallback(() => {
		ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			mediaTypes: MediaTypeOptions.Images,
			quality: 1,
		})
			.then((asset) => {
				if (!asset.canceled) {
					Logger.Success("Got imagg", asset.assets[0].uri);
				}
			})
			.catch((reason) => {
				Logger.Error("Error in selcting imafe from Gallery", reason);
			});
	}, []);

	const SelectAvatarOptions: OptionProps[] = [
		{
			icon: <Icon name="images" size={24} />,
			label: "Pick one of your NFT",
			onPress: () => navigation.navigate("PickNFT"),
		},
		{
			icon: <Icon name="more" size={24} />,
			label: "Select From Gallery",
			onPress: () => selectImageFromGallery(),
		},
		{
			icon: <Icon name="camera" size={24} />,
			label: "Capture from Camera",
			onPress: () => navigation.navigate("Scanner"),
		},
	];

	const renderItem = React.useCallback(({ item }: { item: OptionProps }) => {
		return <Option icon={item.icon} label={item.label} onPress={item.onPress} />;
	}, []);

	return (
		<Sheet
			snapPoints={["50%"]}
			ref={ref}
			detached={true}
			bottomInset={Dimensions.get("screen").height / 2}
		>
			<BottomSheetFlatList data={SelectAvatarOptions} renderItem={renderItem} />
		</Sheet>
	);
});

const Option: React.FC<OptionProps> = React.memo((item) => {
	return (
		<Pressable onPress={item.onPress}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				{item.icon}
				<StyledText title={item.label} style={styles.itemText} />
			</View>
		</Pressable>
	);
});

export default SelectAvatarModal;

const styles = StyleSheet.create({
	itemText: {
		fontSize: 20,
		color: white[100],
		fontWeight: "500",
	},
});
