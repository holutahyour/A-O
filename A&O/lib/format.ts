/**
 * Formatting helpers. Amounts are stored as integer naira everywhere and are
 * only turned into text at the render boundary - never earlier.
 */

const LAGOS = "Africa/Lagos"

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
})

/** 450000 -> "₦450,000" */
export function naira(amount: number): string {
  return nairaFormatter.format(amount)
}

/**
 * The wedding date, written out in full, in Lagos time.
 * The weekday is derived rather than typed by hand - nobody should be
 * hardcoding "Saturday" and hoping.
 */
export function longDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

/** "26 September 2026" - the same date without the weekday. */
export function shortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

/** "26 · 09 · 2026" - the hero's typographic treatment of the date. */
export function dottedDate(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date(iso))

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return [get("day"), get("month"), get("year")].join(" · ")
}

/**
 * Account numbers are read aloud and typed by hand, often by someone holding a
 * phone in one hand. Grouping them in threes makes that meaningfully easier.
 * "0123456789" -> "012 345 6789"
 */
export function groupAccountNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, "")
  if (digits.length !== 10) return value
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}
