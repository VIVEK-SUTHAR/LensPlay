import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import React from "react";

type ReportButtonProps = {
  publicationId: string;
};

const ReportButton:React.FC<ReportButtonProps> = ({ publicationId }: ReportButtonProps) => {
  const navigation = useNavigation();

  const handleReportPress = () => {
		navigation.navigate("ReportPublication", {
			publicationId: publicationId,
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
      icon={<Icon name="report" size={20} />}
      textStyle={{ color: "white", marginHorizontal: 4 }}
      onPress={handleReportPress}
    />
  );
};

export default ReportButton;
