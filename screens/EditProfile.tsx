import React from "react";
import EditAvatar from "../components/EditChannel/EditAvatar";
import EditDetail from "../components/EditChannel/EditDetail";
import Heading from "../components/UI/Heading";
import Tabs, { Tab } from "../components/UI/Tabs";
import { RootStackScreenProps } from "../types/navigation/types";

const EditProfile = ({ navigation }: RootStackScreenProps<"EditProfile">) => {
  return (
    <Tabs>
      <Tab.Screen name="Avatar" component={EditAvatar} />
      <Tab.Screen name="Details" component={EditDetail} />
    </Tabs>
  );
};

export default EditProfile;
