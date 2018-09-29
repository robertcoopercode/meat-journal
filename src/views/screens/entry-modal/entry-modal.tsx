import * as React from "react"
import { inject, observer } from "mobx-react"
import {
  SafeAreaView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ScrollView,
  Dimensions,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { Button } from "src/views/shared/button"
import { DatePicker } from "src/views/shared/date-picker"
import { EntryStoreModel } from "src/models/entry-store"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "src/views/shared/screen"
import { Text } from "src/views/shared/text"
import { TextField } from "src/views/shared/text-field"
import { color, spacing } from "src/theme"
import { Icon } from "src/views/shared/icon"

const ROOT: ViewStyle = {
  backgroundColor: "rgba(0,0,0, 0.6)",
  alignItems: "center",
  justifyContent: "flex-end",
}

const EXIT: ViewStyle = {
  marginTop: 100,
  marginBottom: spacing[3],
}

const MODAL: ViewStyle = {
  marginHorizontal: spacing[3],
  alignSelf: "stretch",
  backgroundColor: color.background,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}

const MODAL_BODY_CONTAINER = {
  maxHeight: Dimensions.get("window").height - 100,
  flexGrow: 0,
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

export interface EntryModalScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

interface EntryModalScreenState {
  animalType: string
  animalFieldFocused: boolean
  date: string
  name: string
  openedDatePicker: boolean
  openedTimePicker: boolean
  time: string
  weight: string
  filteredAnimalTypes: string[]
}

@inject("entryStore")
@observer
export class EntryModal extends React.Component<EntryModalScreenProps, EntryModalScreenState> {
  // Class properties Type definitions
  inputs: {
    animalType: any
    date: any
    name: any
    time: any
    weight: any
  }

  scroll: any

  animalTypes = ["cow", "porc", "duck", "horse", "lamb"]

  state = {
    animalType: "",
    animalFieldFocused: false,
    date: "16/09/2018",
    name: "",
    openedDatePicker: false,
    openedTimePicker: false,
    time: "10:00 PM",
    weight: null,
    filteredAnimalTypes: this.animalTypes,
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
  handleAnimalFieldFocus = () => {
    this.setState({ animalFieldFocused: true })
  }
  handleAnimalFieldBlur = () => {
    this.setState({ animalFieldFocused: false })
  }
  handleAnimalFieldChange = text => {
    this.setState(state => {
      const filteredAnimalTypes = this.animalTypes.filter(animalType => animalType.includes(text))
      return {
        filteredAnimalTypes,
        animalType: text,
      }
    })
  }
  handleAnimalFieldSelect = animalType => {
    this.setState({ animalType, animalFieldFocused: false })
    this.inputs.animalType.blur()
  }
  handleWeightFieldChange = text => {
    let parsedNumber = parseFloat(text)
    console.tron.log(text)
    if (isNaN(text)) {
      this.setState(state => ({
        weight: state.weight,
      }))
      return console.tron.log("INVALID NUMBER")
    } else if (parsedNumber > 100) {
      return console.tron.log("Only weights under 100 can be entered")
    } else if (text.includes(".") && text.split(".")[1].length > 2) {
      parsedNumber = Math.round(parsedNumber * 100) / 100
      return this.setState({ weight: parsedNumber.toString() })
    }
    return this.setState({ weight: text })
  }
  renderFilteredAnimalTypes = () => {
    return this.state.filteredAnimalTypes.map(animalType => (
      <TouchableOpacity
        key={animalType}
        style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[3] }}
        onPress={() => this.handleAnimalFieldSelect(animalType)}
      >
        <Text>{animalType}</Text>
      </TouchableOpacity>
    ))
  }
  render() {
    const addingEntry = this.props.navigation.getParam("type", "add") === "add"
    return (
      <Screen style={ROOT} preset="fixedStack">
        <TouchableOpacity style={EXIT} onPress={() => this.props.navigation.goBack()}>
          <Icon icon="exit" />
        </TouchableOpacity>
        <View style={MODAL}>
          <SafeAreaView style={MODAL_BODY_CONTAINER}>
            <View style={MODAL_FORM_HEADER}>
              <Text
                style={MODAL_FORM_HEADER_TEXT}
                uppercase
                tx={addingEntry ? "entryModal.addEntry" : "entryModal.editEntry"}
              />
            </View>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={"always"}
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
                  onFocus={this.handleAnimalFieldFocus}
                  onBlur={this.handleAnimalFieldBlur}
                  labelTx={"entryModal.animalField"}
                  setRef={this.setInputRef("animalType")}
                  autoCapitalize={"none"}
                  value={this.state.animalType}
                  onChangeText={this.handleAnimalFieldChange}
                  style={{ zIndex: 2 }} // zIndex required to appear above dropdown
                />
                {this.state.animalFieldFocused && (
                  <View style={{ overflow: "visible", zIndex: 1 }}>
                    <ScrollView
                      keyboardShouldPersistTaps={"always"}
                      style={{
                        maxHeight: 185,
                        position: "absolute",
                        width: "100%",
                        backgroundColor: "white",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderColor: color.palette.paleFlower,
                        borderWidth: 1,
                        borderTopWidth: 0,
                        paddingTop: spacing[2],
                        marginTop: -spacing[3] - spacing[2],
                      }}
                    >
                      {this.renderFilteredAnimalTypes()}
                    </ScrollView>
                  </View>
                )}
                <TextField
                  labelTx={"entryModal.weightField"}
                  setRef={this.setInputRef("weight")}
                  keyboardType={"numeric"}
                  value={this.state.weight}
                  onChangeText={this.handleWeightFieldChange}
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
                  tx={addingEntry ? "entryModal.addButton" : "entryModal.saveButton"}
                  onPress={this.handleSubmit}
                />
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </View>
      </Screen>
    )
  }
}
