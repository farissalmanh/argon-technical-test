import dayjs from "dayjs";

export function dateTimeToHourMinutes(dateTime) {
  const hourMinutes = dayjs(dateTime).format("HH:mm:ss");
  return hourMinutes;
}

export function formatDatetime(dateTime) {
  if(dateTime){
    const hourMinutes = dayjs(dateTime).format("DD-MM-YYYY HH:mm:ss");
    return hourMinutes;
  }
  return "-"
}