import { DateTime } from "luxon";

import {
  DATE_FORMATS,
  MONTH_NAMES,
  WEEK_DAYS_NAMES,
} from "../constants/date.constants";

const getDateTimeFromFormat = (stringDate: string, format: DATE_FORMATS) => {
  const dateTimeFromString = DateTime.fromFormat(stringDate, format);

  return dateTimeFromString.isValid ? dateTimeFromString : null;
};

const getFormatedDate = (date: string): string => {
  const dateTime = getDateTimeFromFormat(
    date,
    DATE_FORMATS.DATE_WITH_KEBAB_CASE
  );

  const dayOfWeek = WEEK_DAYS_NAMES[dateTime.localWeekday.toString()];
  const monthName = MONTH_NAMES[dateTime.month.toString()];

  return `${dayOfWeek} ${dateTime.day} ${monthName} ${dateTime.year}`;
};

export { getDateTimeFromFormat, getFormatedDate };
