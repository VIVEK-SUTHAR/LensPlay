import React, { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface SubHeadingProps {
    title: string;
    style: StyleProp<TextStyle>;
}

const SubHeading: FC<SubHeadingProps> = ({ title, style, ...rest }) => {
    return (
        <Text style={style} {...rest}>
            {title}
        </Text>
    );
};

export default SubHeading;
