import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "src/navigation/navigation-store"
import { EntryStoreModel } from "src/models/entry-store"
import { UserStoreModel } from "src/models/user-store"
import { MOCK_ENTRIES } from "src/models/entry-mocks"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  entryStore: types.optional(EntryStoreModel, { entries: MOCK_ENTRIES }),
  userStore: types.optional(UserStoreModel, { weightUnits: "lbs" }),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
