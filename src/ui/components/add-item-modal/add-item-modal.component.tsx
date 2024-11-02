import "./add-item-modal.css";

import { useState } from "react";
import { DateTime } from "luxon";

import { INITIAL_ADD_MODAL_DATA } from "../../../core/constants";
import { DATE_FORMATS } from "../../../core/constants/date.constants";
import { getDateTimeFromFormat } from "../../../core/helpers";
import { ListItem } from "../../../core/repository/todo-list/model";

interface AddItemModalComponentsParams {
  visible: boolean;
  todoList: ListItem[];
  addNewTodoItem: (date: DateTime) => void;
  setVisibleAddItemModal: (visibleModal: boolean) => void;
}

const AddItemModalComponent = ({
  visible,
  todoList,
  addNewTodoItem,
  setVisibleAddItemModal,
}: AddItemModalComponentsParams) => {
  const [modalData, setModalData] = useState(INITIAL_ADD_MODAL_DATA);

  const onChange = (eventChange) => {
    const { name, value } = eventChange?.target;

    setModalData({ ...modalData, [name]: value });
  };

  const handleAddNewTodoItem = () => {
    const dateTime = getDateTimeFromFormat(
      modalData.date,
      DATE_FORMATS.DATE_WITH_BARS
    );

    if (!dateTime) {
      return setModalData({
        ...modalData,
        dateError: "Formato de data inválido. Esperado: (dd/mm/yyyy)",
      });
    }

    const alreadyExistsInList = todoList.some(
      (item) =>
        item.date === dateTime.toFormat(DATE_FORMATS.DATE_WITH_KEBAB_CASE)
    );

    if (alreadyExistsInList) {
      return setModalData({
        ...modalData,
        dateError: "Já existe uma lista de TODOs com esta data.",
      });
    }

    addNewTodoItem(dateTime);
    setModalData(INITIAL_ADD_MODAL_DATA);
  };

  const handleHiddenAddItemModal = () => {
    setVisibleAddItemModal(false);
    setModalData(INITIAL_ADD_MODAL_DATA);
  };

  return (
    visible && (
      <div className="add-item-modal">
        <h3 className="add-item-modal__title">Adicionar Nova Lista</h3>
        <div className="add-item-modal__date-label">
          {modalData.dateError !== "" && (
            <p className="add-item-modal__date-label-error">
              {modalData.dateError}
            </p>
          )}
          <input
            className="add-item-modal__input"
            type="text"
            name={"date"}
            value={modalData.date}
            onChange={onChange}
            placeholder={"dia/mês/ano..."}
          />
        </div>
        <div className="add-item-modal__buttons">
          <button
            className="add-item-modal__add-button"
            onClick={handleAddNewTodoItem}
          >
            ADICIONAR
          </button>
          <button
            className="add-item-modal__close-button"
            onClick={handleHiddenAddItemModal}
          >
            SAIR
          </button>
        </div>
      </div>
    )
  );
};

export { AddItemModalComponent };
