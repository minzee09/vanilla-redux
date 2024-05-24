import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

/*
console.log("addToDo") : function
console.log("addToDo.type") : text
console.log("addToDo()") : object
*/

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       const newToDo = { text: action.payload, id: Date.now() };
//       const updatedState = [...state, newToDo];
//       localStorage.setItem("toDos", JSON.stringify(updatedState));
//       return updatedState;
//     case deleteToDo.type:
//       return state.filter((toDo) => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

const reducer = createReducer([], (builder) => {
  builder
    .addCase(addToDo, (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
    })
    .addCase(deleteToDo, (state, action) => {
      return state.filter((toDo) => toDo.id !== action.payload);
    });
});

const store = configureStore({ reducer });

export const actionCreaters = {
  addToDo,
  deleteToDo,
};

export default store;
