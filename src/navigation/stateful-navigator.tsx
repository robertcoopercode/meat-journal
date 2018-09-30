import * as React from "react"
import { inject, observer } from "mobx-react"
import { RootNavigator } from "./root-navigator"
import { NavigationStore } from "./navigation-store"
import { alwaysDisplayWelcomeScreen } from "src/app/environment-variables"

interface StatefulNavigatorProps {
  navigationStore?: NavigationStore
}

@inject("navigationStore")
@observer
export class StatefulNavigator extends React.Component<StatefulNavigatorProps, {}> {
  componentDidMount() {
    if (alwaysDisplayWelcomeScreen) {
      this.props.navigationStore.reset() // Comment this out if you want to retain the navigation state
    }
  }
  render() {
    // grab our state & dispatch from our navigation store
    const { state, dispatch, addListener } = this.props.navigationStore

    // create a custom navigation implementation
    const navigation = {
      dispatch,
      state,
      addListener,
    }

    return (
      <React.Fragment>
        <RootNavigator navigation={navigation} />
      </React.Fragment>
    )
  }
}
