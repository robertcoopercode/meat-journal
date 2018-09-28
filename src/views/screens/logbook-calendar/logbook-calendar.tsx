import * as React from "react"
import { Calendar } from "react-native-calendars"
import { NavigationScreenProps } from "react-navigation"
import { ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"

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
  }
  handleDaySelection = day => {
    console.tron.log(day)
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
              theme={{ arrowColor: color.primary }}
              markedDates={this.state.markedDates}
              onDayPress={this.handleDaySelection}
            />
            <EntryGroup
              date={`Today`.toUpperCase()}
              entries={[
                {
                  type: "cow",
                  name: "Ground Beef",
                  weight: "1.2 lbs",
                  time: "10:00 PM",
                },
                {
                  type: "porc",
                  name: "Bacon",
                  weight: "0.5 lbs",
                  time: "10:30 PM",
                },
              ]}
            />
          </Screen>
        )}
      />
    )
  }
}
