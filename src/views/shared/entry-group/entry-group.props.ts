import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { EntryGroupPresetNames } from "./entry-group.presets"
import { UserStoreModel } from "src/models/user-store"
import { NavigationStore } from "src/navigation/navigation-store"
import { Entry } from "src/models/entry-store"
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
  entries: (typeof Entry.Type)[]
  userStore?: typeof UserStoreModel.Type
  navigationStore?: NavigationStore
}
