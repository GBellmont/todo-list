import { TODO_CONTENT_KEY_PREFIX } from "../../constants";
import { getAndParseToJsonItem } from "../../helpers";

import { TodoContentModel } from "./model";

interface AddTodoItemParams {
  id: string;
  todoItem: {
    checked: boolean;
    id: string;
    name: string;
  };
}

interface CheckTodoItemParams {
  id: string;
  todoItemId: string;
}

interface RemoveTodoItemParams {
  id: string;
  todoItemId: string;
}

class TodoContentRepository {
  constructor() {}

  public get(id: string): TodoContentModel {
    const fullKey = this.buildFullId(id);

    const content = getAndParseToJsonItem(fullKey);

    return !content ? null : new TodoContentModel(content);
  }

  public addTodoItem({ id, todoItem }: AddTodoItemParams): TodoContentModel {
    const todoContentItem = this.get(id);

    const newTodoList = [...todoContentItem.todos, todoItem];

    return this.save(
      new TodoContentModel({ ...todoContentItem, todos: newTodoList })
    );
  }

  public toggleCheckTodoItem({ id, todoItemId }: CheckTodoItemParams) {
    const todoContentItem = this.get(id);

    const newTodoList = todoContentItem.todos.map((todoItem) => {
      if (todoItem.id === todoItemId) {
        return {
          ...todoItem,
          checked: !todoItem.checked,
        };
      }

      return todoItem;
    });

    return this.save(
      new TodoContentModel({ ...todoContentItem, todos: newTodoList })
    );
  }

  public removeTodoItem({
    id,
    todoItemId,
  }: RemoveTodoItemParams): TodoContentModel {
    const todoContentItem = this.get(id);

    const newTodoList = todoContentItem.todos.filter(
      (todoItem) => todoItemId !== todoItem.id
    );

    return this.save(
      new TodoContentModel({ ...todoContentItem, todos: newTodoList })
    );
  }

  public delete(id: string): void {
    const fullKey = this.buildFullId(id);

    localStorage.removeItem(fullKey);
  }

  public save(todoContent: TodoContentModel): TodoContentModel {
    const fullKey = this.buildFullId(todoContent.id);

    localStorage.setItem(fullKey, JSON.stringify(todoContent));

    return todoContent;
  }

  private buildFullId(id: string): string {
    return TODO_CONTENT_KEY_PREFIX + id;
  }
}

export { TodoContentRepository };
