import { types } from "mobx-state-tree"
import { uniqueId } from "src/lib/utility"
import isBefore from "date-fns/is_before"
import { createJSDate } from "src/lib/utility"
import { convertDashedDateToSlashedDate, dashedDateFormatConversion } from "src/lib/utility"
import format from "date-fns/format"

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
    selected: types.boolean,
  })
  .actions(self => ({
    addEntry(entry) {
      self.data.push({
        id: uniqueId(),
        animalType: entry.animalType,
        name: entry.name,
        dateTimestamp: new Date(),
        date: entry.date,
        time: entry.time,
        weightLbs: parseFloat(entry.weight),
        weightKgs: parseFloat(entry.weight),
      })
    },
    deleteEntry(id) {
      console.tron.log("Deleting individual entry")
      self.data = self.data.filter(item => item.id !== id)
    },
  }))

export const EntryStoreModel = types
  .model("EntryStore", {
    entries: types.optional(types.array(DateEntry), []),
    selectedDate: types.string,
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
        self.entries.push(
          DateEntry.create({
            date: entry.date,
            data: [
              {
                id: uniqueId(),
                animalType: entry.animalType,
                name: entry.name,
                dateTimestamp: new Date(),
                date: entry.date,
                time: entry.time,
                weightLbs: parseFloat(entry.weight),
                weightKgs: parseFloat(entry.weight),
              },
            ],
          }),
        )
      }
      self.entries = self.entries.sort(sortDateEntryArray)
      return
    },
    delete(entry) {
      console.tron.log("Looking for entries to delete")
      self.entries.some(storeDateEntry => {
        console.tron.log(storeDateEntry.date, entry.date)
        if (storeDateEntry.date === entry.date) {
          console.tron.log("Found entry to delete")
          storeDateEntry.deleteEntry(entry.id)
          return true
        }
        return false
      })
      self.entries = self.entries.filter(storeDateEntry => storeDateEntry.data.length > 0)
    },
    selectDay(day) {
      const selectedDate = convertDashedDateToSlashedDate(day.dateString)
      self.entries.forEach(entry => {
        if (entry.date !== selectedDate) {
          entry.selected = false
        } else {
          entry.selected = true
        }
        return entry
      })
      self.selectedDate = day.dateString
      return
    },
    resetSelectedDay() {
      self.selectedDate = format(Date.now(), "YYYY-MM-DD")
      self.entries.forEach(entry => (entry.selected = false))
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
