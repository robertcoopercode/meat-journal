import * as React from "react"
import { SafeAreaView, StatusBar, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"

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

const MENU_ITEM = {
  height: 35,
  borderBottomWidth: 2,
  borderBottomColor: color.transparent,
}

const ACTIVE_MENU_ITEM = {
  borderBottomColor: color.secondary,
}

const MENU_ITEM_TEXT = {
  color: "#fff",
}

const ACTIVE_MENU_ITEM_TEXT = {
  color: color.secondary,
}

interface HeaderProps {
  renderMenuItems: () => React.ReactNode
}

function Header(props: HeaderProps) {
  return (
    <SafeAreaView style={HEADER}>
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

function HeaderMenuItem(props: HeaderMenuItemProps) {
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

export function StatisticsHeader(props: SreenHeaderProps) {
  return (
    <Header
      renderMenuItems={() => (
        <React.Fragment>
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(props.scene.route.routeName === "statisticsWeekly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "statisticsWeekly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => props.navigation.navigate("statisticsWeekly")}
            text="Weekly"
          />
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(props.scene.route.routeName === "statisticsMonthly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "statisticsMonthly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => props.navigation.navigate("statisticsMonthly")}
            text="Monthly"
          />
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(props.scene.route.routeName === "statisticsYearly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "statisticsYearly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => props.navigation.navigate("statisticsYearly")}
            text="Yearly"
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

const SETTINGS_HEADER_TITLE: TextStyle = { marginLeft: spacing[3], color: color.palette.white }

export function SettingsHeader(props: SreenHeaderProps) {
  return (
    <SafeAreaView style={HEADER}>
      <StatusBar barStyle="light-content" />
      <View style={SETTINGS_HEADER_ROW}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <FontAwesomeIcon name="chevron-left" size={20} color={color.palette.white} />
        </TouchableOpacity>
        <Text preset="header" style={SETTINGS_HEADER_TITLE} tx="settings.title" />
      </View>
    </SafeAreaView>
  )
}
