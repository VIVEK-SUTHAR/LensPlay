import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Calendar from "assets/Icons/Calendar";
import StyledText from "components/UI/StyledText";
import { black, dark_primary } from "constants/Colors";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";

const TimedFeeCollect = () => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<View>
			<CollectToggle
				title={"Limit Collect Time"}
				subTitle={"By enabling this, You will limit collects till a specified date"}
				switchValue={collectModule.isTimedCollect!}
				onPress={() => {
					if (!collectModule.isTimedCollect) {
						setCollectModule({
							...collectModule,
							type: "simpleCollectModule",
							isTimedCollect: true,
						});
					} else {
						if (!collectModule.isPaidCollect) {
							if (collectModule.isLimitedCollect) {
								setCollectModule({
									...collectModule,
									type: "simpleCollectModule",
									isTimedCollect: false,
								});
							} else {
								setCollectModule({
									...collectModule,
									type: "freeCollectModule",
									isTimedCollect: false,
								});
							}
						} else {
							setCollectModule({
								...collectModule,
								type: "feeCollectModule",
								isTimedCollect: false,
							});
						}
					}
				}}
			/>
			{collectModule?.isTimedCollect && <SelectTime />}
		</View>
	);
};

function SelectTime() {
	const { collectModule, setCollectModule } = useUploadStore();
	const [calendarClick, setCalendarClick] = React.useState(false);

	const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
		setCalendarClick(false);

		setCollectModule({
			...collectModule,
			timeLimit: selectedDate,
		});
	};

	const formatString = (date: Date) => {
		const Date = date?.getDate();
		const Month = date?.getMonth();
		const Year = date?.getFullYear();

		return `${Date}/${Month}/${Year}`;
	};

	return (
		<Pressable
			style={{
				backgroundColor: dark_primary,
				paddingHorizontal: 16,
				height: 46,
				borderRadius: 8,
				flexDirection: "row",
				marginVertical: 8,
			}}
			onPress={() => {
				setCalendarClick(true);
			}}
		>
			<View
				style={{
					backgroundColor: dark_primary,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
					borderRightWidth: 2,
					borderColor: black[700],
					paddingRight: 16,
				}}
			>
				<Calendar height={20} width={20} />
			</View>
			{Platform.OS === "android" && (
				<StyledText
					title={collectModule?.timeLimit ? formatString(collectModule?.timeLimit) : "Select Date"}
					style={{
						color: "white",
						flex: 0.9,
						fontSize: 16,
						alignSelf: "center",
						paddingLeft: 16,
					}}
				/>
			)}
			{Platform.OS === "ios" ? (
				<DateTimePicker
					testID="dateTimePicker"
					value={collectModule?.timeLimit ? collectModule?.timeLimit : new Date()}
					mode={"date"}
					onChange={onChange}
					minimumDate={new Date()}
				/>
			) : (
				<>
					{calendarClick && (
						<DateTimePicker
							testID="dateTimePicker"
							value={collectModule?.timeLimit ? collectModule?.timeLimit : new Date()}
							mode={"date"}
							onChange={onChange}
							minimumDate={new Date()}
						/>
					)}
				</>
			)}
		</Pressable>
	);
}

export default React.memo(TimedFeeCollect);
