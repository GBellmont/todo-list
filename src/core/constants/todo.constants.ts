const INITIAL_ADD_MODAL_DATA = {
  date: "",
  dateError: "",
};

const INITIAL_TODO_CONTENT_DATA = {
  todoName: "",
  todoNameError: "",
  filter: null,
  filteredList: null,
};

const INITIAL_TODO_MANAGEMENT_DATA = {
  visibleModal: false,
  list: [],
};

enum TODO_CATEGORIES {
  ALL = null,
  ACTIVES = 0,
  COMPLETEDS = 1,
}

const TODO_CATEGORY_OBJECTS = [
  {
    id: "ALL_CATEGORY",
    enum: TODO_CATEGORIES.ALL,
    text: "Todos",
  },
  {
    id: "ACTIVE_CATEGORY",
    enum: TODO_CATEGORIES.ACTIVES,
    text: "Ativos",
  },
  {
    id: "COMPLETED_CATEGORY",
    enum: TODO_CATEGORIES.COMPLETEDS,
    text: "Completos",
  },
];

const TODO_CONTENT_KEY_PREFIX = "TODO_CONTENT_";
const TODO_LIST_KEY = "TODO_LIST_KEY";

export {
  INITIAL_ADD_MODAL_DATA,
  INITIAL_TODO_CONTENT_DATA,
  INITIAL_TODO_MANAGEMENT_DATA,
  TODO_CATEGORIES,
  TODO_CATEGORY_OBJECTS,
  TODO_CONTENT_KEY_PREFIX,
  TODO_LIST_KEY,
};
