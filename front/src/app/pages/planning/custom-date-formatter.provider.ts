import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';

export class CustomDateFormatter extends CalendarDateFormatter {

	public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    let dateFormatted = new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
    return dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
   }

}