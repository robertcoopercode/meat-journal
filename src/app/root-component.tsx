import * as React from "react"
import SplashScreen from "react-native-splash-screen"
import { Provider } from "mobx-react"

import "../i18n"
import { BackButtonHandler } from "../navigation/back-button-handler"
import { DEFAULT_NAVIGATION_CONFIG } from "../navigation/navigation-config"
import { RootStore } from "../app/root-store"
import { StatefulNavigator } from "../navigation"
import { contains } from "ramda"
import { setupRootStore } from "./setup-root-store"

interface RootComponentState {
  rootStore?: RootStore
}

/**
 * This is the root component of our app.
 */
export class RootComponent extends React.Component<{}, RootComponentState> {
  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  async componentDidMount() {
    SplashScreen.hide()
    this.setState({
      rootStore: await setupRootStore(),
    })
  }

  /**
   * Are we allowed to exit the app?  This is called when the back button
   * is pressed on android.
   *
   * @param routeName The currently active route name.
   */
  canExit(routeName: string) {
    return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes)
  }

  render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for out state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
      return null
    }

    // otherwise, we're ready to render the app

    // --- am: begin list of stores ---
    const otherStores = {
      entryStore: rootStore.entryStore,
      userStore: rootStore.userStore,
    }
    // --- am: end list of stores ---

    return (
      <Provider rootStore={rootStore} navigationStore={rootStore.navigationStore} {...otherStores}>
        <BackButtonHandler canExit={this.canExit}>
          <StatefulNavigator />
        </BackButtonHandler>
      </Provider>
    )
  }
}
