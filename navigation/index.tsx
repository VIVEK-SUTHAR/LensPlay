import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import linking from "./LinkingConfiguration";
import StackNavigation from "./StackNavigation";

export default function Navigation() {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigation />
    </NavigationContainer>
  );
}
