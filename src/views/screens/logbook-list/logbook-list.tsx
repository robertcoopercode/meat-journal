import * as React from "react"
import { inject, observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"
import { formatDate } from "src/lib/utility"
import { EntryStoreModel } from "src/models/entry-store"

export interface LogbookListScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75,
}

@inject("entryStore")
@observer
export class LogbookList extends React.Component<LogbookListScreenProps, {}> {
  cleanData = entry => {
    return {
      ...entry,
      weight: `${entry.weightLbs} lbs`,
    }
  }
  renderEntries = () => {
    return this.props.entryStore.entries.map(entryGroup => {
      return (
        <EntryGroup
          key={entryGroup.date}
          date={formatDate(entryGroup.date)}
          entries={entryGroup.data.map(entry => {
            return this.cleanData(entry)
          })}
        />
      )
    })
  }
  render() {
    return (
      <AddEntryButton
        renderScreenContent={() => (
          <Screen style={ROOT} preset="scrollStack">
            {this.renderEntries()}
          </Screen>
        )}
      />
    )
  }
}