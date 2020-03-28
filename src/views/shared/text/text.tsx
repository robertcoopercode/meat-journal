import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    text,
    children,
    style: styleOverride,
    uppercase = false,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx)
  let content = i18nText || text || children

  if (uppercase) {
    content = content.toUpperCase()
  }

  // assemble the style
  const presetToUse = presets[preset] || presets.default
  const style = { ...presetToUse, ...styleOverride }

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
