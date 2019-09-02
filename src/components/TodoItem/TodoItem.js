import React from "react";

import styles from "./TodoItem.module.css";
import Button from "../Button/Button";

const TodoItem = (props) => {
  return (
    <div className={styles.todoItem}>
      <div
        onClick={props.toggleComplete}
        style={{
          textDecoration: props.item.done ? "line-through" : ""
        }}>
        {props.item.text}
      </div>
      <div>
        <div className={styles.actionButton}>
          <Button clicked={props.editTodo}>Edit</Button>
        </div>
        <div className={styles.actionButton}>
          <Button delete clicked={props.deleteTodo}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
