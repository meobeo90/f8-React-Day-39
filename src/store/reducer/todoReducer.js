import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "../constants";
const initState = [];
function todoReducer(state = initState, action) {
  console.log(state, action);
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
      };
      return [...state, newTodo];
    }
    case EDIT_TODO: {
      const { id, title } = action.payload;
      return state.map((todo) => (todo.id === id ? { ...todo, title } : todo));
    }
    case DELETE_TODO: {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    }
    default:
      return state;
  }
}
export default todoReducer;
