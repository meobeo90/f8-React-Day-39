import { useContext, useEffect, useRef, useState } from "react";
import Context from "./Context";

const ERROR_MESSAGE =
  "Could not find react-redux context value; please ensure the component is wrapped in a <Provider>";
//Hook useStore
export function useStore() {
  const store = useContext(Context);
  console.log(store);

  if (!store) {
    throw new Error(ERROR_MESSAGE);
  }
  return store;
}

//Hook useDispatch
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

//Hook useSelector
export function useSelector(selector) {
  const store = useStore();
  const [selected, setSelected] = useState(() => selector(store.getState()));

  const selectorRef = useRef(selector);
  useEffect(() => {
    selectorRef.current = selector;
    console.log(selectorRef);
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const latestState = store.getState();
      const newSelected = selectorRef.current(latestState);

      setSelected((prev) => (prev !== newSelected ? newSelected : prev));
    });
    return unsubscribe;
  }, [store]);
  return selected;
}
