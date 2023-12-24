import React, { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface HeadingProps {
	title: string | React.ReactNode;
	style: StyleProp<TextStyle>;
	numberOfLines?: number;
}

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
	const getFontFamily = (fontWeight: string | undefined) => {
		if (fontWeight === undefined) {
			return "PlusJakartaSans_Regular";
		}

		switch (fontWeight) {
			case "700":
				return "PlusJakartaSans_Bold";
			case "600":
				return "PlusJakartaSans_SemiBold";
			case "500":
				return "PlusJakartaSans_Medium";
			default:
				return "PlusJakartaSans_Regular";
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
		>
			{title}
		</Text>
	);
};

export default Heading;
