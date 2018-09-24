import * as React from "react"
import { inject, observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"
import { formatDate } from "src/lib/utility"

export interface LogbookListScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75,
}

@inject("entryStore")
@observer
export class LogbookList extends React.Component<LogbookListScreenProps, {}> {
  cleanData = entry => {
    return entry.map(item => {
      return {
        ...item,
        weight: `${item.weightLbs} lbs`,
      }
    })
  }
  renderEntries = () => {
    let groupedByDate = {}
    this.props.entryStore.entries.map(entry => {
      if (groupedByDate[entry.date]) {
        groupedByDate[entry.date].push(entry)
      } else {
        groupedByDate[entry.date] = [entry]
      }
    })
    return Object.keys(groupedByDate).map(date => {
      return (
        <EntryGroup
          key={date}
          date={formatDate(date)}
          entries={this.cleanData(groupedByDate[date])}
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
