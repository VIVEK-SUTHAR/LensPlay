import React from "react";
import { ScrollView } from "react-native";

export default function Skeleton({
  children,
  number,
  horizontal = false,
}: {
  children: React.ReactNode;
  number: number;
  horizontal?: boolean;
}) {
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
      horizontal={horizontal}
    >
      {[...Array(number)].map(() => children)}
    </ScrollView>
  );
}
