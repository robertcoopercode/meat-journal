import * as React from "react"
import { observer } from "mobx-react"
import { Image, ViewStyle, View, TextStyle, TouchableOpacity, SafeAreaView } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { Text } from "src/views/shared/text"
import { Button } from "src/views/shared/button"
import { TextField } from "src/views/shared/text-field"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"

export interface AddEntryModalScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: "rgba(0,0,0, 0.6)",
  alignItems: "center",
  justifyContent: "flex-end",
}

const EXIT: ViewStyle = {
  marginBottom: spacing[3],
}

const MODAL: ViewStyle = {
  marginHorizontal: spacing[3],
  alignSelf: "stretch",
  backgroundColor: color.background,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}

const MODAL_FORM_BODY: ViewStyle = {
  padding: spacing[3],
}

const MODAL_FORM_HEADER: ViewStyle = {
  backgroundColor: color.primary,
  padding: spacing[3],
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}

const MODAL_FORM_HEADER_TEXT: TextStyle = {
  fontWeight: "600",
  color: color.secondary,
}

const MODAL_FORM_SUBMIT: ViewStyle = {
  alignSelf: "center",
}

// @inject("navigationStore")
@observer
export class AddEntryModal extends React.Component<AddEntryModalScreenProps, {}> {
  static navigationOptions = {}
  constructor() {
    super()
    this.inputs = {}
  }
  setInputRef = inputName => input => {
    this.inputs[inputName] = input
  }
  handleOnSubmitEditing = inputName => () => {
    this.inputs[inputName].focus()
  }
  render() {
    return (
      <Screen style={ROOT} preset="fixedStack">
        <TouchableOpacity style={EXIT} onPress={() => this.props.navigation.goBack()}>
          <Image source={require("src/assets/Exit.png")} />
        </TouchableOpacity>
        <View style={MODAL}>
          <SafeAreaView>
            <View>
              <View style={MODAL_FORM_HEADER}>
                <Text style={MODAL_FORM_HEADER_TEXT} uppercase tx={"entryModal.addEntry"} />
              </View>
              <KeyboardAwareScrollView
                innerRef={ref => {
                  this.scroll = ref
                }}
              >
                <View style={MODAL_FORM_BODY}>
                  <TextField
                    labelTx={"entryModal.nameField"}
                    setRef={this.setInputRef("name")}
                    onSubmitEditing={this.handleOnSubmitEditing("animal")}
                  />
                  <TextField
                    labelTx={"entryModal.animalField"}
                    setRef={this.setInputRef("animal")}
                    onSubmitEditing={this.handleOnSubmitEditing("weight")}
                  />
                  <TextField
                    labelTx={"entryModal.weightField"}
                    setRef={this.setInputRef("weight")}
                    onSubmitEditing={this.handleOnSubmitEditing("date")}
                  />
                  <TextField
                    labelTx={"entryModal.dateField"}
                    setRef={this.setInputRef("date")}
                    onSubmitEditing={this.handleOnSubmitEditing("time")}
                  />
                  <TextField labelTx={"entryModal.timeField"} setRef={this.setInputRef("time")} />
                  <Button
                    style={MODAL_FORM_SUBMIT}
                    tx={"entryModal.addButton"}
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Screen>
    )
  }
}
