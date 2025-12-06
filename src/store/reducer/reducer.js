import modalReducer from "./modalReducer";
import todoReducer from "./todoReducer";
function rootReducer(state = {}, action) {
  return {
    todos: todoReducer(state.todos, action),
    modal: modalReducer(state.modal, action),
  };
}
export default rootReducer;
