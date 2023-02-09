import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Filled =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACXUlEQVR4nO2bzU7bQBDHf7Yi0cIDkNeAl2ir8nEFlfAMNCHlmiMXPi8IEL1Upap4jZ5Rb5X6wQnanihSuQettJFGKwfHweya9fylOSVrj/+7858ZawzlIgVawIZHewu8AWaBhMBYBfoB7QrYAaZDEdAKTMDA/gPrIU5ECqwAmx5tG/gE/Mkg4hR4Rk2QAi+A8wwSgmuDTzSAXYeEDjXEnqMJTWqGhhMORisehClgEWh7zvPtB+T5l4KAy3G1IAG6wE0F0ttvm+ebBYTxr1hvSCyE1Kpov2J2C7wbcUc/i3VLRQnoOjf+CRx6yu9fxH2/2913iTgDJnOeYUv834RToZi/EYuPgQn8oSfu3bOn8RXwNYOEpMB1RsaCWPjD88Pf57hR932HhO4Y18nFulh4gH/kOb7vaEKzbAJ64y4sCR1xf6M7LhpOOGzHRsC8I75ZIfh6hDz/ZAmYBP4JH04ySEidLnAmJgLcMDD2y4aDrBS/id+XiYyABPhYoEDqxEbAgIS2Ew7DzLyMiY4AqQnz9iVoVuW4YjUhWgLGhRKAngCiDoHUvo5v1VUDVoWfhoTaEdDL8VMJQE8AGgKoBqAiiGYBNA1SYn6tCrQOQAshtBJES2G0F0CbIbQbpHiaHAqtA9BCCK0E0VIY7QXQZgjtBqkutBtEu0G0G0S7QYZlq1bOBEn0pfDgO6ZhEyTRE/Bok5pVwZHw08wPeZ3UDA3zSdyF8NNMjnqd1Az98O+Ff9fA8xCTmhsB7MjZeWNrVGBSsx/IPjzmx5FJgUlN33Ztdz6pwqTmpkczPsyVEfN3Eqg01fGyEwwAAAAASUVORK5CYII";

export default function CopyIcon({ width, height }: IconProps) {
  return (
    <Image
      source={{
        uri: Filled,
      }}
      style={{ height: height, width: width }}
    />
  );
}
