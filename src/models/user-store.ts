import { types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("EntryStore", {
    weightUnits: types.union(types.literal("lbs"), types.literal("kgs")),
  })
  .actions(self => ({
    updateWeightUnits(units) {
      return (self.weightUnits = units)
    },
  }))