import * as React from "react"
import { observer } from "mobx-react"
import { Image, ViewStyle } from "react-native"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Screen } from "../../shared/screen"
import { color } from "../../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.tertiary,
}

const styles = {
  image: {
    width: 192,
    height: 192,
  },
}

// @inject("mobxstuff")
@observer
export class Welcome extends React.Component<WelcomeScreenProps, {}> {
  render() {
    return (
      <Screen style={ROOT} preset="fixedCenter">
        <Text preset="header" tx="welcome.title" />
        <Image style={styles.image} source={require("MeatJournal/src/assets/meat.png")} />
        <Text tx="welcome.description" />
        <Button tx="welcome.description" />
      </Screen>
    )
  }
}
