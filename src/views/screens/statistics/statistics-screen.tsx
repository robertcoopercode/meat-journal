import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { Text } from "src/views/shared/text"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"
import { NavigationScreenProps } from "react-navigation"

export interface StatisticsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

// @inject("mobxstuff")
@observer
export class Statistics extends React.Component<StatisticsScreenProps, {}> {
  render() {
    return (
      <Screen style={ROOT} preset="fixedCenter">
        <Text preset="header" tx="statistics.header" />
      </Screen>
    )
  }
}
