import React from "react";

export default function Skeleton({
  children,
  number,
}: {
  children: React.ReactNode;
  number: number;
}) {
  return <>{[...Array(number)].map(() => children)}</>;
}
