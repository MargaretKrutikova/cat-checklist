import format from "date-fns/format"

export const toDateFormat = (date: Date) => format(date, "MM/DD/YYYY")
export const toTimeFormat = (date: Date) => format(date, "HH:mm:ss")

export const getDayOfweek = (date: Date) => format(date, "dddd")
