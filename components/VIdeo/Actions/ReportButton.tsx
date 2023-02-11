import React from "react";
import { dark_primary } from "../../../constants/Colors";
import { useToast } from "../../../store/Store";
import { ToastType } from "../../../types/Store";
import ReportIcon from "../../svg/ReportIcon";
import Button from "../../UI/Button";

const ReportButton = () => {
  const toast = useToast();
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
        toast.show("Thanks for reporting", ToastType.INFO, true);
      }}
    />
  );
};

export default ReportButton;
