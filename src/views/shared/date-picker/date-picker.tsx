import * as React from "react"
import { View } from "react-native"
import ThirdPartyDatePicker from "react-native-datepicker"

import { Text } from "src/views/shared/text"
import { viewPresets, textPresets } from "./date-picker.presets"
import { DatePickerProps } from "./date-picker.props"
import { INPUT, INPUT_FOCUSED, INPUT_TEXT } from "src/views/shared/text-field"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function DatePicker(props: DatePickerProps) {
  // grab the props
  const {
    setRef,
    labelTx,
    type = "date",
    date = null,
    time = null,
    format,
    style: styleOverride,
    isOpened,
    onOpenModal,
    onCloseModal,
    onDateChange,
    ...rest
  } = props

  // assemble the style
  // const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  // const textPresetToUse = textPresets[preset] || textPresets.primary

  // const viewStyle = { ...viewPresetToUse, ...styleOverride }
  // const textStyle = textPresetToUse

  return (
    <View style={{ paddingVertical: 12 }}>
      <Text preset="fieldLabel" tx={labelTx} />
      <ThirdPartyDatePicker
        ref={setRef}
        style={{ width: "100%" }}
        date={type === "date" ? date : time}
        mode={type}
        format={format}
        confirmBtnText="Done"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            ...INPUT,
            marginTop: 18,
            ...(isOpened ? INPUT_FOCUSED : {}),
          },
          dateText: {
            ...INPUT_TEXT,
          },
        }}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        onDateChange={onDateChange}
        showIcon={false}
      />
    </View>
  )
}
