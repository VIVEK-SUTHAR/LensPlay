import { useNavigation } from "@react-navigation/native";
import Report from "assets/Icons/Report";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import React from "react";
import { useActivePublication } from "store/Store";

const ReportButton = () => {
	const navigation = useNavigation();
	const { activePublication } = useActivePublication();

	const handleReportPress = () => {
		navigation.navigate("ReportPublication", {
			publicationId: activePublication?.id,
		});
	};

	return (
		<Button
			title={"Report"}
			mx={4}
			px={10}
			width={"auto"}
			bg={dark_primary}
			type={"filled"}
			borderRadius={8}
			icon={<Report height={22} width={22} />}
			textStyle={{ color: "white", marginHorizontal: 2 }}
			onPress={handleReportPress}
		/>
	);
};

export default ReportButton;
