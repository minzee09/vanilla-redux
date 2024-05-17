import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actionCreaters } from "../store";
import ToDo from "../components/ToDo";

const Home = ({ toDos, addToDo, setToDos }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem("toDos"));
    if (storedToDos) {
      setToDos(storedToDos);
    }
  }, [setToDos]);

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
};

function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreaters.addToDo(text)),
    setToDos: (toDos) => dispatch(actionCreaters.setToDos(toDos)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
