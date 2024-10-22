import { createStackNavigator, createBottomTabNavigator } from "react-navigation"
import { PrivacyPolicy } from "../views/screens/PrivacyPolicy/PrivacyPolicy-screen"

import { EntryModal } from "src/views/screens/entry-modal"
import { LogbookCalendar } from "src/views/screens/logbook-calendar"
import { LogbookHeader, StatisticsHeader, SettingsHeader } from "./custom-header"
import { LogbookIcon, StatisticsIcon } from "./tab-navigation-icons"
import { LogbookList } from "src/views/screens/logbook-list"
import { Statistics } from "src/views/screens/statistics"
import { Welcome } from "src/views/screens/welcome"
import { Settings } from "src/views/screens/settings"
import { color } from "src/theme/color"

const logbookScreenNavigator = createStackNavigator(
  {
    logbookList: {
      screen: LogbookList,
    },
    logbookCalendar: {
      screen: LogbookCalendar,
    },
  },
  {
    navigationOptions: {
      header: LogbookHeader,
    },
  },
)

const LogbookNavigator = createStackNavigator(
  {
    logbookScreen: logbookScreenNavigator,
  },
  {
    headerMode: "none",
  },
)

const SettingsNavigator = createStackNavigator(
  {
    settings: {
      screen: Settings,
    },
    privacyPolicy: { screen: PrivacyPolicy },
  },
  {
    navigationOptions: {
      header: SettingsHeader,
    },
  },
)

const StatisticsNavigator = createStackNavigator(
  {
    statisticsWeekly: { screen: Statistics },
    statisticsMonthly: { screen: Statistics },
    statisticsYearly: { screen: Statistics },
  },
  {
    navigationOptions: {
      header: StatisticsHeader,
    },
  },
)

const StatisticsAndSettingsNavigator = createStackNavigator(
  {
    statisticScreens: { screen: Statistics },
    settingsScreen: {
      screen: SettingsNavigator,
    },
  },
  {
    headerMode: "none",
  },
)

const mainAppNavigation = createBottomTabNavigator(
  {
    logbook: {
      screen: LogbookNavigator,
      navigationOptions: {
        title: "LOGBOOK",
        tabBarIcon: LogbookIcon,
      },
    },
    StatisticsAndSettingsNavigator: {
      screen: StatisticsAndSettingsNavigator,
      navigationOptions: { title: "STATISTICS", tabBarIcon: StatisticsIcon },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: color.tertiary,
      inactiveTintColor: color.text,
      style: {
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
      },
      labelStyle: {
        marginTop: 5,
      },
    },
  },
)

export const RootNavigator = createStackNavigator(
  {
    welcome: { screen: Welcome },
    mainAppNavigation: { screen: mainAppNavigation },
    entryModal: {
      screen: EntryModal,
      navigationOptions: { header: null, gesturesEnabled: true },
    },
  },
  {
    headerMode: "none",
    mode: "modal",
    cardStyle: {
      backgroundColor: "transparent",
      opacity: 1,
    },
    transitionConfig: forVertical,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)

// create custom transitioner without the opacity animation, ie. for iOS
function forVertical(props) {
  const { layout, position, scene } = props

  const index = scene.index
  const height = layout.initHeight

  const translateX = 0
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0],
  })

  return {
    transform: [{ translateX }, { translateY }],
  }
}
