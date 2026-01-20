import { DateTime } from "luxon";

export function htmlDateString(
	dateObj: Date,
	format = "yyyy-LL-dd",
	zone = "utc",
): string {
	return DateTime.fromJSDate(dateObj, { zone }).toFormat(format);
}

export function readableDate(
	dateObj: Date,
	format = "d LLLL, yyyy",
	zone = "utc",
): string {
	return DateTime.fromJSDate(dateObj, { zone }).toFormat(format);
}
