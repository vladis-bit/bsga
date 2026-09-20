const BRATISLAVA_TIME_ZONE = "Europe/Bratislava";

const bratislavaPartsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BRATISLAVA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const pad = (value: number) => String(value).padStart(2, "0");

const partsInBratislava = (date: Date) => {
  const parts = Object.fromEntries(
    bratislavaPartsFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
};

/** A calendar-only Date stored at UTC midnight, independent of the browser time zone. */
export const calendarDateFromKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const calendarDateKey = (date: Date) =>
  `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

export const bratislavaToday = (now = new Date()) => {
  const { year, month, day } = partsInBratislava(now);
  return calendarDateFromKey(`${year}-${pad(month)}-${pad(day)}`);
};

export const addCalendarDays = (date: Date, amount: number) => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + amount);
  return result;
};

export const formatCalendarDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("sk-SK", { ...options, timeZone: "UTC" }).format(date);

/** Converts a wall-clock time in Bratislava to its exact UTC instant. */
export const bratislavaDateTimeToDate = (dateKey: string, time: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  const [hour, minute = 0] = time.split(":").map(Number);
  const desiredAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0, 0);

  let candidate = desiredAsUtc;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const actual = partsInBratislava(new Date(candidate));
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second,
    );
    const correction = desiredAsUtc - actualAsUtc;
    candidate += correction;
    if (correction === 0) break;
  }

  return new Date(candidate);
};

export const bratislavaDateTimeToIso = (dateKey: string, time: string) =>
  bratislavaDateTimeToDate(dateKey, time).toISOString();