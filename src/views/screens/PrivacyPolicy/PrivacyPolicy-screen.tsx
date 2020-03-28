import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, WebView } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface PrivacyPolicyScreenProps extends NavigationScreenProps<{}> {}

const WEBVIEW: ViewStyle = {
  position: "absolute",
  left: 0,
  width: "100%",
  height: "100%",
}

// @inject("mobxstuff")
@observer
export class PrivacyPolicy extends React.Component<PrivacyPolicyScreenProps, {}> {
  render() {
    return (
      <WebView
        source={{ uri: "https://www.robertcooper.me/meat-journal-privacy-policy" }}
        style={WEBVIEW}
      />
    )
  }
}
