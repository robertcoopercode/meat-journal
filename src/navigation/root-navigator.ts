import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

import { AddEntryModal } from "src/views/screens/add-entry-modal"
import { LogbookCalendar } from "src/views/screens/logbook-calendar"
import { LogbookHeader } from "src/navigation/logbook-header"
import { LogbookIcon, StatisticsIcon } from "./tab-navigation-icons"
import { LogbookList } from "src/views/screens/logbook-list"
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

export const RootNavigator = createStackNavigator(
  {
    welcome: { screen: Welcome },
    mainTabNavigation: { screen: MainTabNavigator },
    addEntryModal: { screen: AddEntryModal },
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: { gesturesEnabled: false },
    cardStyle: {
      backgroundColor: "transparent",
      opacity: 1,
    },
    transitionConfig: forVertical,
  },
)
