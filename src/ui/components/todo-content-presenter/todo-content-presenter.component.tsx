import "./todo-content-presenter.css";

import { useEffect, useState } from "react";

import { TodoContentRepository } from "../../../core/repository";
import {
  INITIAL_TODO_CONTENT_DATA,
  TODO_CATEGORIES,
  TODO_CATEGORY_OBJECTS,
} from "../../../core/constants";
import { getFormatedDate } from "../../../core/helpers";
import { TodoItem } from "../../../core/repository/todo-content/model";
import { DateTime } from "luxon";

interface TodoContentPresenterComponentParams {
  contentId: string;
  removeTodoContent: (id: string) => void;
}

const TodoContentPresenterComponent = ({
  contentId,
  removeTodoContent,
}: TodoContentPresenterComponentParams) => {
  const [todoContentData, setTodoContentData] = useState({
    ...INITIAL_TODO_CONTENT_DATA,
    todoContent: new TodoContentRepository().get(contentId),
  });

  useEffect(() => {
    if (todoContentData.todoContent?.id !== contentId) {
      setTodoContentData({
        ...INITIAL_TODO_CONTENT_DATA,
        todoContent: new TodoContentRepository().get(contentId),
      });
    }
  }, [contentId]);

  const onChange = (eventChange): void => {
    const { name, value } = eventChange?.target;

    setTodoContentData({ ...todoContentData, [name]: value });
  };

  const onSubmit = (submitEvent): void => {
    submitEvent.preventDefault();

    if (todoContentData.todoName.length <= 0) {
      return setTodoContentData({
        ...todoContentData,
        todoNameError: "Nome de TODO inválido.",
      });
    }

    const contentRepository = new TodoContentRepository();

    const contentModel = contentRepository.addTodoItem({
      id: contentId,
      todoItem: new TodoItem({
        checked: false,
        id: DateTime.now().toMillis().toString(),
        name: todoContentData.todoName,
      }),
    });

    setTodoContentData({
      ...todoContentData,
      todoContent: contentModel,
      filteredList: filterListByCategory(
        todoContentData.filter,
        contentModel.todos
      ),
      todoName: "",
      todoNameError: "",
    });
  };

  const toggleCheckItem = (todoItemId: string): void => {
    const contentRepository = new TodoContentRepository();

    const contentModel = contentRepository.toggleCheckTodoItem({
      id: contentId,
      todoItemId,
    });

    setTodoContentData({
      ...todoContentData,
      todoContent: contentModel,
      filteredList: filterListByCategory(
        todoContentData.filter,
        contentModel.todos
      ),
    });
  };

  const removeItem = (todoItemId: string): void => {
    const contentRepository = new TodoContentRepository();

    const contentModel = contentRepository.removeTodoItem({
      id: contentId,
      todoItemId,
    });

    setTodoContentData({
      ...todoContentData,
      todoContent: contentModel,
      filteredList: filterListByCategory(
        todoContentData.filter,
        contentModel.todos
      ),
    });
  };

  const filterByCategory = (category: TODO_CATEGORIES): void => {
    setTodoContentData({
      ...todoContentData,
      filter: category,
      filteredList: filterListByCategory(
        category,
        todoContentData.todoContent.todos
      ),
    });
  };

  const filterListByCategory = (
    category: TODO_CATEGORIES,
    list: TodoItem[]
  ): TodoItem[] => {
    if (category === null) return null;

    return list.filter((item) => item.checked === !!category);
  };

  const verifyFilteredList = (): TodoItem[] => {
    return !todoContentData.filteredList
      ? todoContentData.todoContent.todos
      : todoContentData.filteredList;
  };

  return !todoContentData.todoContent ? (
    <div className="todo-content-presenter__nothyng-content">
      <h3 className="todo-content-presenter__message">
        Nenhuma lista de TODOs encontrada!
      </h3>
      <p className="todo-content-presenter__message-complement">
        Crie uma lista clicando no botão encontrado no menu a sua direita.
      </p>
    </div>
  ) : (
    <div className="todo-content-presenter">
      <div className="todo-content-presenter__date-title-and-close">
        <h3 className="todo-content-presenter__date-title">
          {getFormatedDate(todoContentData.todoContent.date)}
        </h3>
        <button
          className="todo-content-presenter__close"
          onClick={() => removeTodoContent(contentId)}
        ></button>
      </div>
      <div className="todo-content-presenter__todo-numbers-and-categories">
        <p className="todo-content-presenter__todo-numbers">{`${
          verifyFilteredList().length
        } TODOs`}</p>
        <div className="todo-content-presenter__categories">
          {TODO_CATEGORY_OBJECTS.map((categoryObject) => {
            return (
              <button
                className="todo-content-presenter__category"
                key={categoryObject.id}
                onClick={() => filterByCategory(categoryObject.enum)}
                disabled={categoryObject.enum === todoContentData.filter}
              >
                {categoryObject.text}
              </button>
            );
          })}
        </div>
      </div>
      <form
        action="submit"
        className="todo-content-presenter__form"
        onSubmit={onSubmit}
      >
        <div className="todo-content-presenter__todo-name-label">
          {todoContentData.todoNameError !== "" && (
            <p className="todo-content-presenter__todo-name-label-error">
              {todoContentData.todoNameError}
            </p>
          )}
          <input
            className="todo-content-presenter__todo-name-input"
            type="text"
            name={"todoName"}
            value={todoContentData.todoName}
            onChange={onChange}
            placeholder={"Adicionar um novo TODO..."}
          />
        </div>
      </form>
      <div className="todo-content-presenter__todo-list">
        {verifyFilteredList().map((item) => {
          return (
            <div
              className="todo-content-presenter__todo-list-item"
              key={item.id}
            >
              <div className="todo-content-presenter__todo-item-check-and-name">
                <button
                  className={`todo-content-presenter__check-item${
                    item.checked ? " todo-checked" : ""
                  }`}
                  onClick={() => toggleCheckItem(item.id)}
                ></button>
                <p className="todo-content-presenter__item-name">{item.name}</p>
              </div>
              <button
                className="todo-content-presenter__remove-item"
                onClick={() => removeItem(item.id)}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { TodoContentPresenterComponent };
