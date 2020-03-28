import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"

import { AddEntryButton } from "src/views/shared/add-entry-button"
import { EntryGroup } from "src/views/shared/entry-group"
import { EntryStoreModel } from "src/models/entry-store"
import { Screen } from "src/views/shared/screen"
import { color } from "src/theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: 75,
}

export interface LogbookListScreenProps extends NavigationScreenProps<{}> {
  entryStore: typeof EntryStoreModel.Type
}

@inject("entryStore")
@observer
export class LogbookList extends React.Component<LogbookListScreenProps, {}> {
  renderEntries = () => {
    return this.props.entryStore.entries.map(entryGroup => {
      return <EntryGroup key={entryGroup.date} date={entryGroup.date} entries={entryGroup.data} />
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
