import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../store/actions";
import TodoItem from "../components/TodoItem/TodoItem";
import Button from "../components/Button/Button";
import styles from "./TodoForm.module.css";

class TodoForm extends React.Component {
  render() {
    // let listItem;
    // if (this.props.item) {

    //   listItem =
    //     this.props.item.length > 40
    //       ? this.props.item.slice(37) + "..."
    //       : this.props.item;
    // } else {
    //   listItem = "";
    // }
    return (
      <div className={styles.todoList}>
        <h1>Todo List</h1>
        <form
          onSubmit={(event) => this.props.onItemSubmit(event)}
          className={styles.form}>
          <input
            className={styles.inputField}
            value={this.props.item}
            onChange={(event) => this.props.onItemChange(event)}
            type='text'
          />
          <div className={styles.addItemButton}>
            <Button type='submit'>Add Item</Button>
          </div>
        </form>

        {this.props.todosList.map((item) => {
          return (
            <TodoItem
              editTodo={() => this.props.onItemEdit(item.id)}
              deleteTodo={() => this.props.onItemDelete(item.id)}
              id={item.id}
              toggleComplete={() => this.props.onItemToggle(item.id)}
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.currentItem,
    todosList: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemChange: (event) =>
      dispatch({
        type: actionTypes.HANDLE_INPUT_CHANGE,
        nextLetter: event.target.value
      }),
    onItemSubmit: (event) =>
      dispatch({ type: actionTypes.HANDLE_ITEM_SUBMIT, event: event }),
    onItemToggle: (id) =>
      dispatch({ type: actionTypes.HANDLE_ITEM_TOGGLE, id: id }),
    onItemDelete: (id) =>
      dispatch({ type: actionTypes.HANDLE_ITEM_DELETE, id: id }),
    onItemEdit: (id) => dispatch({ type: actionTypes.HANDLE_ITEM_EDIT, id: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
