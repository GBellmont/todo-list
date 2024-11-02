import "./todo-management.css";

import {
  AddItemModalComponent,
  SideMenuComponent,
  TodoContentPresenterComponent,
} from "../../components";
import { useState } from "react";
import { INITIAL_TODO_MANAGEMENT_DATA } from "../../../core/constants";
import { DateTime } from "luxon";
import {
  TodoContentRepository,
  TodoListRepository,
} from "../../../core/repository";
import { DATE_FORMATS } from "../../../core/constants/date.constants";
import { getInitialChosenTodoId } from "../../../core/helpers";
import { TodoContentModel } from "../../../core/repository/todo-content/model";

const TodoManagementScreen = () => {
  const [todoManagementData, setTodoManagementData] = useState(() => {
    const list = new TodoListRepository().get().list;
    const chosenTodoId = getInitialChosenTodoId(list);

    return {
      ...INITIAL_TODO_MANAGEMENT_DATA,
      list,
      chosenTodoId,
    };
  });

  const setVisibleAddItemModal = (visibleModal: boolean): void => {
    setTodoManagementData({
      ...todoManagementData,
      visibleModal,
    });
  };

  const choseTodoItem = (id: string): void => {
    setTodoManagementData({ ...todoManagementData, chosenTodoId: id });
  };

  const addNewTodoItem = (date: DateTime): void => {
    const listRepository = new TodoListRepository();
    const contentRepository = new TodoContentRepository();

    const id = DateTime.now().toMillis().toString();
    const formatedDate = date.toFormat(DATE_FORMATS.DATE_WITH_KEBAB_CASE);

    const listModel = listRepository.addListItem({
      id,
      date: formatedDate,
      todoList: todoManagementData.list,
    });

    contentRepository.save(
      new TodoContentModel({
        id,
        date: formatedDate,
        todos: [],
      })
    );

    setTodoManagementData({
      ...todoManagementData,
      list: listModel.list,
      visibleModal: false,
    });
  };

  const removeTodoContent = (id: string): void => {
    const listRepository = new TodoListRepository();
    const contentRepository = new TodoContentRepository();

    contentRepository.delete(id);
    const listModel = listRepository.removeListItem({
      id,
      todoList: todoManagementData.list,
    });

    setTodoManagementData({
      ...todoManagementData,
      list: listModel.list,
      chosenTodoId: getInitialChosenTodoId(listModel.list),
    });
  };

  return (
    <div className="todo-management">
      <AddItemModalComponent
        visible={todoManagementData.visibleModal}
        todoList={todoManagementData.list}
        addNewTodoItem={addNewTodoItem}
        setVisibleAddItemModal={setVisibleAddItemModal}
      />

      <SideMenuComponent
        todoList={todoManagementData.list}
        chosenTodoId={todoManagementData.chosenTodoId}
        changeTodoItem={choseTodoItem}
        setVisibleAddItemModal={setVisibleAddItemModal}
      />

      <TodoContentPresenterComponent
        contentId={todoManagementData.chosenTodoId}
        removeTodoContent={removeTodoContent}
      />
    </div>
  );
};

export { TodoManagementScreen };
