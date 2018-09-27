import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { DatePickerPresetNames } from "./date-picker.presets"

export interface DatePickerProps extends TouchableOpacityProperties {
  labelTx: string
  date?: string
  time?: string
  type: "date" | "time"
  isOpened: boolean
  onOpenModal: () => void
  onCloseModal: () => void
  onDateChange: (string) => void
  format: string
  setRef: (any) => void
}
