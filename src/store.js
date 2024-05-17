import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const SET_TODOS = "SET_TODOS";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};
//localStorage에서 로드된 투두 리스트를 상태로 설정
const setToDos = (toDos) => {
  return {
    type: SET_TODOS,
    toDos,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      const newToDo = { text: action.text, id: Date.now() };
      const updatedState = [...state, newToDo];
      localStorage.setItem("toDos", JSON.stringify(updatedState));
      return updatedState;
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    case SET_TODOS:
      return action.toDos;
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreaters = {
  addToDo,
  deleteToDo,
  setToDos,
};

export default store;
