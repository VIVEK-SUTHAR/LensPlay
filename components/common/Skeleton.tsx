import React from "react";
import { ScrollView } from "react-native";

export default function Skeleton({
  children,
  number,
}: {
  children: React.ReactNode;
  number: number;
}) {
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
    >
      {[...Array(number)].map(() => children)}
    </ScrollView>
  );
}
