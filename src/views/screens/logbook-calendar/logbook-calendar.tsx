import * as React from "react"
import { Calendar } from "react-native-calendars"
import { NavigationScreenProps } from "react-navigation"
import { ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"

import { AddEntryButton, ADD_ENTRY_CONTAINER_HEIGHT } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { EntryStoreModel } from "src/models/entry-store"
import { Icon } from "src/views/shared/icon"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"
import { createDashedDate, convertSlashedDateToDashedDate } from "src/lib/utility"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: ADD_ENTRY_CONTAINER_HEIGHT,
}

const ArrowComponent = ({ direction }) => (
  <Icon
    icon="smallChevron"
    style={direction === "right" ? { transform: [{ rotateZ: "180deg" }] } : null}
  />
)

export interface LogbookCalendarScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

interface LogbookCalendarScreenState {}

@inject("entryStore")
@observer
export class LogbookCalendar extends React.Component<
  LogbookCalendarScreenProps,
  LogbookCalendarScreenState
> {
  componentDidMount() {
    this.props.entryStore.resetSelectedDay()
    this.handleDaySelection({ dateString: createDashedDate(new Date()) })
  }
  handleDaySelection = day => {
    this.props.entryStore.selectDay(day)
  }
  render() {
    const selectedDateEntries = this.props.entryStore.entries.filter(entry => entry.selected)
    const markedDates = this.props.entryStore.entries
      .map(entry => {
        let date = convertSlashedDateToDashedDate(entry.date)
        return {
          [date]: {
            selected: entry.selected,
            marked: true,
          },
        }
      })
      .reduce((obj, item) => {
        obj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
        return obj
      }, {})

    markedDates[this.props.entryStore.selectedDate] = {
      ...markedDates[this.props.entryStore.selectedDate],
      selected: true,
    }

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
              markedDates={markedDates}
              onDayPress={this.handleDaySelection}
              renderArrow={direction => <ArrowComponent direction={direction} />}
            />
            {selectedDateEntries.length > 0 && (
              <EntryGroup
                date={selectedDateEntries[0] && selectedDateEntries[0].date}
                entries={selectedDateEntries[0] && selectedDateEntries[0].data}
              />
            )}
          </Screen>
        )}
      />
    )
  }
}
