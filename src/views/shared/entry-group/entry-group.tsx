import * as React from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"

import { Text } from "src/views/shared/text"
import { EntryGroupProps } from "./entry-group.props"
import { color, spacing } from "src/theme"
import { Icon } from "src/views/shared/icon"
import { formatDate } from "src/lib/utility"

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

@inject("navigationStore")
@inject("userStore")
@observer
export class EntryGroup extends React.Component<EntryGroupProps, {}> {
  render() {
    const renderAnimalImage = animalType => {
      switch (animalType) {
        case "cow":
          return <Icon icon={"cow"} style={{ height: 38 }} />
        case "porc":
          return <Icon icon={"porc"} style={{ height: 38 }} />
        case "duck":
          return <Icon icon={"duck"} style={{ height: 38 }} />
        case "horse":
          return <Icon icon={"horse"} style={{ height: 38 }} />
        case "lamb":
          return <Icon icon={"lamb"} style={{ height: 38 }} />
        case "bear":
          return <Icon icon={"bear"} style={{ height: 38 }} />
        case "buffalo":
          return <Icon icon={"buffalo"} style={{ height: 38 }} />
        case "chicken":
          return <Icon icon={"chicken"} style={{ height: 38 }} />
        case "fish":
          return <Icon icon={"fish"} style={{ height: 38 }} />
        case "kangaroo":
          return <Icon icon={"kangaroo"} style={{ height: 38 }} />
        case "shellfish":
          return <Icon icon={"shrimp"} style={{ height: 38 }} />
        case "turkey":
          return <Icon icon={"turkey"} style={{ height: 38 }} />
        default:
          return <Icon icon={"cow"} style={{ height: 38 }} />
      }
    }

    const computeWeight = entry => {
      if (this.props.userStore.weightUnits === "kgs") {
        return `${entry.weightKgs} kgs`
      } else {
        return `${entry.weightLbs} lbs`
      }
    }

    return (
      <View>
        <Text style={LOG_ENTRY_DATE} preset="header">
          {formatDate(this.props.date)}
        </Text>
        {/* TODO: Use a unique ID instead of the index. There could be problems
        with relying on the index once the ability to delete entries is added */}
        {this.props.entries.map((entry, index) => (
          <TouchableOpacity
            style={[LOG_ENTRY, index > 0 && LOG_ENTRY_WITH_OFFSET]}
            key={index}
            onPress={() => this.props.navigationStore.navigateToEditEntry(entry)}
          >
            <View style={LOG_ENTRY_IMAGE}>{renderAnimalImage(entry.animalType)}</View>
            <View style={LOG_ENTRY_DETAILS}>
              <Text preset="fieldLabel">{entry.name}</Text>
              <Text style={LOG_ENTRY_DETAILS_WEIGHT}>{computeWeight(entry)}</Text>
            </View>
            <View style={LOG_ENTRY_TIME}>
              <Text preset="fieldLabel">{entry.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
