import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../../shared/text"
import { viewPresets, textPresets } from "./journal-test-component.presets"
import { JournalTestComponentProps } from "./journal-test-component.props"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function JournalTestComponent(props: JournalTestComponentProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      <Text tx={tx} text={text} style={textStyle} />
    </TouchableOpacity>
  )
}
