import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Animated, SafeAreaView, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import AllVideos from "../../../components/Profile/AllVideos";
import CollectedVideos from "../../../components/Profile/CollectedVideos";
import MirroredVideos from "../../../components/Profile/MirroredVideos";
import { UnPinSheet } from "../../../components/Profile/PinnedPublication";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import { useProfile } from "../../../store/Store";
import CommonStyles from "../../../styles";
import { RootTabScreenProps } from "../../../types/navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import TabBar from "../../../components/common/TabBar";
import { useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";

export type HeaderConfig = {
  heightExpanded: number;
  heightCollapsed: number;
 };

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const [headerHeight, setHeaderHeight] = React.useState(0);
  const [tabIndex, setTabIndex] = React.useState(0);
	const rendered = headerHeight > 0;

	const { top, bottom } = useSafeAreaInsets();

  const defaultHeaderHeight = top + 80;
  const headerConfig = React.useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight,
    }),
    []
  );
  const { heightCollapsed, heightExpanded } = headerConfig;
  const headerHeightDiff = heightExpanded - heightCollapsed;

  const friendsScrollValue = useSharedValue(0);
 const friendsScrollHandler = useAnimatedScrollHandler(
   (event) => (friendsScrollValue.value = event.contentOffset.y)
 );
 const suggestionsScrollValue = useSharedValue(0);
 const suggestionsScrollHandler = useAnimatedScrollHandler(
   (event) => (suggestionsScrollValue.value = event.contentOffset.y)
 );

 const сurrentScrollValue = useDerivedValue(
  () =>
    tabIndex === 0 ? friendsScrollValue.value : suggestionsScrollValue.value,
  [tabIndex]
);

const translateY = useDerivedValue(
  () => -Math.min(сurrentScrollValue.value, headerHeightDiff)
);


const tabBarAnimatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));
const headerAnimatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));


	const handleHeaderLayout = React.useCallback<NonNullable<ViewProps["onLayout"]>>(
		(event) => setHeaderHeight(event.nativeEvent.layout.height),
		[]
	);
  const contentContainerStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + 80 : 0,
      paddingBottom: bottom,
    }),
    [rendered, headerHeight, bottom]
  );

	const sharedProps = React.useMemo(
		() => ({
			contentContainerStyle,
			scrollIndicatorInsets: { top: headerHeight },
		}),
		[contentContainerStyle]
	);

	const renderAllVideos = React.useCallback(() => <AllVideos {...sharedProps} />, [sharedProps]);

	const renderCollectedVideos = React.useCallback(
		() => <CollectedVideos {...sharedProps} />,
		[sharedProps]
	);

	const renderMirrorVideos = React.useCallback(
		() => <MirroredVideos {...sharedProps} />,
		[sharedProps]
	);

  const tabBarStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
    ],
    [rendered, headerHeight]
  );
  const renderTabBar = React.useCallback<
  (props: MaterialTopTabBarProps) => React.ReactElement
>(
  (props) => (
    <Animated.View style={tabBarStyle}>
      <TabBar onIndexChange={setTabIndex} {...props} />
    </Animated.View>
  ),
  [tabBarStyle, headerHeight, rendered]
);

	const headerContainerStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => [rendered ? styles.headerContainer : undefined, { paddingTop: top }],
    [rendered, headerHeight]
  );

	const { currentProfile } = useProfile();
	return (
		<>
			<View style={[CommonStyles.screenContainer]}>
				<StatusBar style={"auto"} />
				<Animated.View style={headerContainerStyle} onLayout={handleHeaderLayout}>
					<ProfileHeader profileId={currentProfile?.id} />
				</Animated.View>
				<Tabs tabbar={renderTabBar}>
					<Tab.Screen name="All Videos" children={renderAllVideos} />
					<Tab.Screen name="Mirror Videos" children={renderMirrorVideos} />
					<Tab.Screen name="Collected Videos" children={renderCollectedVideos} />
				</Tabs>
				<UnPinSheet sheetRef={sheetRef} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	tabBarContainer: {
		top: 0,
		left: 0,
		right: 0,
		position: "absolute",
		zIndex: 1,
	},
	overlayName: {
		fontSize: 24,
	},
	collapsedOvarlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		justifyContent: "center",
		zIndex: 2,
	},
	headerContainer: {
		top: 0,
		left: 0,
		right: 0,
		position: "absolute",
		zIndex: 1,
	},
});

export default ProfileScreen;
