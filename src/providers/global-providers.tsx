import React from "react";
import { GlobalContext } from "../contexts/global-context";

const defaultState = {
  loading: false,
  error: null,
}

export const GlobalProviders: React.FC<{}> = ({ children }) => {
  const [globalState, globalDispatch] = React.useReducer(
    (state : any = defaultState, action: any) => {
      switch (action.type) {
        case "setLoading":
          return { ...state, loading: action.payload };
        case "setError":
          return { ...state, error: action.payload };
        default:
          throw new Error();
      }
    },
    defaultState
  );

  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};