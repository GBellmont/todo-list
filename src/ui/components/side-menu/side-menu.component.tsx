import "./side-menu.css";

import { ListItem } from "../../../core/repository/todo-list/model";
import { getDateTimeFromFormat } from "../../../core/helpers";
import { DATE_FORMATS } from "../../../core/constants/date.constants";

interface SideMenuComponentParams {
  todoList: ListItem[];
  chosenTodoId: string;
  changeTodoItem: (id: string) => void;
  setVisibleAddItemModal: (visible: boolean) => void;
}

const SideMenuComponent = ({
  todoList,
  chosenTodoId,
  changeTodoItem,
  setVisibleAddItemModal,
}: SideMenuComponentParams) => {
  const verifyAndSortTodoItems = (items: ListItem[]) => {
    return (
      items
        .map((item) => ({
          ...item,
          date: getDateTimeFromFormat(
            item.date,
            DATE_FORMATS.DATE_WITH_KEBAB_CASE
          ),
        }))
        .filter((item) => item && item.date)
        .sort((a, b) => b.date.toMillis() - a.date.toMillis()) || []
    );
  };

  return (
    <div className="side-menu">
      {verifyAndSortTodoItems(todoList).map((item) => {
        return (
          <button
            className={"side-menu__item"}
            key={item.id}
            onClick={() => changeTodoItem(item.id)}
            disabled={chosenTodoId === item.id}
          >
            {item.date.toFormat(DATE_FORMATS.DAY_AND_MONTH_WITH_BAR)}
          </button>
        );
      })}
      <button
        className="side-menu__view-modal-add-item"
        onClick={() => setVisibleAddItemModal(true)}
      ></button>
    </div>
  );
};

export { SideMenuComponent };
