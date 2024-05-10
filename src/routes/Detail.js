import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Detail = () => {
  const toDos = useSelector((state) => state);

  //클릭된 리스트의 아이디값을 가져옴
  const rim = useParams().id;

  //아이디 같은것을 찾아냄
  const toDoText = toDos.find((toDo) => toDo.id === parseInt(rim));
  console.log(toDoText);

  return (
    <>
      <h1>{toDoText.text}</h1>
      Created at : {toDoText.id}
    </>
  );
};
export default Detail;
