class TodoItem {
  checked: boolean;
  id: string;
  name: string;

  constructor(data: any) {
    this.checked = data.checked;
    this.id = data.id;
    this.name = data.name;
  }
}

class TodoContentModel {
  id: string;
  date: string;
  todos: TodoItem[];

  constructor(data: any) {
    this.id = data.id;
    this.date = data.date;
    this.todos = data.todos.map((item: any) => new TodoItem(item));
  }
}

export { TodoContentModel, TodoItem };
