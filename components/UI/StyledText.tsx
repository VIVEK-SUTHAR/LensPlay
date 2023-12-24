import * as SplashScreen from "expo-splash-screen";
import React, { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
interface SubHeadingProps {
	title: string | undefined | React.ReactNode;
	style: StyleProp<TextStyle>;
	numberOfLines?: number;
	onPress?: () => void;
}

SplashScreen.preventAutoHideAsync();

const StyledText: FC<SubHeadingProps> = ({ title, style, onPress, ...rest }) => {
	const getFontFamily = (fontWeight: string | undefined) => {
		if (fontWeight === undefined) {
			return "OpenSans_Regular";
		}

		switch (fontWeight) {
			case "700":
				return "OpenSans_Bold";
			case "600":
				return "OpenSans_SemiBold";
			case "500":
				return "OpenSans_Medium";
			default:
				return "OpenSans_Regular";
		}
	};

	return (
		<Text
			style={[
				style,
				{
					fontFamily: getFontFamily(style?.fontWeight),
				},
			]}
			{...rest}
			onPress={onPress}
		>
			{title}
		</Text>
	);
};

export default StyledText;
