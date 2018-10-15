import * as React from "react"
import { inject, observer } from "mobx-react"
import {
  AlertIOS,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import format from "date-fns/format"

import { SUPPORTED_ANIMALS } from "src/lib/constants"
import { Button } from "src/views/shared/button"
import { DatePicker } from "src/views/shared/date-picker"
import { EntryStoreModel } from "src/models/entry-store"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "src/views/shared/screen"
import { Text } from "src/views/shared/text"
import { TextField } from "src/views/shared/text-field"
import { color, spacing } from "src/theme"
import { Icon } from "src/views/shared/icon"
import { UserStoreModel } from "src/models/user-store"
import { convertKgsToLbs, convertLbsToKgs } from "src/lib/utility"

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
  flexDirection: "row",
}

const MODAL_FORM_HEADER_TEXT: TextStyle = {
  color: color.secondary,
  flexGrow: 1,
}

const MODAL_FORM_SUBMIT: ViewStyle = {
  marginTop: 20,
  alignSelf: "center",
}

const DELETE_ICON: ViewStyle = {}

const ERROR_TEXT: TextStyle = {
  fontSize: 8,
  position: "absolute",
  bottom: 0,
  color: color.tertiary,
}

const FORM_FIELD_CONTAINER: ViewStyle = {
  position: "relative",
}

const MEAT_LIST: ViewStyle = {
  maxHeight: 110,
  position: "absolute",
  width: "100%",
  backgroundColor: "white",
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderColor: color.palette.paleFlower,
  borderWidth: 1,
  borderTopWidth: 0,
  paddingTop: spacing[1],
  marginTop: -spacing[3] - spacing[2],
}

const MEAT_LIST_ITEM: ViewStyle = { paddingVertical: spacing[2], paddingHorizontal: spacing[3] }

export interface EntryModalScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
  userStore: typeof UserStoreModel.Type
}

interface EntryModalScreenState {
  animalType: string
  animalFieldFocused: boolean
  date: string
  name: string
  openedDatePicker: boolean
  openedTimePicker: boolean
  time: string
  weightKgs: string
  weightLbs: string
  filteredAnimalTypes: string[]
  errors:
    | {}
    | {
        [x: string]: string
      }
  beforeUpdateEntryDetails:
    | {
        date: string
        id: string
      }
    | {}
}

@inject("userStore")
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

  state = {
    animalType: "",
    animalFieldFocused: false,
    date: format(new Date(), "DD/MM/YYYY"),
    name: "",
    openedDatePicker: false,
    openedTimePicker: false,
    time: format(new Date(), "h:mm A"),
    weightKgs: null,
    weightLbs: null,
    filteredAnimalTypes: SUPPORTED_ANIMALS,
    errors: {},
    beforeUpdateEntryDetails: {},
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
  componentDidMount() {
    if (this.props.navigation.getParam("type", "add") === "edit") {
      const { id, name, animalType, date, time } = this.props.navigation.state.params.entry
      const weightKgs = this.props.navigation.state.params.entry.weightKgs.toString()
      const weightLbs = this.props.navigation.state.params.entry.weightLbs.toString()
      this.setState({
        name,
        animalType,
        date,
        time,
        weightKgs,
        weightLbs,
        beforeUpdateEntryDetails: { date, id },
      })
    }
  }
  setInputRef = inputName => input => {
    this.inputs[inputName] = input
  }
  validateFields = () => {
    const errors: {
      animalType?: string
      weight?: string
      name?: string
    } = {}

    if (!SUPPORTED_ANIMALS.includes(this.state.animalType.toLocaleLowerCase())) {
      errors.animalType = "Not an available animal type"
    }
    if (isNaN(parseFloat(this.state.weightLbs)) || isNaN(parseFloat(this.state.weightKgs))) {
      errors.weight = "Not a valid number"
    }
    if (!Boolean(this.state.name.trim())) {
      errors.name = "Enter a value for the name"
    }
    return errors
  }
  handleOnSubmitEditing = inputName => () => {
    this.inputs[inputName].focus()
  }
  handleDateClose = () => {
    this.setState({ openedDatePicker: false })
  }
  handleDeleteEntry = () => {
    AlertIOS.alert("Deleting Entry", "The entry will be permanently deleted", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          this.props.entryStore.delete(this.props.navigation.state.params.entry)
          this.props.navigation.goBack()
        },
        style: "destructive",
      },
    ])
  }
  handleSubmit = () => {
    const errors = this.validateFields()
    if (Object.entries(errors).length === 0) {
      if (this.props.navigation.getParam("type", "add") === "add") {
        const entry = {
          animalType: this.state.animalType,
          name: this.state.name,
          weightKgs: this.state.weightKgs,
          weightLbs: this.state.weightLbs,
          date: this.state.date,
          time: this.state.time,
        }
        this.props.entryStore.add(entry)
      } else {
        const entry = {
          ...this.props.navigation.state.params.entry,
          animalType: this.state.animalType,
          name: this.state.name,
          weightKgs: this.state.weightKgs,
          weightLbs: this.state.weightLbs,
          date: this.state.date,
          time: this.state.time,
        }
        this.props.entryStore.update(this.state.beforeUpdateEntryDetails, entry)
      }
      this.props.navigation.goBack()
    } else {
      this.setState({ errors })
    }
  }
  handleAnimalFieldFocus = () => {
    this.setState({ animalFieldFocused: true })
  }
  handleAnimalFieldBlur = () => {
    this.setState({ animalFieldFocused: false })
  }
  handleAnimalFieldChange = text => {
    const filteredAnimalTypes = SUPPORTED_ANIMALS.filter(animalType => animalType.includes(text))
    this.setState({
      filteredAnimalTypes,
      animalType: text,
      errors: {},
    })
  }
  handleAnimalFieldSelect = animalType => {
    this.setState({ animalType, animalFieldFocused: false, errors: {} })
    this.inputs.animalType.blur()
  }
  handleWeightFieldChange = text => {
    let parsedNumber = parseFloat(text)
    let weightUnits = this.props.userStore.weightUnits
    if (isNaN(text) || parsedNumber > 100) {
      this.setState(state => ({
        weightKgs: state.weightKgs,
        weightLbs: state.weightLbs,
        errors: {},
      }))
    } else if (text.includes(".") && text.split(".")[1].length > 2) {
      parsedNumber = Math.round(parsedNumber * 100) / 100
      if (weightUnits === "kgs") {
        return this.setState({
          weightKgs: parsedNumber.toString(),
          weightLbs: convertKgsToLbs(parsedNumber).toString(),
          errors: {},
        })
      } else {
        return this.setState({
          weightKgs: convertLbsToKgs(parsedNumber).toString(),
          weightLbs: parsedNumber.toString(),
          errors: {},
        })
      }
    }
    if (weightUnits === "kgs") {
      return this.setState({
        weightKgs: text,
        weightLbs: convertLbsToKgs(parsedNumber).toString(),
        errors: {},
      })
    } else {
      return this.setState({
        weightKgs: convertLbsToKgs(parsedNumber).toString(),
        weightLbs: text,
        errors: {},
      })
    }
  }
  renderFilteredAnimalTypes = () => {
    return this.state.filteredAnimalTypes.map(animalType => (
      <TouchableOpacity
        key={animalType}
        style={MEAT_LIST_ITEM}
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
                preset="header"
                tx={addingEntry ? "entryModal.addEntry" : "entryModal.editEntry"}
              />
              {!addingEntry && (
                <TouchableOpacity onPress={this.handleDeleteEntry}>
                  <Icon icon={"delete"} style={DELETE_ICON} />
                </TouchableOpacity>
              )}
            </View>
            <KeyboardAwareScrollView
              extraScrollHeight={90}
              keyboardShouldPersistTaps={"always"}
              innerRef={ref => {
                this.scroll = ref
              }}
            >
              <View style={MODAL_FORM_BODY}>
                <View style={FORM_FIELD_CONTAINER}>
                  <TextField
                    labelTx={"entryModal.nameField"}
                    setRef={this.setInputRef("name")} // Setting the refs in case I want to automatically
                    // focus on the next input after pressing "next" on the keyboard
                    autoCapitalize={"none"}
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text, errors: {} })}
                  />
                  {this.state.errors &&
                    this.state.errors.name && (
                      <Text style={ERROR_TEXT}>{this.state.errors.name}</Text>
                    )}
                </View>
                <View style={FORM_FIELD_CONTAINER}>
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
                  {this.state.errors &&
                    this.state.errors.animalType && (
                      <Text style={ERROR_TEXT}>{this.state.errors.animalType}</Text>
                    )}
                </View>
                {this.state.animalFieldFocused && (
                  <View style={{ overflow: "visible", zIndex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps={"always"} style={MEAT_LIST}>
                      {this.renderFilteredAnimalTypes()}
                    </ScrollView>
                  </View>
                )}
                <View style={FORM_FIELD_CONTAINER}>
                  <TextField
                    labelTx={
                      this.props.userStore.weightUnits === "kgs"
                        ? "entryModal.weightFieldKgs"
                        : "entryModal.weightFieldLbs"
                    }
                    setRef={this.setInputRef("weight")}
                    keyboardType={"numeric"}
                    value={
                      this.props.userStore.weightUnits === "kgs"
                        ? this.state.weightKgs
                        : this.state.weightLbs
                    }
                    onChangeText={this.handleWeightFieldChange}
                  />
                  {this.state.errors &&
                    this.state.errors.weight && (
                      <Text style={ERROR_TEXT}>{this.state.errors.weight}</Text>
                    )}
                </View>
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
