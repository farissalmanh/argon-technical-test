import dayjs from "dayjs";

export function dateTimeToHourMinutes(dateTime) {
  const hourMinutes = dayjs(dateTime).format("HH:mm:ss");
  return hourMinutes;
}

export function formatDatetime(dateTime) {
  const hourMinutes = dayjs(dateTime).format("DD-MM-YYYY HH:mm:ss");
  return hourMinutes;
}

export function datetimeToDate(dateTime) {
  const hourMinutes = dayjs(dateTime).format("DD-MM-YYYY");
  return hourMinutes;
}