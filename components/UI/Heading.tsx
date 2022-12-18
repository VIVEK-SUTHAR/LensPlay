import React, { FC } from 'react';
import { Text } from 'react-native';

interface HeadingProps {
    title: string;
}

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
    return (
        <Text
            style={style}
            {...rest}
        >
            {title}
        </Text>
    );
};

export default Heading;