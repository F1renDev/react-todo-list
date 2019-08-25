import React from "react";


const TodoItem = (props) => {
  return (
    <div className={"todo-item"}>
      <li
        onClick={props.toggleComplete}
        style={{
          textDecoration: props.item.done ? "line-through" : ""
        }}>
        {props.item.text}
      </li>
      <button className={"delete-button"} onClick={() => props.deleteTodo()}>
        x
      </button>
    </div>
  );
};

export default TodoItem;
