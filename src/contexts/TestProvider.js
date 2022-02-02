import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useReducer } from "react";
import { db } from "../components/Firebase/Firebase";
import StoreProvider from "./StoreProvider";

export const TestContext = createContext();

const INIT_STATE = {
  booksInCart: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOK":
      return { booksInCart: action.payload };
    default:
      return state;
  }
};
const TestProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addBook = async (cartsBook, testId) => {
    try {
      let response = await setDoc(
        doc(db, "test", `${testId}`),
        {
          booksInCart: {
            [cartsBook.id]: cartsBook,
          },
        },

        {
          merge: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getBook = async (testId) => {
    try {
      let response = await getDoc(doc(db, "test", `${testId}`));
      let booksCopy = [];
      for (let key in response.data().booksInCart) {
        booksCopy.push(response.data().booksInCart[key]);
      }
      let action = {
        type: "GET_BOOK",
        payload: booksCopy,
      };

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TestContext.Provider
      value={{ addBook, getBook, booksInCart: state.booksInCart }}
    >
      {props.children}
    </TestContext.Provider>
  );
};

export default TestProvider;
