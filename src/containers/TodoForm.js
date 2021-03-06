import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../store/actions";
import TodoItem from "../components/TodoItem/TodoItem";
import Button from "../components/Button/Button";
import styles from "./TodoForm.module.css";

const TodoForm = props => {
  return (
    <div className={styles.todoList}>
      <h1>Todo List</h1>
      <form
        onSubmit={event => props.onItemSubmit(event)}
        className={styles.form}
      >
        <input
          className={styles.inputField}
          value={props.item}
          onChange={event => props.onItemChange(event)}
          type="text"
        />
        <div className={styles.addItemButton}>
          <Button
            //if the input field is empty 'Add item' button is disabled
            disabled={props.item.length > 0 ? false : true}
            type="submit"
          >
            Add Item
          </Button>
        </div>
      </form>
      {props.todosList.map(item => {
        return (
          <TodoItem
            editTodo={() => props.onItemEdit(item.id)}
            deleteTodo={() => props.onItemDelete(item.id)}
            id={item.id}
            toggleComplete={() => props.onItemToggle(item.id)}
            item={item}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    item: state.currentItem,
    todosList: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onItemChange: event =>
      dispatch({
        type: actionTypes.HANDLE_INPUT_CHANGE,
        nextLetter: event.target.value
      }),
    onItemSubmit: event =>
      dispatch({ type: actionTypes.HANDLE_ITEM_SUBMIT, event: event }),
    onItemToggle: id =>
      dispatch({ type: actionTypes.HANDLE_ITEM_TOGGLE, id: id }),
    onItemDelete: id =>
      dispatch({ type: actionTypes.HANDLE_ITEM_DELETE, id: id }),
    onItemEdit: id => dispatch({ type: actionTypes.HANDLE_ITEM_EDIT, id: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
