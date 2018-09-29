import * as React from "react"
import { Calendar } from "react-native-calendars"
import { NavigationScreenProps } from "react-navigation"
import { ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"
import format from "date-fns/format"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"
import { EntryStoreModel } from "src/models/entry-store"
import { dashedDateFormatConversion } from "src/lib/utility"

export interface LogbookCalendarScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75, // Must match the height of the ADD_ENTRY_CONTAINER
}

@inject("entryStore")
@observer
export class LogbookCalendar extends React.Component<LogbookCalendarScreenProps, {}> {
  state = {
    markedDates: this.props.entryStore.entries
      .map(entry => {
        let date = dashedDateFormatConversion(entry.date)
        return {
          [date]: {
            selected: false,
            marked: true,
          },
        }
      })
      .reduce((obj, item) => {
        obj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
        return obj
      }, {}),
    currentEntries:
      (this.props.entryStore.getDateEntries(format(new Date(), "YYYY-MM-DD"))[0] &&
        this.props.entryStore.getDateEntries(format(new Date(), "YYYY-MM-DD"))[0].data) ||
      [],
    currentDate:
      (this.props.entryStore.getDateEntries(format(new Date(), "YYYY-MM-DD"))[0] &&
        this.props.entryStore.getDateEntries(format(new Date(), "YYYY-MM-DD"))[0].date) ||
      "",
  }
  handleDaySelection = day => {
    let selectedDateEntries = []
    let selectedDate = ""
    if (this.props.entryStore.getDateEntries(day.dateString)[0]) {
      selectedDate = this.props.entryStore.getDateEntries(day.dateString)[0].date
      selectedDateEntries = this.props.entryStore.getDateEntries(day.dateString)[0].data
    }
    console.tron.log(selectedDateEntries)
    this.setState({ currentDate: selectedDate, currentEntries: selectedDateEntries })
    this.setState(state => {
      const unselectedDates = Object.keys(state.markedDates).reduce((obj, date) => {
        obj[date] = { ...state.markedDates[date], selected: false }
        return obj
      }, {})
      return {
        markedDates: {
          ...unselectedDates,
          [day.dateString]: { ...state.markedDates[day.dateString], selected: true },
        },
      }
    })
  }
  render() {
    return (
      <AddEntryButton
        renderScreenContent={() => (
          <Screen style={ROOT} preset="scrollStack">
            <Calendar
              theme={{
                arrowColor: color.primary,
                selectedDayBackgroundColor: color.primary,
                dotColor: color.tertiary,
              }}
              markedDates={this.state.markedDates}
              onDayPress={this.handleDaySelection}
            />
            {this.state.currentEntries.length > 0 && (
              <EntryGroup date={this.state.currentDate} entries={this.state.currentEntries} />
            )}
          </Screen>
        )}
      />
    )
  }
}
