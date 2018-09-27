import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Calendar } from "react-native-calendars"
import { ViewStyle } from "react-native"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "../../shared/screen"
import { color } from "../../../theme"

export interface LogbookCalendarScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75, // Must match the height of the ADD_ENTRY_CONTAINER
}

// @inject("mobxstuff")
@observer
export class LogbookCalendar extends React.Component<LogbookCalendarScreenProps, {}> {
  render() {
    return (
      <AddEntryButton
        renderScreenContent={() => (
          <Screen style={ROOT} preset="scrollStack">
            <Calendar />
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
