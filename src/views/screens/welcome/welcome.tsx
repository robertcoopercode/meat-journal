import * as React from "react"
import { observer } from "mobx-react"
import { Image, ViewStyle, TextStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { Text } from "src/views/shared/text"
import { Button } from "src/views/shared/button"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.secondary,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5],
  paddingHorizontal: 0,
  fontWeight: "600",
  fontSize: 40,
  letterSpacing: 2,
  color: color.primary,
}

const LOGO = {
  width: 192,
  height: 192,
  paddingBottom: spacing[3],
}

const DESCRIPTION = {
  paddingBottom: spacing[5],
  paddingHorizontal: spacing[4],
  textAlign: "center",
  fontSize: 30,
  letterSpacing: 0.5,
  fontWeight: "300",
}

// @inject("mobxstuff")
@observer
export class Welcome extends React.Component<WelcomeScreenProps, {}> {
  nextScreen = () => this.props.navigation.navigate("logbookList")

  render() {
    return (
      <Screen style={ROOT} preset="fixedCenter">
        <Text style={HEADER} tx="welcome.title" />
        <Image style={LOGO} source={require("src/assets/meat.png")} />
        <Text style={DESCRIPTION} tx="welcome.description" />
        <Button tx="welcome.cta" onPress={this.nextScreen} />
      </Screen>
    )
  }
}
