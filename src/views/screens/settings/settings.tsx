import * as React from "react"
import { inject, observer } from "mobx-react"
import { View, ViewStyle, TouchableOpacity, TextStyle, Linking, Picker } from "react-native"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"

import { Text } from "src/views/shared/text"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"
import { translate } from "src/i18n"
import { UserStoreModel } from "src/models/user-store"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
}

const SETTINGS_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing[5],
  alignItems: "center",
  borderColor: color.border,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  marginTop: -1,
}

const SETTINGS_ROW_LARGE: ViewStyle = {
  height: 60,
}

const SETTINGS_ROW_SMALL: ViewStyle = {
  height: 40,
}

const FIRST_SETTINGS_ROW: ViewStyle = {
  marginTop: 0,
}

const USER_SETTINGS: ViewStyle = {
  marginTop: spacing[7],
}

const BORING_SETTINGS: ViewStyle = {
  marginTop: spacing[7],
}

const SETTINGS_DETAILS: ViewStyle = {}

const SETTINGS_DETAILS_VALUE: TextStyle = {
  marginTop: spacing[1],
  fontSize: 12,
}

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
  userStore: typeof UserStoreModel.Type
}

interface SettingsScreenState {}

@inject("userStore")
@observer
export class Settings extends React.Component<SettingsScreenProps, SettingsScreenState> {
  handleOpenEmail = () => {
    Linking.canOpenURL("mailto:hi@robertcooper.me")
      .then(supported => {
        if (!supported) {
          console.tron.log("Can't handle url: " + "mailto:hi@robertcooper.me")
        } else {
          return Linking.openURL("mailto:hi@robertcooper.me?subject=MeatJournalAppInquiry")
        }
      })
      .catch(err => console.tron.error("An error occurred", err))
  }
  handleWeightUnitSelection = () => {
    return (
      <Picker
        selectedValue={this.props.userStore.weightUnits}
        style={{ height: 50, width: 100 }}
        onValueChange={itemValue => this.props.userStore.updateWeightUnits(itemValue)}
      >
        <Picker.Item label="lbs" value="lbs" />
        <Picker.Item label="kgs" value="kgs" />
      </Picker>
    )
  }
  renderSettingsRow = ({
    label,
    value = null,
    rowStyle = {},
    handler = null,
  }: {
    label: string
    value?: string
    rowStyle?: ViewStyle
    handler?: () => void
  }) => (
    <TouchableOpacity onPress={handler}>
      <View
        style={{
          ...SETTINGS_ROW,
          ...(value ? SETTINGS_ROW_LARGE : SETTINGS_ROW_SMALL),
          ...rowStyle,
        }}
      >
        <View style={SETTINGS_DETAILS}>
          <Text preset="fieldLabel">{label}</Text>
          {value && <Text style={SETTINGS_DETAILS_VALUE}>{value}</Text>}
        </View>
        <FontAwesomeIcon name="chevron-right" size={15} color={color.primary} />
      </View>
    </TouchableOpacity>
  )
  render() {
    return (
      <Screen style={ROOT} preset="fixedStack">
        <View style={USER_SETTINGS}>
          {this.renderSettingsRow({
            label: translate("settings.weight"),
            value: this.props.userStore.weightUnits,
            rowStyle: FIRST_SETTINGS_ROW,
            handler: this.handleWeightUnitSelection,
          })}
          {/* {this.renderSettingsRow({
            label: translate("settings.reminder"),
            value: "9:00 PM",
          })}
          {this.renderSettingsRow({
            label: translate("settings.theme"),
            value: translate("settings.light"),
          })} */}
        </View>
        <View style={BORING_SETTINGS}>
          {this.renderSettingsRow({
            label: translate("settings.privacyPolicy"),
          })}
          {this.renderSettingsRow({
            label: translate("settings.termsOfService"),
          })}
          {this.renderSettingsRow({
            label: translate("settings.contactUs"),
            handler: this.handleOpenEmail,
          })}
        </View>
        <Picker
          selectedValue={this.props.userStore.weightUnits}
          style={{ height: 50, width: 100 }}
          onValueChange={itemValue => this.props.userStore.updateWeightUnits(itemValue)}
          mode={"dropdown"}
        >
          <Picker.Item label="lbs" value="lbs" />
          <Picker.Item label="kgs" value="kgs" />
        </Picker>
      </Screen>
    )
  }
}
