import React, { useEffect, useState } from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, primary } from "constants/Colors";
import { Platform, Pressable, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Calendar from "assets/Icons/Calendar";

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
			{calendarClick && (
				<DateTimePicker
					testID="dateTimePicker"
					value={collectModule?.timeLimit ? collectModule?.timeLimit : new Date()}
					mode={"date"}
					onChange={onChange}
					minimumDate={new Date()}
				/>
			)}

			<View
				style={{
					backgroundColor: dark_primary,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
					borderTopRightRadius: 8,
					borderBottomRightRadius: 8,
				}}
			>
				<Calendar height={20} width={20} />
			</View>
			<View
				style={{
					flex: 0.008,
					backgroundColor: black[800],
					marginHorizontal: 12,
				}}
			/>
			<StyledText
				title={collectModule?.timeLimit ? formatString(collectModule?.timeLimit) : "Select Date"}
				style={{
					color: "white",
					flex: 0.9,
					fontSize: 16,
					alignSelf: "center",
				}}
			/>
		</Pressable>
	);
}

export default React.memo(TimedFeeCollect);
