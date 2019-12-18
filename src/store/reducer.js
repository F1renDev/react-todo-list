import * as actionTypes from "./actions";
import shortid from "shortid";

let todosArr = [];

// if localStorage is empty, no items are shown on the start-up
if (localStorage.length > 0) {
  let arr = Object.keys(localStorage);
  todosArr = arr.map(item => {
    let newItem = JSON.parse(localStorage.getItem(item));
    return newItem;
  });
}

const initialState = {
  currentItem: "",
  todos: todosArr
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        currentItem: action.nextLetter
      };
    // using localStorage to save
    case actionTypes.HANDLE_ITEM_SUBMIT:
      action.event.preventDefault();
      const currentId = shortid.generate();
      localStorage.setItem(
        currentId,
        JSON.stringify({ text: state.currentItem, done: false, id: currentId })
      );
      return {
        ...state,
        todos: [
          ...state.todos,
          { text: state.currentItem, done: false, id: currentId }
        ],
        currentItem: ""
      };
    case actionTypes.HANDLE_ITEM_TOGGLE:
      const newTodos = state.todos.map(item => {
        if (item.id === action.id) {
          // switching the done (crossed-out) state in the localStorage
          const prevItemInLocalStorageToggleState = JSON.parse(
            localStorage.getItem(item.id)
          );
          const newItemInLocalStorageToggleState = {
            ...prevItemInLocalStorageToggleState,
            done: !prevItemInLocalStorageToggleState.done
          };
          localStorage.setItem(
            item.id,
            JSON.stringify(newItemInLocalStorageToggleState)
          );

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
      const filteredTodos = state.todos.filter(item => {
        return item.id !== action.id;
      });
      localStorage.removeItem(action.id);
      //focusing the input filed
      document.querySelector('input').focus();
      return {
        ...state,
        todos: filteredTodos
      };
    // when an 'edit' button is clicked the value of the current list item is changed to ''
    case actionTypes.HANDLE_ITEM_EDIT:
      let prevListValue;
      const mappedTodos = state.todos.map(item => {
        if (item.id === action.id) {
          prevListValue = item.text;
        }
        //focusing the input filed
        document.querySelector('input').focus();
        return item;
      });

      const filteredMappedTodos = mappedTodos.filter(
        item => item.id !== action.id
      );
      localStorage.removeItem(action.id);
      return {
        ...state,
        currentItem: prevListValue,
        todos: filteredMappedTodos
      };
    default: {
      return state;
    }
  }
};

export default reducer;
