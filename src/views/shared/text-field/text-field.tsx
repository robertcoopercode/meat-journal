import * as React from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../../theme"
import { translate } from "../../../i18n"
import { Text } from "../text"
import { TextFieldProps } from "./text-field.props"

interface TextFieldState {
  isFocused: boolean
}

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// the base styling for the TextInput
export const INPUT: ViewStyle = {
  minHeight: 44,
  backgroundColor: color.palette.offWhite,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: color.palette.superSilver,
  paddingHorizontal: spacing[2],
  marginTop: spacing[2],
  alignItems: "flex-start",
}

export const INPUT_TEXT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 16,
}

export const INPUT_FOCUSED: TextStyle = {
  borderColor: color.palette.paleFlower,
  backgroundColor: color.palette.harbourAfternoon,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

/**
 * A component which has a label and an input together.
 */
export class TextField extends React.Component<TextFieldProps, TextFieldState> {
  state = {
    isFocused: false,
  }
  handleFocus = () => {
    this.setState({ isFocused: true })
  }
  handleBlur = () => {
    this.setState({ isFocused: false })
  }
  render() {
    const {
      placeholderTx,
      placeholder,
      labelTx,
      label,
      setRef = null,
      onSubmitEditing = null,
      preset = "default",
      style: styleOverride,
      inputStyle: inputStyleOverride,
      ...rest
    } = this.props
    const containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset], ...styleOverride }
    const inputStyle: TextStyle = {
      ...INPUT,
      ...INPUT_TEXT,
      ...(this.state.isFocused ? INPUT_FOCUSED : {}),
      ...inputStyleOverride,
    }
    const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

    return (
      <View style={containerStyle}>
        <Text preset="fieldLabel" tx={labelTx} text={label} />
        <TextInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          ref={setRef}
          returnKeyType={"done"}
          onSubmitEditing={onSubmitEditing}
          {...rest}
          style={inputStyle}
        />
      </View>
    )
  }
}
