import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"

export interface LogbookListScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75,
}

// @inject("mobxstuff")
@observer
export class LogbookList extends React.Component<LogbookListScreenProps, {}> {
  render() {
    return (
      <AddEntryButton
        renderScreenContent={() => (
          <Screen style={ROOT} preset="scrollStack">
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
            <EntryGroup
              date={`September 15`.toUpperCase()}
              entries={[
                {
                  type: "cow",
                  name: "Ground Beef",
                  weight: "1.0 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "lamb",
                  name: "Lamb",
                  weight: "1.5 lbs",
                  time: "9:30 PM",
                },
              ]}
            />
            <EntryGroup
              date={`September 14`.toUpperCase()}
              entries={[
                {
                  type: "cow",
                  name: "Beef Cubes",
                  weight: "2.0 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "porc",
                  name: "Porc Chops",
                  weight: "0.5 lbs",
                  time: "9:15 PM",
                },
              ]}
            />
            <EntryGroup
              date={`September 13`.toUpperCase()}
              entries={[
                {
                  type: "lamb",
                  name: "Lamb",
                  weight: "1.2 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "porc",
                  name: "Ground Porc",
                  weight: "0.8 lbs",
                  time: "9:30 PM",
                },
              ]}
            />
            <EntryGroup
              date={`September 12`.toUpperCase()}
              entries={[
                {
                  type: "horse",
                  name: "Horse Flank",
                  weight: "1.2 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "cow",
                  name: "Steak",
                  weight: "1.2 lbs",
                  time: "9:30 PM",
                },
              ]}
            />
            <EntryGroup
              date={`September 11`.toUpperCase()}
              entries={[
                {
                  type: "duck",
                  name: "Duck Breast",
                  weight: "0.8 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "cow",
                  name: "Beef Flank",
                  weight: "1.4 lbs",
                  time: "9:30 PM",
                },
              ]}
            />
            <EntryGroup
              date={`September 10`.toUpperCase()}
              entries={[
                {
                  type: "lamb",
                  name: "Lamb Chops",
                  weight: "0.4 lbs",
                  time: "9:00 PM",
                },
                {
                  type: "porc",
                  name: "Ground Porc",
                  weight: "2.2 lbs",
                  time: "9:30 PM",
                },
              ]}
            />
          </Screen>
        )}
      />
    )
  }
}
