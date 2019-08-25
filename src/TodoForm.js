import React from "react";
import TodoItem from "./TodoItem";
import * as actionTypes from "./store/actions";
import { connect } from "react-redux";

class TodoForm extends React.Component {
  render() {
    return (
      <div className={"todo-list"}>
        <h1>Todo List</h1>
        <form onSubmit={(event) => this.props.onItemSubmit(event)}>
          <input
            value={this.props.item}
            onChange={(event) => this.props.onItemChange(event)}
            type="text"
          />
          <span> </span>
          <button type="submit">Add item</button>
        </form>
        <ul>
          {this.props.todosList.map((item) => {
            return (
              <TodoItem
                deleteTodo={() => this.props.onItemDelete(item.id)}
                id={item.id}
                toggleComplete={() => this.props.onItemToggle(item.id)}
                item={item}
                key={item.id}
              />
            );
          })}
        </ul>
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
      dispatch({ type: actionTypes.HANDLE_ITEM_DELETE, id: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
