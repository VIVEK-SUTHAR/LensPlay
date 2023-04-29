import React from "react";
import EditAvatar from "../../../components/EditChannel/EditAvatar";
import EditDetail from "../../../components/EditChannel/EditDetail";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import { RootStackScreenProps } from "../../../types/navigation/types";
import { SafeAreaView } from "react-native";

const EditProfile = ({ navigation }: RootStackScreenProps<"EditProfile">) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Tabs>
        <Tab.Screen name="Avatar" component={EditAvatar} />
        <Tab.Screen name="Details" component={EditDetail} />
      </Tabs>
    </SafeAreaView>
  );
};

export default EditProfile;
