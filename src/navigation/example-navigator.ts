import { createStackNavigator } from "react-navigation"

import { FirstExampleScreen } from "src/views/example/first-example-screen"
import { SecondExampleScreen } from "src/views/example/second-example-screen"

export const ExampleNavigator = createStackNavigator(
  {
    firstExample: { screen: FirstExampleScreen },
    secondExample: { screen: SecondExampleScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
