import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const NewPaginator = ({data,scrollX}) => {
  const width=Dimensions.get("screen").width
	return (
		<View style={{ flexDirection: "row" }}>
			{data.map((_,i) => {
        const inputRange=[(i-1)*width,i*width,(i+1)*width];
        const dotWidth=scrollX.interpolate({
          inputRange,
          outputRange:[6,6,6],
          extrapolate:'clamp',
        })
        const opacity=scrollX.interpolate({
          inputRange,outputRange:[0.3,1,0.3],
          extrapolate:'clamp'
        })
				return <Animated.View style={[styles.dot,{width:dotWidth,opacity}]} key={i.toString()} />;
			})}
		</View>
	);
};

export default NewPaginator;

const styles = StyleSheet.create({
	dot: {
		height: 6,
		borderRadius: 10,
		backgroundColor: "#fff",
		marginHorizontal: 4,
	},
});
