import { createStackNavigator } from "react-navigation"
import { LogbookList } from "../views/screens/LogbookList/LogbookList-screen"
import { Welcome } from "../views/screens/welcome"
import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = createStackNavigator(
  {
    welcome: { screen: Welcome },
    logbookList: { screen: LogbookList },
    exampleStack: { screen: ExampleNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
