import * as React from "react"
import { inject, observer } from "mobx-react"
import { Animated, View, ViewStyle, TouchableOpacity, ScrollView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"

import { Text } from "src/views/shared/text"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"
import { EntryStoreModel } from "src/models/entry-store"
import { ADD_ENTRY_CONTAINER_HEIGHT } from "src/views/shared/add-entry-button"
import { getWeekRangeText } from "src/lib/utility"

export interface StatisticsScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
}

const BAR_CHART_CONTROLS: ViewStyle = {
  marginVertical: spacing[5],
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  width: 250,
}

const BAR_CHART: ViewStyle = {
  height: 200,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-end",
  minWidth: "100%",
  paddingHorizontal: spacing[5],
  marginTop: spacing[5],
}

const SETTINGS_BUTTON_CONTAINER: ViewStyle = {
  position: "absolute",
  height: ADD_ENTRY_CONTAINER_HEIGHT,
  bottom: 0,
  width: "100%",
  alignItems: "flex-end",
  justifyContent: "center",
  paddingHorizontal: spacing[5],
}

interface StatisticsScreenState {
  currentWeekIndex: number
}

@inject("entryStore")
@observer
export class Statistics extends React.Component<StatisticsScreenProps, StatisticsScreenState> {
  state = {
    currentWeekIndex: 0, // 0 corresponds to the current week and 1 corresponds to last week...
  }
  componentDidMount() {
    this.setupBarChartAnimatedHeight(this.state.currentWeekIndex)
  }
  setupBarChartAnimatedHeight = currentWeekIndex => {
    const largestNumber = Math.max(
      ...Object.values(this.props.entryStore.getWeeklyStats()[currentWeekIndex]),
    )
    Object.entries(this.props.entryStore.getWeeklyStats()[currentWeekIndex]).forEach(entry => {
      // Entries are in the form of ['cow', 1]
      this.setState(
        {
          [`${entry[0]}${currentWeekIndex}`]: new Animated.Value(0),
        },
        () => {
          Animated.timing(this.state[`${entry[0]}${currentWeekIndex}`], {
            toValue: entry[1] * (200 / largestNumber),
            duration: 1000,
          }).start()
        },
      )
    })
  }
  handlePreviousWeek = () => {
    this.setState(state => {
      if (state.currentWeekIndex < this.props.entryStore.getWeeklyStats().length - 1) {
        this.setupBarChartAnimatedHeight(state.currentWeekIndex + 1)
        return { currentWeekIndex: state.currentWeekIndex + 1 }
      } else {
        return state
      }
    })
  }
  handleNextWeek = () => {
    this.setState(state => {
      if (state.currentWeekIndex != 0) {
        this.setupBarChartAnimatedHeight(state.currentWeekIndex - 1)
        return { currentWeekIndex: state.currentWeekIndex - 1 }
      } else {
        return state
      }
    })
  }
  render() {
    return (
      <Screen style={ROOT} preset="fixed">
        <View style={BAR_CHART_CONTROLS}>
          <TouchableOpacity onPress={this.handlePreviousWeek}>
            <FontAwesomeIcon
              name="chevron-left"
              size={15}
              color={
                this.state.currentWeekIndex < this.props.entryStore.getWeeklyStats().length - 1
                  ? color.primary
                  : color.transparent
              }
            />
          </TouchableOpacity>
          <Text preset="fieldLabel">{getWeekRangeText(this.state.currentWeekIndex)}</Text>
          <TouchableOpacity onPress={this.handleNextWeek}>
            <FontAwesomeIcon
              name="chevron-right"
              size={15}
              color={this.state.currentWeekIndex > 0 ? color.primary : color.transparent}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={BAR_CHART}>
          {Object.entries(this.props.entryStore.getWeeklyStats()[this.state.currentWeekIndex]).map(
            entry => {
              // Entries are in the form of ['cow', 1]
              return (
                <View
                  key={entry[0] + this.state.currentWeekIndex}
                  style={{ paddingHorizontal: spacing[2], alignItems: "center" }}
                >
                  <Animated.View
                    style={{
                      width: 40,
                      height: this.state[entry[0] + this.state.currentWeekIndex],
                      backgroundColor: color.primary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: color.secondary, fontWeight: "500" }}>{entry[1]}</Text>
                  </Animated.View>
                  <Text style={{ paddingTop: spacing[2], fontSize: 8 }}>{entry[0]}</Text>
                </View>
              )
            },
          )}
        </ScrollView>
        <View style={SETTINGS_BUTTON_CONTAINER}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("settings")}>
            <Ionicons name="md-settings" size={45} color={color.text} />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}
