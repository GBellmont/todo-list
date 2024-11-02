class ListItem {
  id: string;
  date: string;

  constructor(data: any) {
    this.id = data.id;
    this.date = data.date;
  }
}

class TodoListModel {
  list: ListItem[];

  constructor(data: any) {
    this.list = data.list.map((item: any) => new ListItem(item));
  }
}

export { ListItem, TodoListModel };
