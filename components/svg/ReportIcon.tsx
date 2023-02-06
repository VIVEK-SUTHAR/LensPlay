import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =''
const Filled ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO3Zu0oDQRSA4TGx8oK3WhBBEHwDCwuLvISxUQvjYxgLtVAfQy2MjTa2gqIiKOQBBAmIpPQO/jIQYQmbuNmZs7NZ53+AOXywCbtnlPL5fL6wgB7gErlugJySDlhEvqI0og94SADyCAxIQjZIrrIUYhx4SRDyBkxIQA5JvgPbiFngGzfN2ULkgGvcdQvkbUBWcN+yKWIQqMWdHnJe3J6AIRPItsFwmxDdVlzEJPBOeiAfwFQcyLHhYNsQXaVTxDwWEoDoClEReeCe9EKqQG8UyJqlgVIQXekvxAjwTPohdWCsHWTP4jBJiG63FWIa+KR7IF/ATBjk1PIgaYjuLCuQk+w+Wjr9A7I5STVl82xgp/n84KBhm3+/gtWB0ZaQBqZE+lttiwi8otyR3qqRXlFsvjQKVYiECGAqphNDzjTtqCNEpj6sdPrzMkWQTaX++/JBp1cxuG9JWVrQXTle0OWMIZlZmf6mF8oOEPsqA9cKryLXCg1MOUHIugjCwdVbvxikgSkmAFkQRQSup88FERd6hjjE5/OpruwHBi8QIci7te0AAAAASUVORK5CYII='
export default function ReportIcon({
  width,
  height,
  filled = true,
}: IconProps) {
  return (
    <Image
      source={{ uri: filled ? Filled : Outline }}
      style={{ height: height, width: width }}
    />
  );
}
