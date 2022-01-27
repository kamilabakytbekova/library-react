import React, { createContext, useReducer } from "react";

export const ClientContext = createContext();

const INIT_STATE = {};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const checkBookIn = (id) => {};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return <ClientContext.Provider>{props.children}</ClientContext.Provider>;
};

export default ClientProvider;
