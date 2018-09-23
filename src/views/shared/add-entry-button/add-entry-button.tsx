import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, TouchableOpacity, Image, View } from "react-native"

import { Screen } from "src/views/shared/screen"
import { spacing } from "src/theme"

export interface AddEntryButtonProps {
  renderScreenContent: () => React.ReactNode
}

const ADD_ENTRY_CONTAINER: ViewStyle = {
  position: "absolute",
  height: 75,
  bottom: 0,
  width: "100%",
  alignItems: "flex-end",
  justifyContent: "center",
  paddingHorizontal: spacing[5],
}

// @inject("mobxstuff")
@observer
export class AddEntryButton extends React.Component<AddEntryButtonProps, {}> {
  render() {
    return (
      <Screen preset="fixedStack">
        {this.props.renderScreenContent()}
        <View style={ADD_ENTRY_CONTAINER}>
          <TouchableOpacity>
            <Image source={require("src/assets/addEntryButton.png")} />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}
