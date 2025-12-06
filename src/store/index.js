import createStore from "@/libs/redux";
import rootReducer from "./reducer";

const loadState = () => {
  try {
    const json = localStorage.getItem("todo-app");
    return json ? JSON.parse(json) : undefined;
  } catch {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    localStorage.setItem("todo-app", JSON.stringify(state));
  } catch {
    throw new Error("Cannot save State");
  }
};

const currentState = loadState();
const store = createStore(rootReducer, currentState);

store.subscribe(() => {
  saveState(store.getState());
});
console.log(currentState);

export default store;
