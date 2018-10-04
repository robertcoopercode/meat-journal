import format from "date-fns/format"
import startOfWeek from "date-fns/start_of_week"
import isSameWeekFns from "date-fns/is_same_week"
import isSameMonthFns from "date-fns/is_same_month"
import isSameYearFns from "date-fns/is_same_year"
import addWeeksFns from "date-fns/add_weeks"
import addMonthsFns from "date-fns/add_months"
import addYearsFns from "date-fns/add_years"
import endOfWeek from "date-fns/end_of_week"
import startOfMonthFns from "date-fns/start_of_month"
import startOfYearFns from "date-fns/start_of_year"

export const uniqueId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
}

export const formatDate = unformattedDate => {
  return format(createJSDate(unformattedDate), "MMMM D")
}

export const createJSDate = unformattedDate => {
  let year = parseInt(unformattedDate.substring(6))
  let month = parseInt(unformattedDate.substring(3, 5)) - 1
  let day = parseInt(unformattedDate.substring(0, 2))
  return new Date(year, month, day)
}

export const dashedDateFormatConversion = date => {
  return format(createJSDate(date), "YYYY-MM-DD")
}

export const convertDashedDateToSlashedDate = dashedDate => {
  return format(dashedDate, "DD/MM/YYYY")
}

export const getStartOfWeek = date => {
  return startOfWeek(date, { weekStartsOn: 1 }) // Week starts on Monday
}

export const getStartOfMonth = date => {
  return startOfMonthFns(date)
}

export const getStartOfYear = date => {
  return startOfYearFns(date)
}

export const isSameWeek = (dateLeft, dateRight) => {
  return isSameWeekFns(dateLeft, dateRight, { weekStartsOn: 1 })
}

export const isSameMonth = (dateLeft, dateRight) => {
  return isSameMonthFns(dateLeft, dateRight)
}

export const isSameYear = (dateLeft, dateRight) => {
  return isSameYearFns(dateLeft, dateRight)
}

export const addWeek = (date, amount) => {
  return addWeeksFns(date, amount)
}

export const addMonth = (date, amount) => {
  return addMonthsFns(date, amount)
}

export const addYear = (date, amount) => {
  return addYearsFns(date, amount)
}

export const getWeekRangeText = weeksFromThisWeek => {
  const start = addWeeksFns(startOfWeek(new Date(), { weekStartsOn: 1 }), -1 * weeksFromThisWeek)
  const end = endOfWeek(start, { weekStartsOn: 1 })
  const formattedStart = format(start, "MMM D")
  const formattedEnd = format(end, "MMM D")
  return `${formattedStart} - ${formattedEnd}`
}

export const getMonthRangeText = monthsFromThisMonth => {
  const month = addMonthsFns(new Date(), -1 * monthsFromThisMonth)
  const formattedMonth = format(month, "MMMM YYYY")
  return formattedMonth
}

export const getYearRangeText = yearsFromThisYear => {
  const month = addYearsFns(new Date(), -1 * yearsFromThisYear)
  const formattedYear = format(month, "YYYY")
  return formattedYear
}
