import { types } from "mobx-state-tree"
import { MOCK_ENTRIES } from "./entry-mocks"

const Entry = types.model("Entry", {
  id: types.string,
  createdAt: types.string,
  date: types.string,
  time: types.string,
  type: types.string,
  name: types.string,
  weightLbs: types.number,
  weightKgs: types.number,
})

export const EntryStoreModel = types.model("EntryStore", {
  entries: types.optional(types.array(Entry), MOCK_ENTRIES),
})

export const entryStore = EntryStoreModel.create({
  entries: MOCK_ENTRIES,
})
