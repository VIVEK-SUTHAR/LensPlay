import {
	ActivityIndicator,
	LayoutChangeEvent,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import Animated, {
	Extrapolation,
	SharedValue,
	event,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Transaction from "components/tip/Transaction";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackScreenProps } from "customTypes/navigation";
import TipHeader from "components/tip/TipHeader";
import { StatusBar } from "expo-status-bar";
import { useAuthStore, useThemeStore } from "store/Store";
import StyledText from "components/UI/StyledText";
import { Image } from "expo-image";
import PosterImage from "components/tip/PosterImage";
import useFetchSupport from "hooks/useFetchSupport";
import ErrorMesasge from "components/common/ErrorMesasge";
import { ErrorMessage } from "components/VideoPlayer/utils";
import { Tip } from "customTypes/Store";
import { white } from "constants/Colors";
import NotFound from "components/common/NotFound";
import Logger from "utils/logger";
import { useUserProfilesQuery } from "customTypes/generated";
import { useSupportStore } from "store/SupportStore";

type Props = {};
const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const TipInfo: React.FC<RootStackScreenProps<"TipInfo">> = ({ route }) => {
	const scrollY = useSharedValue<number>(0);
	const navigation = useNavigation();
	const inset = useSafeAreaInsets();
	const posterSize = Dimensions.get("screen").height / 5;
	const theme = useThemeStore();
	const [refreshing, setRefreshing] = React.useState<boolean>(false);
	const { loading, error, refetch } = useFetchSupport();
	const { tips, donorProfiles } = useSupportStore();
	const { accessToken } = useAuthStore();
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});

	const renderItem = ({ item, index }: { item: Tip; index: number }) => {
		if (donorProfiles) {
			return <Transaction tip={item} donorProfile={donorProfiles[index]} />;
		} else {
			return <></>;
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	if (loading)
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<ActivityIndicator size={"small"} color={theme.PRIMARY} />
			</SafeAreaView>
		);

	if (error)
		return (
			<ErrorMesasge
				message="Something went wrong"
				withImage={true}
				retryMethod={onRefresh}
				withButton={true}
			/>
		);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<TipHeader scrollY={scrollY} />
			<PosterImage scrollY={scrollY} />
			<Animated.FlatList
				data={tips}
				renderItem={renderItem}
				refreshControl={_RefreshControl}
				contentContainerStyle={{
					paddingTop: posterSize + 24,
					// gap: 4,
					paddingHorizontal: 4,
					paddingBottom: 48,
				}}
				onScroll={scrollHandler}
				ListEmptyComponent={() => {
					return (
						<View
							style={{
								paddingTop: 24,
							}}
						>
							<NotFound
								message="looks like there haven't been any donations to your account yet"
								height={240}
								width={240}
							/>
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default TipInfo;

const styles = StyleSheet.create({
	Linear: {
		position: "absolute",
	},
	imageContainer: {
		width: "100%",
		height: "100%",
	},
});
