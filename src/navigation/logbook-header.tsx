import * as React from "react"
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { Text } from "src/views/shared/text"
import { color } from "src/theme/color"

interface LogbookHeaderProps extends NavigationScreenProps<{}> {
  scene: any
}

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

export function LogbookHeader(props: LogbookHeaderProps) {
  return (
    <SafeAreaView style={HEADER}>
      <StatusBar barStyle="light-content" />
      <View style={MENU_ITEMS}>
        <TouchableOpacity
          style={{
            ...MENU_ITEM,
            ...(props.scene.route.routeName === "logbookList" ? ACTIVE_MENU_ITEM : {}),
          }}
          onPress={() => props.navigation.navigate("logbookList")}
        >
          <Text
            style={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "logbookList" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
          >
            List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...MENU_ITEM,
            ...(props.scene.route.routeName === "logbookCalendar" ? ACTIVE_MENU_ITEM : {}),
          }}
          onPress={() => props.navigation.navigate("logbookCalendar")}
        >
          <Text
            style={{
              ...MENU_ITEM_TEXT,
              ...(props.scene.route.routeName === "logbookCalendar" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
          >
            Calendar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
