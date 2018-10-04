import { types } from "mobx-state-tree"
import isBefore from "date-fns/is_before"
import {
  createJSDate,
  createIsoFormattedDate,
  uniqueId,
  getStartOfWeek,
  getStartOfMonth,
  getStartOfYear,
  convertDashedDateToSlashedDate,
  dashedDateFormatConversion,
  isSameWeek,
  isSameMonth,
  isSameYear,
  addWeek,
  addMonth,
  addYear,
} from "src/lib/utility"
import format from "date-fns/format"
import differenceInWeeks from "date-fns/difference_in_weeks"
import differenceInMonths from "date-fns/difference_in_months"
import differenceInYears from "date-fns/difference_in_years"
import parse from "date-fns/parse"

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
        dateTimestamp: Date.now(),
        date: entry.date,
        time: entry.time,
        weightLbs: parseFloat(entry.weight),
        weightKgs: parseFloat(entry.weight),
      })
      self.data = self.data.sort(timeComparison)
    },
    // updateEntry(entry) {
    //   self.data = self.data.map(item => {
    //     if (item.id === entry.id) {
    //       let updatedEntry = {
    //         ...entry,
    //         dateTimestamp: Date.now(),
    //         weightLbs: parseFloat(entry.weight),
    //         weightKgs: parseFloat(entry.weight),
    //       }
    //       return updatedEntry
    //     }
    //     return item
    //   })
    //   self.data = self.data.sort(timeComparison)
    // },
    deleteEntry(id) {
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
                dateTimestamp: Date.now(),
                date: entry.date,
                time: entry.time,
                weightLbs: parseFloat(entry.weight),
                weightKgs: parseFloat(entry.weight),
              },
            ],
            selected: false,
          }),
        )
      }
      self.entries = self.entries.sort(dateComparison)
      return
    },
    update(previousEntry, entry) {
      self.entries.some(storeDateEntry => {
        // First delete the previous entry
        if (storeDateEntry.date === previousEntry.date) {
          storeDateEntry.deleteEntry(previousEntry.id)
          return true
        }
        return false
      })
      // Remove any date groups that no longer have entries
      self.entries = self.entries.filter(storeDateEntry => storeDateEntry.data.length > 0)
      // Add back the entry with the updated values
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
                dateTimestamp: Date.now(),
                date: entry.date,
                time: entry.time,
                weightLbs: parseFloat(entry.weight),
                weightKgs: parseFloat(entry.weight),
              },
            ],
            selected: false,
          }),
        )
      }
      return (self.entries = self.entries.sort(dateComparison))

      // self.entries.some(storeDateEntry => {
      //   if (storeDateEntry.date === entry.date) {
      //     storeDateEntry.updateEntry(entry)
      //     return true
      //   }
      //   return false
      // })
      // self.entries = self.entries.sort(dateComparison)
      // return
    },
    delete(entry) {
      self.entries.some(storeDateEntry => {
        if (storeDateEntry.date === entry.date) {
          storeDateEntry.deleteEntry(entry.id)
          return true
        }
        return false
      })
      self.entries = self.entries.filter(storeDateEntry => storeDateEntry.data.length > 0)
    },
    selectDay(day) {
      console.tron.log("Selected day: ", day)
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
    getWeeklyStats() {
      const weekStats = [{}]
      let startOfWeek = getStartOfWeek(new Date())
      self.entries.forEach(entry => {
        let entryAdded = false
        while (weekStats.length < 30 && !entryAdded) {
          if (isSameWeek(startOfWeek, createJSDate(entry.date))) {
            const currentWeekIndex = Math.abs(
              differenceInWeeks(startOfWeek, getStartOfWeek(new Date())),
            )
            if (weekStats[currentWeekIndex]) {
              entry.data.forEach(item => {
                if (weekStats[currentWeekIndex][item.animalType]) {
                  weekStats[currentWeekIndex][item.animalType] =
                    weekStats[currentWeekIndex][item.animalType] + item.weightKgs
                } else {
                  weekStats[currentWeekIndex][item.animalType] = item.weightKgs
                }
              })
            }
            entryAdded = true
          } else {
            startOfWeek = setNewStartOfWeek(startOfWeek)
            weekStats.push({})
          }
        }
      })
      return weekStats
      function setNewStartOfWeek(previousWeekStartDate) {
        return addWeek(previousWeekStartDate, -1)
      }
    },
    getMonthlyStats() {
      const monthStats = [{}]
      let startOfMonth = getStartOfMonth(new Date())
      self.entries.forEach(entry => {
        let entryAdded = false
        while (monthStats.length < 30 && !entryAdded) {
          if (isSameMonth(startOfMonth, createJSDate(entry.date))) {
            const currentMonthIndex = Math.abs(
              differenceInMonths(startOfMonth, getStartOfMonth(new Date())),
            )
            if (monthStats[currentMonthIndex]) {
              entry.data.forEach(item => {
                if (monthStats[currentMonthIndex][item.animalType]) {
                  monthStats[currentMonthIndex][item.animalType] =
                    monthStats[currentMonthIndex][item.animalType] + item.weightKgs
                } else {
                  monthStats[currentMonthIndex][item.animalType] = item.weightKgs
                }
              })
            }
            entryAdded = true
          } else {
            startOfMonth = setNewStartOfMonth(startOfMonth)
            monthStats.push({})
          }
        }
      })
      return monthStats
      function setNewStartOfMonth(previousMonthStartDate) {
        return addMonth(previousMonthStartDate, -1)
      }
    },
    getYearlyStats() {
      const yearStats = [{}]
      let startOfYear = getStartOfYear(new Date())
      self.entries.forEach(entry => {
        let entryAdded = false
        while (yearStats.length < 30 && !entryAdded) {
          if (isSameYear(startOfYear, createJSDate(entry.date))) {
            const currentYearIndex = Math.abs(
              differenceInYears(startOfYear, getStartOfYear(new Date())),
            )
            if (yearStats[currentYearIndex]) {
              entry.data.forEach(item => {
                if (yearStats[currentYearIndex][item.animalType]) {
                  yearStats[currentYearIndex][item.animalType] =
                    yearStats[currentYearIndex][item.animalType] + item.weightKgs
                } else {
                  yearStats[currentYearIndex][item.animalType] = item.weightKgs
                }
              })
            }
            entryAdded = true
          } else {
            startOfYear = setNewStartOfYear(startOfYear)
            yearStats.push({})
          }
        }
      })
      return yearStats
      function setNewStartOfYear(previousYearStartDate) {
        return addYear(previousYearStartDate, -1)
      }
    },
  }))

const dateComparison = (compareEntry1, compareEntry2) => {
  if (isBefore(createJSDate(compareEntry1.date), createJSDate(compareEntry2.date))) {
    return 1
  } else {
    return -1
  }
}

const timeComparison = (compareEntry1, compareEntry2) => {
  const time1 = `${createIsoFormattedDate(new Date())} ${compareEntry1.time}`
  const time2 = `${createIsoFormattedDate(new Date())} ${compareEntry2.time}`
  console.tron.log(time1, time2)
  if (isBefore(time1, time2)) {
    return -1
  } else {
    return 1
  }
}
