import * as React from "react"
import { observer } from "mobx-react"
import { Image, View, ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "src/views/shared/screen"
import { Text } from "src/views/shared/text"
import { color, spacing } from "src/theme"

export interface LogbookListScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const LOG_ENTRY_GROUP = {
  // alignItems: "stretch",
}

const LOG_ENTRY_DATE = {
  paddingLeft: spacing[4],
  paddingBottom: spacing[2],
  paddingTop: spacing[5],
}

const LOG_ENTRY = {
  flexDirection: "row",
  paddingVertical: 10,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: color.border,
}

const LOG_ENTRY_IMAGE = {
  width: 80,
  alignItems: "center",
}

const LOG_ENTRY_DETAILS = {
  flex: 1,
}

const LOG_ENTRY_DETAILS_WEIGHT = {
  fontWeight: "400",
  fontSize: 12,
  marginTop: 5,
}

const LOG_ENTRY_TIME = {
  width: 90,
  justifyContent: "center",
  alignItems: "center",
}

// @inject("mobxstuff")
@observer
export class LogbookList extends React.Component<LogbookListScreenProps, {}> {
  render() {
    return (
      <Screen style={ROOT} preset="scrollStack">
        <EntryGroup
          date={`September 15`.toUpperCase()}
          entries={[
            {
              type="cow"
              name: "Ground Beef",
              weight: "1.2 lbs",
              time: "10:00 PM",
            },
            {
              type="porc"
              name: "Bacon",
              weight: "0.5 lbs",
              time: "10:30 PM",
            },
          ]}
        />
      </Screen>
    )
  }
}
