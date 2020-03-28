import * as React from "react"
import Ionicons from "react-native-vector-icons/Ionicons"

interface TabNavigationIconProps {
  focused: boolean
  tintColor: string
}

export function LogbookIcon(props: TabNavigationIconProps) {
  return <Ionicons name="md-clipboard" size={25} color={props.tintColor} />
}

export function StatisticsIcon(props: TabNavigationIconProps) {
  return <Ionicons name="md-stats" size={25} color={props.tintColor} />
}
