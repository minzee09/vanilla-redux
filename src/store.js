import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

/*
console.log("addToDo") : function
console.log("addToDo.type") : text
console.log("addToDo()") : object
*/

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      const newToDo = { text: action.payload, id: Date.now() };
      const updatedState = [...state, newToDo];
      localStorage.setItem("toDos", JSON.stringify(updatedState));
      return updatedState;
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreaters = {
  addToDo,
  deleteToDo,
};

export default store;
