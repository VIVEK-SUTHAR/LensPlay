import {
	View,
	type StyleProp,
	type ViewProps,
	type TextStyle,
	ActivityIndicator,
	type ColorValue,
	Pressable,
	Animated,
} from "react-native";
import React from "react";
import StyledText from "./StyledText";
import { useThemeStore } from "../../store/Store";
import Ripple from "./Ripple";

interface ButtonProps {
	title: string | number;
	type?: "outline" | "filled";
	isLoading?: boolean;
	width?: number | string;
	mx?: number;
	my?: number;
	px?: number;
	py?: number;
	mt?: number;
	mb?: number;
	bg?: ColorValue;
	ripple_color?: ColorValue;
	style?: StyleProp<ViewProps>;
	textStyle?: StyleProp<TextStyle>;
	borderColor?: ColorValue;
	borderRadius?: number;
	onPress?: () => void | Promise<void>;
	icon?: any;
	iconPosition?: "left" | "right";
	disabled?: boolean;
	bytes?: boolean;
	animated?: boolean;
	scale?: number;
	isDynamic?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
	const theme = useThemeStore();
	const {
		title,
		type = "filled",
		width = "100%",
		isLoading = false,
		style,
		mx = 0,
		my = 0,
		px = 4,
		py = 8,
		mt = 0,
		mb = 0,
		textStyle,
		borderRadius = 50,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ripple_color = "rgba(0,0,0,0.2)",
		bg = theme.PRIMARY.toString(),
		onPress,
		borderColor = "white",
		icon,
		iconPosition = "left",
		disabled,
		bytes = false,
		animated = false,
		scale = 0.9,
		isDynamic = false,
		...rest
	} = props;

	const newStyle = Object.assign({}, textStyle, {
		textAlign: "center",
	});

	const scaleRef = React.useRef(new Animated.Value(1)).current;

	return (
		<Pressable
			style={[
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				style,
				{
					width,
				},
			]}
			{...rest}
			onPressIn={(e) => {
				e.preventDefault();
				if (!animated) return;
				Animated.timing(scaleRef, {
					toValue: scale,
					duration: 50,
					useNativeDriver: true,
				}).start();
			}}
			onPressOut={(e) => {
				e.preventDefault();
				if (!animated) return;
				Animated.timing(scaleRef, {
					toValue: 1,
					duration: 50,
					useNativeDriver: true,
				}).start();
			}}
		>
			<Ripple
				rippleColor={ripple_color}
				onTap={
					onPress != null && !(disabled ?? false) && !isLoading
						? onPress
						: () => {
							console.log("[Error]:onPress handler is missing or disabled button");
						  }
				}
			>
				<Animated.View
					style={{
						display: "flex",
						flexDirection: bytes ? "column" : "row",
						alignItems: "center",
						borderRadius,
						justifyContent: textStyle !== null ? "center" : "space-between",
						backgroundColor: disabled === true ? "#c0c0c0" : type === "filled" ? bg : "transparent",
						borderColor: type === "outline" ? borderColor : "transparent",
						borderWidth: type === "outline" ? 1 : 0,
						paddingVertical: py,
						paddingHorizontal: px,
						marginHorizontal: mx,
						marginVertical: my,
						marginTop: mt,
						marginBottom: mb,
						transform: [
							{
								scale: scaleRef,
							},
						],
					}}
				>
					{isLoading ? (
						<ActivityIndicator size={"small"} animating={true} color={"black"} />
					) : isDynamic ? (
						<>
							<View style={{ marginRight: 8 }}>
								<ActivityIndicator size={"small"} animating={true} color={"black"} />
							</View>
							<StyledText title={title} style={newStyle} />
						</>
					) : (
						<>
							{Boolean(icon) && iconPosition === "left" ? (
								<View
									style={{
										marginRight: bytes || title?.toString().length === 0 ? 0 : 4,
									}}
								>
									{icon}
								</View>
							) : (
								<></>
							)}
							<StyledText title={title} style={newStyle} />
							{Boolean(icon) && iconPosition === "right" ? (
								<View
									style={{
										marginLeft: 8,
									}}
								>
									{icon}
								</View>
							) : (
								<></>
							)}
						</>
					)}
				</Animated.View>
			</Ripple>
		</Pressable>
	);
};

export default React.memo(Button);
