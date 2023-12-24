import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import StackNavigation from "./StackNavigation";
import linkingConfig from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={linkingConfig}>
      <StackNavigation />
    </NavigationContainer>
  );
}
