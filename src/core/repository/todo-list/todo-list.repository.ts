import { TODO_LIST_KEY } from "../../constants";
import { getAndParseToJsonItem } from "../../helpers";

import { ListItem, TodoListModel } from "./model";

interface AddListItemParams {
  id: string;
  date: string;
  todoList: ListItem[];
}

interface RemoveListItemParams {
  id: string;
  todoList: ListItem[];
}

class TodoListRepository {
  constructor() {}

  public get(): TodoListModel {
    const content = getAndParseToJsonItem(TODO_LIST_KEY) || { list: [] };

    return new TodoListModel(content);
  }

  public addListItem({ id, date, todoList }: AddListItemParams): TodoListModel {
    const list = [...todoList, new ListItem({ id, date })];
    const model = new TodoListModel({ list });

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(model));

    return model;
  }

  public removeListItem({ id, todoList }: RemoveListItemParams): TodoListModel {
    const list = todoList.filter((item) => id !== item.id);
    const model = new TodoListModel({ list });

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(model));

    return model;
  }
}

export { TodoListRepository };
