import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import linkingConfig from "./LinkingConfiguration";
import StackNavigation from "./StackNavigation";

export default function Navigation() {
  return (
    <NavigationContainer linking={linkingConfig}>
      <StackNavigation />
    </NavigationContainer>
  );
}
