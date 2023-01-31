import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =''
const Filled ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRklEQVR4nO3ZS4iNYRzH8cf9WiRkIdlRQk1EkkKUbEi5FEpZWCHlUkqztERZKGU2WEoNNpYWLjWZJBZsXMrCuC2M63z0mHfqOM2cc973vHNebzPf/fk/39953/N//s9zQhhlhICNOIgpoWxgGfr004UFoUxgp395jw2hxAEiP3EylDjAAJcwMZQ4QOQe5oUSB4i8wcpQ4gCRXuwPJQ4wwHmMCyUOELmDma0WHYs2HEMHHuA1vsnGcyxu1U4bH/s7+fMJW4dLvC151ANjwnDxG6cwJi/xSbiQFG4l1zG1WfmFeKQ4ujArq/xa9CieI1nkV+Bz0eb4Hl3Syi9JRuCi+Yj1aeUn40nR5vpnpeUpX5y/AS4WbY5uzM8iv6kFPb4enZiedSyILatILmN8avkkwN4c393HKT/ThxOZxCu+/RcZhePgdhuHBm4fUk6jvdiVWT5ZcEsG8bdox5xB6jUaoAfrmpJPFryZUnxfrQNIgwFeYlEe8nPxq8Ed8WwjHaKBAPfjuk3LJ4vF6796PMPSFDVrBbjR9IRZtVjsu7W4lbYv1whwLjaMPOXjnP+1hvxVTMhQtzpAPEcczU28YqE1NeQ7s24q2FxRJ35B23OXj+D4EPJPMS1kJF4dJrvqXazKWqcuuDbExtLwD7ZQ8HCQAO2hLOBDlfyrXFvccILZuZw9iwKrq+S/YEYoC9hRFaAjlAkcqAqwLZQJHK6Q/9FM3y8EnK4I0B3KBs5UBLgSygZ2VwT4//7mqUe8uo5nUezJ7Rp7lBHAH4XziO/ZPYRAAAAAAElFTkSuQmCC'
export default function ShareIcon({
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
