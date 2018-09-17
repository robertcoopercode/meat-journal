import { createStackNavigator } from "react-navigation"
import { Welcome } from "../views/example/welcome/welcome"
import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = createStackNavigator(
  {
    welcome: { screen: Welcome },
    exampleStack: { screen: ExampleNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
