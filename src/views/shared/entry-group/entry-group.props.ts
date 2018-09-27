import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { EntryGroupPresetNames } from "./entry-group.presets"

export interface EntryGroupProps extends TouchableOpacityProperties {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * One of the different types of text presets.
   */
  preset?: EntryGroupPresetNames

  date: string
  entries: {
    animalType: string
    name: string
    weight: string
    time: string
  }[]
}
