import * as React from "react"
import { inject, observer } from "mobx-react"
import { View, ViewStyle, TouchableOpacity, TextStyle, Linking } from "react-native"

import { Text } from "src/views/shared/text"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"
import { translate } from "src/i18n"
import { UserStoreModel } from "src/models/user-store"
import { Button } from "src/views/shared/button"
import { Icon } from "src/views/shared/icon"

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

const OPTION: TextStyle = {
  fontSize: 20,
  margin: spacing[3],
  color: color.palette.lightGrey,
}

const OPTION_SELECTED: TextStyle = {
  color: color.primary,
}

const SETTINGS_SAVE: ViewStyle = {
  marginTop: spacing[6],
}

const ROW_CHEVRON: ViewStyle = { transform: [{ rotateZ: "180deg" }] }

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
  userStore: typeof UserStoreModel.Type
}

interface SettingsScreenState {}

// @inject("navigationStore")
@inject("userStore")
@observer
export class Settings extends React.Component<SettingsScreenProps, SettingsScreenState> {
  state = {
    displaySelectWeightUnits: false,
  }
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
  handleWeightUnitSelection = units => {
    this.props.userStore.updateWeightUnits(units)
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
        <Icon icon="smallChevron" style={ROW_CHEVRON} />
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
            handler: () => this.setState({ displaySelectWeightUnits: true }),
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
            handler: () => this.props.navigation.navigate("privacyPolicy"),
          })}
          {/* {this.renderSettingsRow({
            label: translate("settings.termsOfService"),
          })} */}
          {this.renderSettingsRow({
            label: translate("settings.contactUs"),
            handler: this.handleOpenEmail,
          })}
        </View>
        {this.state.displaySelectWeightUnits && (
          <View
            style={{
              position: "absolute",
              backgroundColor: color.background,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => this.handleWeightUnitSelection("lbs")}>
              <Text
                style={{
                  ...OPTION,
                  ...(this.props.userStore.weightUnits === "lbs" ? OPTION_SELECTED : {}),
                }}
              >
                lbs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleWeightUnitSelection("kgs")}>
              <Text
                style={{
                  ...OPTION,
                  ...(this.props.userStore.weightUnits === "kgs" ? OPTION_SELECTED : {}),
                }}
              >
                kgs
              </Text>
            </TouchableOpacity>
            <Button
              onPress={() => this.setState({ displaySelectWeightUnits: false })}
              style={SETTINGS_SAVE}
              tx="settings.done"
            />
          </View>
        )}
      </Screen>
    )
  }
}
