import React from "react";

const ToDo = ({ text }) => {
  return (
    <li>
      {text}
      <button>DEL</button>
    </li>
  );
};

export default ToDo;
