import { DateTime } from "luxon";
import { ListItem } from "../repository/todo-list/model";
import { DATE_FORMATS } from "../constants/date.constants";
import { getDateTimeFromFormat } from "./date-time.helper";

const getInitialChosenTodoId = (list: ListItem[]): string => {
  const currentDateTodo = list.find(
    (item) =>
      DateTime.now().toFormat(DATE_FORMATS.DATE_WITH_KEBAB_CASE) === item.date
  );

  if (currentDateTodo) return currentDateTodo.id;

  const listWithDateTimes = list.map((item) => ({
    ...item,
    date: getDateTimeFromFormat(item.date, DATE_FORMATS.DATE_WITH_KEBAB_CASE),
  }));

  const nextCurrentDate = listWithDateTimes
    .filter(
      (itemWithDate) => itemWithDate.date.toMillis() > DateTime.now().toMillis()
    )
    .sort((a, b) => a.date.toMillis() - b.date.toMillis())[0];

  if (nextCurrentDate) return nextCurrentDate.id;

  const mostRecentDate = listWithDateTimes.sort(
    (a, b) => b.date.toMillis() - a.date.toMillis()
  )[0];

  return mostRecentDate?.id || "";
};

export { getInitialChosenTodoId };
