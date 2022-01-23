import {Timespan} from "../model/timespan";

export function parseTimespan(timespan: string): Timespan | null {
  const daysEnd = timespan.indexOf('.')

  const time = timespan.substring(daysEnd + 1).split(':')
  if (time.length < 3) {
    return null
  }

  let hours = parseInt(time[0])
  const minutes = parseInt(time[1])
  const seconds = parseInt(time[2])

  if (daysEnd > 0) {
    const days = parseInt(timespan.substring(0, daysEnd))
    hours += days * 24
  }
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

export function displayTimespan(timespan: Timespan): string {
  return `${pad(timespan.hours)}h ${pad(timespan.minutes)}m ${pad(timespan.seconds)}s`;
}

export function formatTimespan(timespan: Timespan): string {
  return `${pad(timespan.hours)}:${pad(timespan.minutes)}:${pad(timespan.seconds)}`;
}

function pad(val: number): string {
  return val.toString().padStart(2, '0')
}
