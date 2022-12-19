import React, { FC } from "react";
import { StyleProp, StyleSheetProperties, Text, TextStyle } from "react-native";

interface HeadingProps {
  title: string;
  style: StyleProp<TextStyle>;
}

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
  return (
    <Text style={style} {...rest}>
      {title}
    </Text>
  );
};

export default Heading;
