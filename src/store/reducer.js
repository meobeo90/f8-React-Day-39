import modalReducer from "./reducer/modalReducer";
import todoReducer from "./reducer/todoReducer";
function rootReducer(state = {}, action) {
  return {
    todos: todoReducer(state.todos, action),
    modal: modalReducer(state.modal, action),
  };
}
export default rootReducer;
