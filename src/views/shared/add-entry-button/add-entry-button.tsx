import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { ViewStyle, TouchableOpacity, View } from "react-native"
import { inject, observer } from "mobx-react"

import { NavigationStore } from "src/navigation/navigation-store"
import { Screen } from "src/views/shared/screen"
import { spacing } from "src/theme"
import { Icon } from "src/views/shared/icon"

export interface AddEntryButtonProps extends NavigationScreenProps<{}> {
  renderScreenContent: () => React.ReactNode
  navigationStore: NavigationStore
}

export const ADD_ENTRY_CONTAINER_HEIGHT = 75

const ADD_ENTRY_CONTAINER: ViewStyle = {
  position: "absolute",
  height: ADD_ENTRY_CONTAINER_HEIGHT,
  bottom: 0,
  width: "100%",
  alignItems: "flex-end",
  justifyContent: "center",
  paddingHorizontal: spacing[5],
}

@inject("navigationStore")
@observer
export class AddEntryButton extends React.Component<AddEntryButtonProps, {}> {
  render() {
    return (
      <Screen preset="fixedStack">
        {this.props.renderScreenContent()}
        <View style={ADD_ENTRY_CONTAINER}>
          <TouchableOpacity
            onPress={() => this.props.navigationStore.navigateTo("entryModal", { type: "add" })}
          >
            <Icon icon={"addEntryButton"} />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}
