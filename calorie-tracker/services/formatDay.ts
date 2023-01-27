import dayjs from "dayjs"

export default function formatDay(date?: string | null | dayjs.Dayjs) {
  if (!date) return
  return dayjs(date)?.format("YYYY-MM-DD")
}