const CALENDAR_TIME_ZONE = "Europe/Bratislava";
const CALENDAR_LOCATION = "Zuzany Chalupovej 12, 851 07 Bratislava";

type BookingCalendarEvent = {
  bookingId: string;
  simulatorName: string;
  startsAt: string;
  endsAt: string;
  priceEur: number;
  durationHours: number;
  detailUrl: string;
  sequence?: number;
};

const localDateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: CALENDAR_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const toLocalCalendarDateTime = (iso: string) => {
  const parts = Object.fromEntries(
    localDateTimeFormatter
      .formatToParts(new Date(iso))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
};

const toUtcCalendarDateTime = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

const escapeCalendarText = (value: unknown) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const foldCalendarLine = (line: string) => {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  let current = "";
  let bytes = 0;

  for (const character of line) {
    const characterBytes = encoder.encode(character).length;
    if (bytes + characterBytes > 73 && current) {
      chunks.push(current);
      current = character;
      bytes = characterBytes;
    } else {
      current += character;
      bytes += characterBytes;
    }
  }
  if (current) chunks.push(current);
  return chunks.join("\r\n ");
};

const toBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
};

export const createBookingCalendarAttachment = (event: BookingCalendarEvent) => {
  const duration = Number.isInteger(event.durationHours)
    ? `${event.durationHours} h`
    : `${event.durationHours.toFixed(1).replace(".", ",")} h`;
  const description = [
    `Cena: ${event.priceEur.toFixed(2).replace(".", ",")} €`,
    `Dĺžka: ${duration}`,
    `Detail rezervácie: ${event.detailUrl}`,
  ].join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "PRODID:-//BSGA//Performance Center Reservation//SK",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Bratislava",
    "X-LIC-LOCATION:Europe/Bratislava",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "TZNAME:CEST",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "TZNAME:CET",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarText(event.bookingId)}@bsga.sk`,
    `DTSTAMP:${toUtcCalendarDateTime(new Date())}`,
    `SEQUENCE:${event.sequence ?? 0}`,
    "STATUS:CONFIRMED",
    `DTSTART;TZID=Europe/Bratislava:${toLocalCalendarDateTime(event.startsAt)}`,
    `DTEND;TZID=Europe/Bratislava:${toLocalCalendarDateTime(event.endsAt)}`,
    `SUMMARY:${escapeCalendarText(`BSGA Performance Center – ${event.simulatorName}`)}`,
    `LOCATION:${escapeCalendarText(CALENDAR_LOCATION)}`,
    `DESCRIPTION:${escapeCalendarText(description)}`,
    `URL:${escapeCalendarText(event.detailUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const content = `${lines.map(foldCalendarLine).join("\r\n")}\r\n`;
  return {
    filename: "bsga-rezervacia.ics",
    content: toBase64(content),
    content_type: "text/calendar; charset=utf-8; method=REQUEST",
  };
};