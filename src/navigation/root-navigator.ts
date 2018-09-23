import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

import { LogbookCalendar } from "src/views/screens/logbookCalendar"
import { LogbookHeader } from "src/navigation/logbook-header"
import { LogbookIcon, StatisticsIcon } from "./tab-navigation-icons"
import { LogbookList } from "src/views/screens/logbookList"
import { Statistics } from "src/views/screens/statistics"
import { Welcome } from "src/views/screens/welcome"
import { color } from "src/theme/color"

// Use this to view the screens that came with the boilerplate
// import { ExampleNavigator } from "./example-navigator"

const LogbookNavigator = createStackNavigator(
  {
    logbookList: { screen: LogbookList },
    logbookCalendar: { screen: LogbookCalendar },
  },
  {
    navigationOptions: {
      header: LogbookHeader,
    },
  },
)

const MainTabNavigator = createBottomTabNavigator(
  {
    logbook: {
      screen: LogbookNavigator,
      navigationOptions: {
        title: "LOGBOOK",
        tabBarIcon: LogbookIcon,
      },
    },
    statistics: {
      screen: Statistics,
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
    mainTabNavigation: { screen: MainTabNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
