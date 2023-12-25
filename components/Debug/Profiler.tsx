import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { dark_primary } from "constants/Colors";
import Icon from "components/Icon";
import { startProfiling, stopProfiling } from "react-native-release-profiler";
import { SettingsItem } from "screens/Header/Settings/Settings";

type Props = {};

const Profiler = (props: Props) => {
	const [isProfiling, setIsProfiling] = useState(true);
	const handleProfiling = () => {
		stopProfiling(true).then((res) => {
			console.log(res);
		})
		setIsProfiling((prev) => !prev);
	};
	return (
		<View
			style={{
				backgroundColor: dark_primary,
				marginTop: 16,
				borderRadius: 12,
			}}
		>
			<SettingsItem
				icon={<Icon name="bug" size={24} />}
				label={`${isProfiling ? "Stop Profiling" : "Start Profiling"}`}
				onPress={handleProfiling}
			/>
		</View>
	);
};

export default Profiler;

