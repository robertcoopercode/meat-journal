import format from "date-fns/format"

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
