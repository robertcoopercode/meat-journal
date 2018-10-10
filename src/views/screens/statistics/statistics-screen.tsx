import * as React from "react"
import { inject, observer } from "mobx-react"
import { Animated, View, ViewStyle, TouchableOpacity, ScrollView, TextStyle } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

import { Icon } from "src/views/shared/icon"
import { Text } from "src/views/shared/text"
import { Screen } from "src/views/shared/screen"
import { color, spacing } from "src/theme"
import { NavigationScreenProps } from "react-navigation"
import { EntryStoreModel } from "src/models/entry-store"
import { ADD_ENTRY_CONTAINER_HEIGHT } from "src/views/shared/add-entry-button"
import { getWeekRangeText, getMonthRangeText, getYearRangeText } from "src/lib/utility"
import { UserStoreModel } from "src/models/user-store"
import {
  Header,
  HeaderMenuItem,
  MENU_ITEM,
  ACTIVE_MENU_ITEM,
  MENU_ITEM_TEXT,
  ACTIVE_MENU_ITEM_TEXT,
} from "src/navigation/custom-header"

export interface StatisticsScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
  userStore: typeof UserStoreModel.Type
}

const HEADER_STYLE: ViewStyle = {
  width: "100%",
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingHorizontal: spacing[5],
}

const BAR_CHART_CONTROLS: ViewStyle = {
  paddingVertical: spacing[5],
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  width: 250,
}

const WEIGHT_CONSUMED_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderColor: color.border,
  paddingBottom: spacing[2],
  marginBottom: spacing[3],
  width: "100%",
}

const WEIGHT_CONSUMED_LABEL: TextStyle = {
  fontSize: 14,
}

const WEIGHT_CONSUMED_VALUE: TextStyle = {
  fontSize: 14,
}

const BAR_CHART: ViewStyle = {
  flexGrow: 0,
  alignItems: "flex-start",
  minWidth: "100%",
  paddingBottom: spacing[2],
}

const BAR_CHART_CELL: ViewStyle = {
  paddingBottom: spacing[2],
}

const BAR_CHART_CELL_VALUE: TextStyle = {
  marginLeft: spacing[2],
  fontWeight: "500",
}

const BAR_CHART_CELL_LABEL: TextStyle = {
  paddingBottom: spacing[1],
  fontSize: 10,
  fontWeight: "700",
}

const BAR_CHART_BAR_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const SETTINGS_BUTTON_CONTAINER: ViewStyle = {
  position: "absolute",
  height: ADD_ENTRY_CONTAINER_HEIGHT,
  bottom: 0,
  width: "100%",
  alignItems: "flex-end",
  justifyContent: "center",
  paddingRight: spacing[5],
}

const NO_ENTRIES_TEXT_CONTAINER: ViewStyle = {
  width: "100%",
  alignItems: "center",
}

const INITIAL_STATE = {
  period: "weekly",
  currentWeekIndex: 0, // 0 corresponds to the current week and 1 corresponds to last week...
  currentMonthIndex: 0, // 0 corresponds to the current month and 1 corresponds to last month...
  currentYearIndex: 0, // 0 corresponds to the current year and 1 corresponds to last year...
  chartLoaded: false,
}

type PeriodType = "weekly" | "monthly" | "yearly"

interface StatisticsScreenState {
  period: PeriodType
  currentWeekIndex: number
  currentMonthIndex: number
  currentYearIndex: number
  chartLoaded: boolean
}

@inject("userStore")
@inject("entryStore")
@observer
export class Statistics extends React.Component<StatisticsScreenProps, StatisticsScreenState> {
  _focusSubscription: any
  state = INITIAL_STATE
  componentDidMount() {
    if (this._focusSubscription === undefined) {
      this.loadChart()
      this._focusSubscription = this.props.navigation.addListener("didFocus", this.loadChart)
    }
  }
  componentWillUnmount() {
    this._focusSubscription.remove()
  }
  resetState = () => {
    this.setState({ chartLoaded: false })
  }
  loadChart = () => {
    if (!this.state.chartLoaded || this.props.entryStore.newlyUpdatedEntry) {
      if (this.state.period === "weekly") {
        this.setupBarChartAnimatedWidth(
          this.state.currentWeekIndex,
          this.props.entryStore.getWeeklyStats(this.props.userStore.weightUnits),
        )
      } else if (this.state.period === "monthly") {
        this.setupBarChartAnimatedWidth(
          this.state.currentMonthIndex,
          this.props.entryStore.getMonthlyStats(this.props.userStore.weightUnits),
        )
      } else {
        this.setupBarChartAnimatedWidth(
          this.state.currentYearIndex,
          this.props.entryStore.getYearlyStats(this.props.userStore.weightUnits),
        )
      }
      this.props.entryStore.resetNewlyUpdatedEntry()
    }
    this.setState({ chartLoaded: true })
  }
  setupBarChartAnimatedWidth = (currentIndex, statistics) => {
    if (statistics[currentIndex]) {
      const statValues = statistics[currentIndex].reduce((acc, currentValue) => {
        acc.push(currentValue[1])
        return acc
      }, [])
      const largestNumber = Math.max(...statValues)
      statistics[currentIndex].forEach(entry => {
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
  }
  formatNumber = unformattedNumber => {
    // Round number to first decimal place
    return Math.round(unformattedNumber * 10) / 10
  }
  calculateTotalWeight = statistics => {
    const totalWeight = statistics.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue[1]),
      0,
    )
    return Math.round(totalWeight * 100) / 100
  }
  handlePreviousPeriod = (period: PeriodType) => {
    this.setState(state => {
      const getPeriodValues = period => {
        const periodValues = {
          weekly: {
            currentIndexName: "currentWeekIndex",
            getPeriodStats: this.props.entryStore.getWeeklyStats,
          },
          monthly: {
            currentIndexName: "currentMonthIndex",
            getPeriodStats: this.props.entryStore.getMonthlyStats,
          },
          yearly: {
            currentIndexName: "currentYearIndex",
            getPeriodStats: this.props.entryStore.getYearlyStats,
          },
        }
        return periodValues[period]
      }

      const periodValues = getPeriodValues(period)
      if (
        state[periodValues.currentIndexName] <
        periodValues.getPeriodStats(this.props.userStore.weightUnits).length - 1
      ) {
        this.setupBarChartAnimatedWidth(
          state[periodValues.currentIndexName] + 1,
          periodValues.getPeriodStats(this.props.userStore.weightUnits),
        )
        return { [periodValues.currentIndexName]: state[periodValues.currentIndexName] + 1 }
      } else {
        return state
      }
    })
  }
  handleNextPeriod = (period: PeriodType) => {
    this.setState(state => {
      const getPeriodValues = period => {
        const periodValues = {
          weekly: {
            currentIndexName: "currentWeekIndex",
            getPeriodStats: this.props.entryStore.getWeeklyStats,
          },
          monthly: {
            currentIndexName: "currentMonthIndex",
            getPeriodStats: this.props.entryStore.getMonthlyStats,
          },
          yearly: {
            currentIndexName: "currentYearIndex",
            getPeriodStats: this.props.entryStore.getYearlyStats,
          },
        }
        return periodValues[period]
      }

      const periodValues = getPeriodValues(period)

      if (state[periodValues.currentIndexName] != 0) {
        this.setupBarChartAnimatedWidth(
          state[periodValues.currentIndexName] - 1,
          periodValues.getPeriodStats(this.props.userStore.weightUnits),
        )
        return { [periodValues.currentIndexName]: state[periodValues.currentIndexName] - 1 }
      } else {
        return state
      }
    })
  }
  handleChangePeriod = period => {
    this.setState({ period, chartLoaded: false }, () => {
      this.loadChart()
    })
  }
  renderHeader = () => (
    <Header
      style={HEADER_STYLE}
      renderMenuItems={() => (
        <React.Fragment>
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(this.state.period === "weekly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(this.state.period === "weekly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => this.handleChangePeriod("weekly")}
            text="Weekly"
          />
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(this.state.period === "monthly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(this.state.period === "monthly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => this.handleChangePeriod("monthly")}
            text="Monthly"
          />
          <HeaderMenuItem
            containerStyle={{
              ...MENU_ITEM,
              ...(this.state.period === "yearly" ? ACTIVE_MENU_ITEM : {}),
            }}
            textStyle={{
              ...MENU_ITEM_TEXT,
              ...(this.state.period === "yearly" ? ACTIVE_MENU_ITEM_TEXT : {}),
            }}
            onPress={() => this.handleChangePeriod("yearly")}
            text="Yearly"
          />
        </React.Fragment>
      )}
    />
  )
  render() {
    let chartTitle,
      nextButtonHandler,
      previousButtonHandler,
      currentStatistics,
      currentIndex,
      statistics,
      type
    switch (this.state.period) {
      case "weekly":
        chartTitle = getWeekRangeText(this.state.currentWeekIndex)
        nextButtonHandler = () => this.handleNextPeriod("weekly")
        previousButtonHandler = () => this.handlePreviousPeriod("weekly")
        statistics = this.props.entryStore.getWeeklyStats(this.props.userStore.weightUnits)
        currentStatistics = statistics[this.state.currentWeekIndex]
        currentIndex = this.state.currentWeekIndex
        type = "week"
        break
      case "monthly":
        chartTitle = getMonthRangeText(this.state.currentMonthIndex)
        nextButtonHandler = () => this.handleNextPeriod("monthly")
        previousButtonHandler = () => this.handlePreviousPeriod("monthly")
        statistics = this.props.entryStore.getMonthlyStats(this.props.userStore.weightUnits)
        currentStatistics = statistics[this.state.currentMonthIndex]
        currentIndex = this.state.currentMonthIndex
        type = "month"
        break
      case "yearly":
        chartTitle = getYearRangeText(this.state.currentMonthIndex)
        nextButtonHandler = () => this.handleNextPeriod("yearly")
        previousButtonHandler = () => this.handlePreviousPeriod("yearly")
        statistics = this.props.entryStore.getYearlyStats(this.props.userStore.weightUnits)
        currentStatistics = statistics[this.state.currentYearIndex]
        currentIndex = this.state.currentYearIndex
        type = "year"
        break
    }
    return (
      <React.Fragment>
        {this.renderHeader()}
        <Screen style={ROOT} preset="fixed">
          <View style={BAR_CHART_CONTROLS}>
            <TouchableOpacity onPress={previousButtonHandler}>
              {currentIndex < statistics.length - 1 && <Icon icon="smallChevron" />}
            </TouchableOpacity>
            <Text preset="fieldLabel">{chartTitle}</Text>
            <TouchableOpacity onPress={nextButtonHandler}>
              {currentIndex > 0 && (
                <Icon icon="smallChevron" style={{ transform: [{ rotateZ: "180deg" }] }} />
              )}
            </TouchableOpacity>
          </View>
          {currentStatistics.length > 0 ? (
            <React.Fragment>
              <View style={WEIGHT_CONSUMED_CONTAINER}>
                <Text
                  style={WEIGHT_CONSUMED_LABEL}
                  tx={
                    this.props.userStore.weightUnits === "kgs"
                      ? "statistics.weightConsumedKgs"
                      : "statistics.weightConsumedLbs"
                  }
                  preset="fieldLabel"
                />
                <Text style={WEIGHT_CONSUMED_VALUE}>
                  {this.calculateTotalWeight(currentStatistics)}
                </Text>
              </View>
              <ScrollView contentContainerStyle={BAR_CHART}>
                {currentStatistics.map(entry => {
                  // Entries are in the form of ['cow', 1]
                  return (
                    <View key={entry[0] + currentIndex} style={BAR_CHART_CELL}>
                      <Text style={BAR_CHART_CELL_LABEL}>{entry[0]}</Text>
                      <View style={BAR_CHART_BAR_CONTAINER}>
                        <Animated.View
                          style={{
                            height: 40,
                            width: this.state[entry[0] + currentIndex],
                            backgroundColor: color.primary,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                        <Text style={BAR_CHART_CELL_VALUE}>{this.formatNumber(entry[1])}</Text>
                      </View>
                    </View>
                  )
                })}
              </ScrollView>
            </React.Fragment>
          ) : (
            <View style={NO_ENTRIES_TEXT_CONTAINER}>
              <Text>{`No entries for this ${type} 😐`}</Text>
            </View>
          )}
        </Screen>
        <View style={SETTINGS_BUTTON_CONTAINER}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("settingsScreen")}>
            <Ionicons name="md-settings" size={45} color={color.text} />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    )
  }
}
