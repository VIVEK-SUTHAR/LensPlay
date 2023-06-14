import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const NewPaginator = ({data,scrollX}) => {
  const width=Dimensions.get("screen").width
	return (
		<View style={{ flexDirection: "row", height: 64 }}>
			{data.map((_,i) => {
        const inputRange=[(i-1)*width,i*width,(i+1)*width];
        const dotWidth=scrollX.interpolate({
          inputRange,
          outputRange:[10,20,10],
          extrapolate:'clamp',
        })
				return <Animated.View style={[styles.dot,{width:dotWidth}]} key={i.toString()} />;
			})}
		</View>
	);
};

export default NewPaginator;

const styles = StyleSheet.create({
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: "#2D3436",
		marginHorizontal: 8,
	},
});
