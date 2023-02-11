import { useNavigation } from "@react-navigation/native";
import React from "react";
import { dark_primary } from "../../../constants/Colors";
import ReportIcon from "../../svg/ReportIcon";
import Button from "../../UI/Button";

type ReportButtonProps = {
  publicationId: string;
};

const ReportButton = ({ publicationId }: ReportButtonProps) => {
  const navigation = useNavigation();

  return (
    <Button
      title={"Report"}
      mx={4}
      px={10}
      width={"auto"}
      bg={dark_primary}
      type={"filled"}
      borderRadius={8}
      icon={<ReportIcon height={20} width={20} />}
      textStyle={{ color: "white", marginHorizontal: 4 }}
      onPress={() => {
        navigation.navigate("ReportPublication", {
          publicationId: publicationId,
        });
      }}
    />
  );
};

export default ReportButton;
