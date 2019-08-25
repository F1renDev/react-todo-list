import * as actionTypes from "./actions";
import shortid from "shortid";

const initialState = {
  currentItem: "",
// TODO: переделать массив в объект и добавить в нето свойства text, done, id
  todos: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        currentItem: action.nextLetter
      };
    case actionTypes.HANDLE_ITEM_SUBMIT:
      action.event.preventDefault();
      return {
        ...state,
        todos: [
          ...state.todos,
          { text: state.currentItem, done: false, id: shortid.generate() }
        ],
        currentItem: ""
      };
    case actionTypes.HANDLE_ITEM_TOGGLE:
      const newTodos = state.todos.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            done: !item.done
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        todos: newTodos
      };
    case actionTypes.HANDLE_ITEM_DELETE:
      const filteredTodos = state.todos.filter((item) => {
        return item.id !== action.id;
      });
      return {
        ...state,
        todos: filteredTodos
      };
    default: {
      return state;
    }
  }
};

export default reducer;
