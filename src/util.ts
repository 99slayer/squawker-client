import { DateTime } from 'luxon';

export function formatDate(date: string) {
	const dt = DateTime.fromISO(date);
	const dateString: string = dt.toLocaleString(DateTime.DATE_MED);
	const timeString: string = dt.toLocaleString(DateTime.TIME_SIMPLE);
	return dateString + ' ' + timeString;
}
