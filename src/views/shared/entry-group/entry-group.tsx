import * as React from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { inject, observer } from "mobx-react"

import { EntryGroupProps } from "./entry-group.props"
import { Icon } from "src/views/shared/icon"
import { SUPPORTED_ANIMALS, supportedAnimalsTypes } from "src/lib/constants"
import { Text } from "src/views/shared/text"
import { color, spacing } from "src/theme"
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
    const renderAnimalImage = (animalType: supportedAnimalsTypes) => {
      if (SUPPORTED_ANIMALS.includes(animalType)) {
        return <Icon icon={animalType} style={{ height: 38 }} />
      } else {
        return null
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
        {this.props.entries.map((entry, index) => (
          <TouchableOpacity
            style={[LOG_ENTRY, index > 0 && LOG_ENTRY_WITH_OFFSET]}
            key={entry.id}
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
