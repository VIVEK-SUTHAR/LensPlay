import React, { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface HeadingProps {
  title: string | React.ReactNode;
  style: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
  return (
    <Text style={style} {...rest}>
      {title}
    </Text>
  );
};

export default Heading;
