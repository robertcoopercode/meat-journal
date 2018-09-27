import * as React from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Text } from "src/views/shared/text"
import { EntryGroupProps } from "./entry-group.props"
import { color, spacing } from "src/theme"
import { Icon } from "src/views/shared/icon"

const LOG_ENTRY_DATE: TextStyle = {
  paddingLeft: spacing[4],
  paddingBottom: spacing[2],
  paddingTop: spacing[5],
}

const LOG_ENTRY: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 10,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: color.border,
}

const LOG_ENTRY_WITH_OFFSET: ViewStyle = {
  marginTop: -1,
}

const LOG_ENTRY_IMAGE: ImageStyle = {
  width: 80,
  alignItems: "center",
}

const LOG_ENTRY_DETAILS: ViewStyle = {
  flex: 1,
}

const LOG_ENTRY_DETAILS_WEIGHT: TextStyle = {
  fontWeight: "400",
  fontSize: 12,
  marginTop: 5,
}

const LOG_ENTRY_TIME: ViewStyle = {
  width: 90,
  justifyContent: "center",
  alignItems: "center",
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function EntryGroup(props: EntryGroupProps) {
  const renderAnimalImage = animalType => {
    switch (animalType) {
      case "cow":
        return <Icon icon={"cow"} />
      case "porc":
        return <Icon icon={"porc"} />
      case "duck":
        return <Icon icon={"duck"} />
      case "horse":
        return <Icon icon={"horse"} />
      case "lamb":
        return <Icon icon={"lamb"} />
      default:
        return <Icon icon={"cow"} />
    }
  }

  return (
    <View>
      <Text style={LOG_ENTRY_DATE} preset="header">
        {props.date}
      </Text>
      {/* TODO: Use a unique ID instead of the index. There could be problems
      with relying on the index once the ability to delete entries is added */}
      {props.entries.map((entry, index) => (
        <TouchableOpacity
          style={[LOG_ENTRY, index > 0 && LOG_ENTRY_WITH_OFFSET]}
          key={index}
          onPress={() => null}
        >
          <View style={LOG_ENTRY_IMAGE}>{renderAnimalImage(entry.animalType)}</View>
          <View style={LOG_ENTRY_DETAILS}>
            <Text preset="fieldLabel">{entry.name}</Text>
            <Text style={LOG_ENTRY_DETAILS_WEIGHT}>{entry.weight}</Text>
          </View>
          <View style={LOG_ENTRY_TIME}>
            <Text preset="fieldLabel">{entry.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
