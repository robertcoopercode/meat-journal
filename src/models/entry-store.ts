import { types } from "mobx-state-tree"
import isBefore from "date-fns/is_before"
import * as Utility from "src/lib/utility"
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
        id: Utility.uniqueId(),
        animalType: entry.animalType,
        name: entry.name,
        dateTimestamp: Date.now(),
        date: entry.date,
        time: entry.time,
        weightLbs: parseFloat(entry.weightLbs),
        weightKgs: parseFloat(entry.weightKgs),
      })
      self.data = self.data.sort(timeComparison)
    },
    deleteEntry(id) {
      self.data = self.data.filter(item => item.id !== id)
    },
  }))

export const EntryStoreModel = types
  .model("EntryStore", {
    entries: types.optional(types.array(DateEntry), []),
    selectedDate: types.string,
    newlyUpdatedEntry: types.boolean,
  })
  .actions(self => ({
    selectDay(day) {
      const selectedDate = Utility.convertDashedDateToSlashedDate(day.dateString)
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
    resetNewlyUpdatedEntry() {
      self.newlyUpdatedEntry = false
    },
  }))
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
                id: Utility.uniqueId(),
                animalType: entry.animalType,
                name: entry.name,
                dateTimestamp: Date.now(),
                date: entry.date,
                time: entry.time,
                weightLbs: parseFloat(entry.weightLbs),
                weightKgs: parseFloat(entry.weightKgs),
              },
            ],
            selected: false,
          }),
        )
      }
      self.selectDay({ dateString: Utility.convertSlashedDateToDashedDate(entry.date) })
      self.newlyUpdatedEntry = true
      self.entries = self.entries.sort(dateComparison)
      return
    },
    update(previousEntry, entry) {
      self.entries.some(storeDateEntry => {
        // Delete the old entry
        if (storeDateEntry.date === previousEntry.date) {
          storeDateEntry.deleteEntry(previousEntry.id)
          return true
        }
        return false
      })
      // Remove any date groups that no longer have entries
      self.entries = self.entries.filter(storeDateEntry => storeDateEntry.data.length > 0)
      // Add a new entry with updated values
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
                id: Utility.uniqueId(),
                animalType: entry.animalType,
                name: entry.name,
                dateTimestamp: Date.now(),
                date: entry.date,
                time: entry.time,
                weightLbs: parseFloat(entry.weightLbs),
                weightKgs: parseFloat(entry.weightKgs),
              },
            ],
            selected: false,
          }),
        )
      }
      self.newlyUpdatedEntry = true
      return (self.entries = self.entries.sort(dateComparison))
    },
    delete(entry) {
      self.entries.some(storeDateEntry => {
        if (storeDateEntry.date === entry.date) {
          storeDateEntry.deleteEntry(entry.id)
          return true
        }
        return false
      })
      self.newlyUpdatedEntry = true
      self.entries = self.entries.filter(storeDateEntry => storeDateEntry.data.length > 0)
    },
  }))
  .views(self => ({
    getDateEntries(date) {
      return self.entries.filter(
        entry => Utility.convertSlashedDateToDashedDate(entry.date) === date,
      )
    },
    getWeeklyStats(weightUnits) {
      return getPeriodStats({ type: "week", entries: self.entries, weightUnits })
    },
    getMonthlyStats(weightUnits) {
      return getPeriodStats({ type: "month", entries: self.entries, weightUnits })
    },
    getYearlyStats(weightUnits) {
      return getPeriodStats({ type: "year", entries: self.entries, weightUnits })
    },
  }))

type properties = {
  type: "week" | "month" | "year"
  entries: Array<typeof DateEntry.Type>
  weightUnits: "kgs" | "lbs"
}

const getPeriodStats = (properties: properties) => {
  let getStartOfPeriod, isSamePeriod, differenceBetweenPeriods, addPeriod
  switch (properties.type) {
    case "week":
      getStartOfPeriod = Utility.getStartOfWeek
      addPeriod = Utility.addWeek
      isSamePeriod = Utility.isSameWeek
      differenceBetweenPeriods = Utility.differenceInWeeks
      break
    case "month":
      getStartOfPeriod = Utility.getStartOfMonth
      addPeriod = Utility.addMonth
      isSamePeriod = Utility.isSameMonth
      differenceBetweenPeriods = Utility.differenceInMonths
      break
    case "year":
      getStartOfPeriod = Utility.getStartOfYear
      addPeriod = Utility.addYear
      isSamePeriod = Utility.isSameYear
      differenceBetweenPeriods = Utility.differenceInYears
      break
  }
  const periodStats = [{}]
  let startOfPeriod = getStartOfPeriod(new Date())
  properties.entries.forEach(entry => {
    let entryAdded = false
    while (periodStats.length < 30 && !entryAdded) {
      if (isSamePeriod(startOfPeriod, Utility.createJSDate(entry.date))) {
        const currentPeriodIndex = Math.abs(
          differenceBetweenPeriods(startOfPeriod, getStartOfPeriod(new Date())),
        )
        if (periodStats[currentPeriodIndex]) {
          entry.data.forEach(item => {
            const weight = properties.weightUnits === "kgs" ? item.weightKgs : item.weightLbs
            if (periodStats[currentPeriodIndex][item.animalType]) {
              periodStats[currentPeriodIndex][item.animalType] =
                periodStats[currentPeriodIndex][item.animalType] + weight
            } else {
              periodStats[currentPeriodIndex][item.animalType] = weight
            }
          })
        }
        entryAdded = true
      } else {
        startOfPeriod = addPeriod(startOfPeriod, -1)
        periodStats.push({})
      }
    }
  })
  const sortedPeriodStats = periodStats.map(stat => {
    return Object.entries(stat).sort(statisticsComparion)
  })
  return sortedPeriodStats
}

const statisticsComparion = (compareEntry1, compareEntry2) => {
  if (compareEntry1[1] < compareEntry2[1]) {
    return 1
  } else {
    return -1
  }
}

const dateComparison = (compareEntry1, compareEntry2) => {
  if (
    isBefore(Utility.createJSDate(compareEntry1.date), Utility.createJSDate(compareEntry2.date))
  ) {
    return 1
  } else {
    return -1
  }
}

const timeComparison = (compareEntry1, compareEntry2) => {
  const time1 = `${Utility.createIsoFormattedDate(new Date())} ${compareEntry1.time}`
  const time2 = `${Utility.createIsoFormattedDate(new Date())} ${compareEntry2.time}`
  if (isBefore(time1, time2)) {
    return -1
  } else {
    return 1
  }
}
