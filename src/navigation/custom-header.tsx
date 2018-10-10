import * as React from "react"
import { StatusBar, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { NavigationScreenProps, SafeAreaView } from "react-navigation"
import { Icon } from "src/views/shared/icon"

import { Text } from "src/views/shared/text"
import { color, spacing } from "src/theme"

const HEADER = {
  backgroundColor: color.primary,
}

const MENU_ITEMS = {
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-around",
  height: 60,
}

export const MENU_ITEM = {
  height: 35,
  borderBottomWidth: 2,
  borderBottomColor: color.transparent,
}

export const ACTIVE_MENU_ITEM = {
  borderBottomColor: color.secondary,
}

export const MENU_ITEM_TEXT = {
  color: "#fff",
}

export const ACTIVE_MENU_ITEM_TEXT = {
  color: color.secondary,
}

interface HeaderProps {
  style?: ViewStyle
  renderMenuItems: () => React.ReactNode
}

export function Header(props: HeaderProps) {
  return (
    <SafeAreaView style={[HEADER, props.style ? props.style : {}]}>
      <StatusBar barStyle="light-content" />
      <View style={MENU_ITEMS}>{props.renderMenuItems()}</View>
    </SafeAreaView>
  )
}

interface HeaderMenuItemProps {
  containerStyle: ViewStyle
  textStyle: TextStyle
  onPress: () => void
  text: string
}

export function HeaderMenuItem(props: HeaderMenuItemProps) {
  return (
    <TouchableOpacity style={props.containerStyle} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  )
}

interface SreenHeaderProps extends NavigationScreenProps<{}> {
  scene: any
}

export function LogbookHeader(props: SreenHeaderProps) {
  return (
    <Header
      renderMenuItems={() => (
        <React.Fragment>
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(props.scene.route.routeName === "logbookList" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "logbookList" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => props.navigation.navigate("logbookList")}
            text="List"
          />
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(props.scene.route.routeName === "logbookCalendar" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "logbookCalendar" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => props.navigation.navigate("logbookCalendar")}
            text="Calendar"
          />
        </React.Fragment>
      )}
    />
  )
}

const SETTINGS_HEADER_ROW: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[5],
  height: 60,
  alignItems: "center",
}

const SETTINGS_HEADER_TITLE: TextStyle = { marginLeft: spacing[4], color: color.palette.white }

export function SettingsHeader(props: SreenHeaderProps) {
  return (
    <SafeAreaView style={HEADER}>
      <StatusBar barStyle="light-content" />
      <View style={SETTINGS_HEADER_ROW}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon icon="largeChevron" />
        </TouchableOpacity>
        <Text style={SETTINGS_HEADER_TITLE} tx="settings.title" />
      </View>
    </SafeAreaView>
  )
}
