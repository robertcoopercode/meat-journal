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
import { getWeekRangeText, getMonthRangeText } from "src/lib/utility"

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

const NO_ENTRIES_TEXT_CONTAINER: ViewStyle = {
  alignSelf: "center",
}

interface StatisticsScreenState {
  currentWeekIndex: number
  currentMonthIndex: number
}

@inject("entryStore")
@observer
export class Statistics extends React.Component<StatisticsScreenProps, StatisticsScreenState> {
  state = {
    currentWeekIndex: 0, // 0 corresponds to the current week and 1 corresponds to last week...
    currentMonthIndex: 0, // 0 corresponds to the current month and 1 corresponds to last month...
  }
  componentDidMount() {
    if (this.props.navigation.state.routeName === "statisticsWeekly") {
      this.setupBarChartAnimatedHeight(
        this.state.currentWeekIndex,
        this.props.entryStore.getWeeklyStats(),
      )
    } else {
      this.setupBarChartAnimatedHeight(
        this.state.currentWeekIndex,
        this.props.entryStore.getMonthlyStats(),
      )
    }
  }
  setupBarChartAnimatedHeight = (currentIndex, statistics) => {
    const largestNumber = Math.max(...Object.values(statistics[currentIndex]))
    Object.entries(statistics[currentIndex]).forEach(entry => {
      // Entries are in the form of ['cow', 1]
      this.setState(
        {
          [`${entry[0]}${currentIndex}`]: new Animated.Value(0),
        },
        () => {
          Animated.timing(this.state[`${entry[0]}${currentIndex}`], {
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
        this.setupBarChartAnimatedHeight(
          state.currentWeekIndex + 1,
          this.props.entryStore.getWeeklyStats(),
        )
        return { currentWeekIndex: state.currentWeekIndex + 1 }
      } else {
        return state
      }
    })
  }
  handleNextWeek = () => {
    this.setState(state => {
      if (state.currentWeekIndex != 0) {
        this.setupBarChartAnimatedHeight(
          state.currentWeekIndex - 1,
          this.props.entryStore.getWeeklyStats(),
        )
        return { currentWeekIndex: state.currentWeekIndex - 1 }
      } else {
        return state
      }
    })
  }
  handlePreviousMonth = () => {
    this.setState(state => {
      if (state.currentMonthIndex < this.props.entryStore.getMonthlyStats().length - 1) {
        this.setupBarChartAnimatedHeight(
          state.currentMonthIndex + 1,
          this.props.entryStore.getMonthlyStats(),
        )
        return { currentMonthIndex: state.currentMonthIndex + 1 }
      } else {
        return state
      }
    })
  }
  handleNextMonth = () => {
    this.setState(state => {
      if (state.currentMonthIndex != 0) {
        this.setupBarChartAnimatedHeight(
          state.currentMonthIndex - 1,
          this.props.entryStore.getMonthlyStats(),
        )
        return { currentMonthIndex: state.currentMonthIndex - 1 }
      } else {
        return state
      }
    })
  }
  render() {
    let statisticsType = this.props.navigation.state.routeName
    let chartTitle, nextButtonHandler, previousButtonHandler, currentStatistics, currentIndex, type
    switch (statisticsType) {
      case "statisticsWeekly":
        chartTitle = getWeekRangeText(this.state.currentWeekIndex)
        nextButtonHandler = this.handleNextWeek
        previousButtonHandler = this.handlePreviousWeek
        currentStatistics = this.props.entryStore.getWeeklyStats()[this.state.currentWeekIndex]
        currentIndex = this.state.currentWeekIndex
        type = "week"
        break
      case "statisticsMonthly":
        chartTitle = getMonthRangeText(this.state.currentMonthIndex)
        nextButtonHandler = this.handleNextMonth
        previousButtonHandler = this.handlePreviousMonth
        currentStatistics = this.props.entryStore.getMonthlyStats()[this.state.currentMonthIndex]
        currentIndex = this.state.currentMonthIndex
        type = "month"
        break
    }
    return (
      <Screen style={ROOT} preset="fixed">
        <View style={BAR_CHART_CONTROLS}>
          <TouchableOpacity onPress={previousButtonHandler}>
            <FontAwesomeIcon
              name="chevron-left"
              size={15}
              color={
                currentIndex < this.props.entryStore.getWeeklyStats().length - 1
                  ? color.primary
                  : color.transparent
              }
            />
          </TouchableOpacity>
          <Text preset="fieldLabel">{chartTitle}</Text>
          <TouchableOpacity onPress={nextButtonHandler}>
            <FontAwesomeIcon
              name="chevron-right"
              size={15}
              color={currentIndex > 0 ? color.primary : color.transparent}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={BAR_CHART}>
          {Object.entries(currentStatistics).length > 0 ? (
            Object.entries(currentStatistics).map(entry => {
              // Entries are in the form of ['cow', 1]
              return (
                <View
                  key={entry[0] + currentIndex}
                  style={{ paddingHorizontal: spacing[2], alignItems: "center" }}
                >
                  <Animated.View
                    style={{
                      width: 40,
                      height: this.state[entry[0] + currentIndex],
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
            })
          ) : (
            <View style={NO_ENTRIES_TEXT_CONTAINER}>
              <Text>{`No entries for this ${type} 😐`}</Text>
            </View>
          )}
        </ScrollView>
        <View style={SETTINGS_BUTTON_CONTAINER}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("settingsScreen")}>
            <Ionicons name="md-settings" size={45} color={color.text} />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}
