import * as React from "react"
import { inject, observer } from "mobx-react"
import {
  Image,
  SafeAreaView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ScrollView,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { DatePicker } from "src/views/shared/date-picker"
import { Text } from "src/views/shared/text"
import { Button } from "src/views/shared/button"
import { TextField } from "src/views/shared/text-field"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"
import { EntryStoreModel } from "src/models/entry-store"

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
  marginTop: 20,
  alignSelf: "center",
}

export interface AddEntryModalScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

interface AddEntryModalScreenState {
  animalType: string
  date: string
  name: string
  openedDatePicker: boolean
  openedTimePicker: boolean
  time: string
  weight: string
}

@inject("entryStore")
@observer
export class AddEntryModal extends React.Component<
  AddEntryModalScreenProps,
  AddEntryModalScreenState
> {
  // Class properties Type definitions
  inputs: {
    animalType: any
    date: any
    name: any
    time: any
    weight: any
  }
  scroll: any

  state = {
    animalType: "",
    date: "16/09/2018",
    name: "",
    openedDatePicker: false,
    openedTimePicker: false,
    time: "10:00 PM",
    weight: null,
  }
  static navigationOptions = {}
  constructor(props) {
    super(props)
    // Initialize the refs with nothings so there are no errors when
    // trying to access a ref before it is set in React
    this.inputs = {
      date: null,
      time: null,
      animalType: null,
      name: null,
      weight: null,
    }
  }
  setInputRef = inputName => input => {
    this.inputs[inputName] = input
  }
  handleOnSubmitEditing = inputName => () => {
    this.inputs[inputName].focus()
  }
  handleDateClose = () => {
    this.setState({ openedDatePicker: false })
    // Open the time picker after the date picker closes
    // setTimeout(this.inputs.time.onPressDate, 500)
  }
  handleSubmit = () => {
    // MOBX
    const entry = {
      animalType: this.state.animalType,
      name: this.state.name,
      weight: this.state.weight,
      date: this.state.date,
      time: this.state.time,
    }
    this.props.entryStore.add(entry)
    this.props.navigation.goBack()
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
                    setRef={this.setInputRef("name")} // Setting the refs in case I want to automatically
                    // focus on the next input after pressing "next" on the keyboard
                    autoCapitalize={"none"}
                    onChangeText={text => this.setState({ name: text })}
                  />
                  {/* Make a custom dropdown here instead */}
                  <TextField
                    labelTx={"entryModal.animalField"}
                    setRef={this.setInputRef("animal")}
                    autoCapitalize={"none"}
                    onChangeText={text => this.setState({ animalType: text })}
                    style={{ zIndex: 2 }} // zIndex required to appear above dropdown
                  />
                  <View style={{ overflow: "visible", zIndex: 1 }}>
                    <ScrollView
                      style={{
                        maxHeight: 200,
                        position: "absolute",
                        width: "100%",
                        backgroundColor: "white",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderColor: color.palette.paleFlower,
                        borderWidth: 1,
                        borderTopWidth: 0,
                        paddingVertical: spacing[2],
                        marginTop: -spacing[3] - spacing[2],
                      }}
                    >
                      <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[3] }}>
                        <Text>Cow</Text>
                      </View>
                      <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[3] }}>
                        <Text>Porc</Text>
                      </View>
                      <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[3] }}>
                        <Text>Lamb</Text>
                      </View>
                      <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[3] }}>
                        <Text>Horse</Text>
                      </View>
                    </ScrollView>
                  </View>
                  <TextField
                    labelTx={"entryModal.weightField"}
                    setRef={this.setInputRef("weight")}
                    keyboardType={"numeric"}
                    onChangeText={text => this.setState({ weight: text })}
                  />
                  <DatePicker
                    setRef={this.setInputRef("date")}
                    labelTx={"entryModal.dateField"}
                    type="date"
                    date={this.state.date}
                    onOpenModal={() => this.setState({ openedDatePicker: true })}
                    onCloseModal={this.handleDateClose}
                    onDateChange={date => this.setState({ date: date })}
                    isOpened={this.state.openedDatePicker}
                    format={"DD/MM/YYYY"}
                  />
                  <DatePicker
                    setRef={this.setInputRef("time")}
                    labelTx={"entryModal.timeField"}
                    type="time"
                    time={this.state.time}
                    onOpenModal={() => this.setState({ openedTimePicker: true })}
                    onCloseModal={() => this.setState({ openedTimePicker: false })}
                    onDateChange={time => this.setState({ time: time })}
                    isOpened={this.state.openedTimePicker}
                    format={"h:mm A"}
                  />
                  <Button
                    style={MODAL_FORM_SUBMIT}
                    tx={"entryModal.addButton"}
                    onPress={this.handleSubmit}
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
