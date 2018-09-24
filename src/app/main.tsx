// Welcome to the main entry point.
//
// In this file, we'll be kicking off our app or storybook.

import { AppRegistry, YellowBox } from "react-native"
import { RootComponent } from "./root-component"
import { StorybookUIRoot } from "../../storybook"

// Ignore lame ass warnings that appear for no understandable reason
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "Unable to symbolicate stack trace: The stack is null",
])

/**
 * This needs to match what's found in your AppDelegate.m and MainActivity.java.
 */
const APP_NAME = "MeatJournal"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

// appease the typescript overlords
declare global {
  var module
}

if (SHOW_STORYBOOK && __DEV__) {
  // 🎗 REMINDER: Storybook has a server you need to run from a terminal window.
  //
  // $> yarn run storybook
  //
  AppRegistry.registerComponent(APP_NAME, () => StorybookUIRoot)
} else {
  // load our app
  AppRegistry.registerComponent(APP_NAME, () => RootComponent)
}
