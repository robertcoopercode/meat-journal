import { types } from "mobx-state-tree"
import { uniqueId } from "src/lib/utility"
import isBefore from "date-fns/is_before"
import { createJSDate } from "src/lib/utility"
import { dashedDateFormatConversion } from "src/lib/utility"

export const Entry = types.model("Entry", {
  id: types.string,
  animalType: types.string,
  name: types.string,
  dateTimestamp: types.number,
  date: types.string,
  time: types.string,
  weightLbs: types.number,
  weightKgs: types.number,
})

const DateEntry = types
  .model("DateEntry", {
    date: types.string,
    data: types.array(Entry),
  })
  .actions(self => ({
    addEntry(entry) {
      self.data.push({
        id: uniqueId(),
        animalType: entry.animalType,
        name: entry.name,
        dateTimestamp: 10, // TODO
        date: entry.date,
        time: entry.time,
        weightLbs: parseFloat(entry.weight),
        weightKgs: parseFloat(entry.weight),
      })
    },
  }))

export const EntryStoreModel = types
  .model("EntryStore", {
    entries: types.optional(types.array(DateEntry), []),
  })
  .actions(self => ({
    add(entry) {
      const dateAllreadyExists = self.entries.some(storeDateEntry => {
        if (entry.date === storeDateEntry.date) {
          storeDateEntry.addEntry(entry)
          return true
        }
      })
      if (!dateAllreadyExists) {
        self.entries.push({
          date: entry.date,
          data: [
            {
              id: uniqueId(),
              animalType: entry.animalType,
              name: entry.name,
              dateTimestamp: 10, // TODO
              date: entry.date,
              time: entry.time,
              weightLbs: parseFloat(entry.weight),
              weightKgs: parseFloat(entry.weight),
            },
          ],
        })
      }
      self.entries = self.entries.sort(sortDateEntryArray)
      return
    },
  }))
  .views(self => ({
    getDateEntries(date) {
      return self.entries.filter(entry => dashedDateFormatConversion(entry.date) === date)
    },
  }))

const sortDateEntryArray = (compareEntry1, compareEntry2) => {
  console.tron.log("Sorting!")
  if (isBefore(createJSDate(compareEntry1.date), createJSDate(compareEntry2.date))) {
    return 1
  } else {
    return -1
  }
}
