import {
  OPEN_WARNING,
  CLOSE_WARNING,
  OPEN_DELETE,
  CLOSE_DELETE,
  OPEN_EDIT,
  CLOSE_EDIT,
  SET_EDIT_VALUE,
} from "../constants";
const initState = {
  warning: null,
  deleteId: null,
  editTodo: null,
  editValue: "",
};

function modalReducer(state = initState, action) {
  console.log(state, action);
  switch (action.type) {
    case OPEN_WARNING: {
      return { ...state, warning: action.payload };
    }
    case CLOSE_WARNING: {
      return { ...state, warning: null };
    }
    case OPEN_DELETE: {
      return { ...state, deleteId: action.payload };
    }
    case CLOSE_DELETE: {
      return { ...state, deleteId: null };
    }
    case OPEN_EDIT: {
      return {
        ...state,
        editTodo: action.payload,
        editValue: action.payload.title,
      };
    }
    case CLOSE_EDIT: {
      return { ...state, editTodo: null, editValue: "" };
    }
    case SET_EDIT_VALUE: {
      return { ...state, editValue: action.payload };
    }
    default:
      return state;
  }
}
export default modalReducer;
