import React, { useReducer, useState } from "react";
import { db } from "../components/Firebase/Firebase";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { createContext } from "react";

export const StoreContext = createContext();

const INIT_STATE = {
  books: null,
  filteredBooks: null,
  isFiltered: false,
  booksInCart: null,
  // available: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return { ...state, books: action.payload, isFiltered: false };
    case "SORT_BOOKS":
      return { ...state, books: action.payload };
    case "GET_BOOKS_FROM_CART":
      return { ...state, booksInCart: action.payload, isFiltered: false };
    case "FILTER_BOOKS":
      return { ...state, filteredBooks: action.payload, isFiltered: true };
    // case "AVAILABLE":
    //   return { ...state, available: action.payload };
    default:
      return state;
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const search = new URLSearchParams(window.location.search);

  const getBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "book"));
      let response = [];
      querySnapshot.forEach((doc) => {
        response.push(doc.data());
      });
      let action = {
        type: "GET_BOOKS",
        payload: response,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchBook = (key, value) => {
    console.log(state.books);
    let filteredBooks = state.books.filter((book) => {
      if (
        book.name.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredBooks);
    let action = {
      type: "FILTER_BOOKS",
      payload: filteredBooks,
    };
    dispatch(action);
  };

  const sortBooks = (value) => {
    try {
      console.log(value);
      let sortedBooks = [];
      if (value === "year") {
        sortedBooks = state.books.sort((a, b) => a.year - b.year);
      } else {
        sortedBooks = state.books.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      let action = {
        type: "SORT_BOOKS",
        payload: sortedBooks,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const addBookToMyBooks = async (cartsBook, userId) => {
    try {
      let response = await setDoc(
        doc(db, "users", `${userId}`),
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
  const getBooksFromCart = async (userId) => {
    try {
      let response = await getDoc(doc(db, "users", `${userId}`));
      let booksCopy = [];
      if (response.exists && response.data().booksInCart) {
        for (let key in response.data().booksInCart) {
          booksCopy.push(response.data().booksInCart[key]);
        }
      }
      let action = {
        type: "GET_BOOKS_FROM_CART",
        payload: booksCopy,
      };

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const availableHandler = () => {
    let available = state.books.filter((item) => item.count);

    let action = {
      type: "FILTER_BOOKS",
      payload: available,
    };
    dispatch(action);
  };

  const approvedHandler = (val) => {
    let approved;
    if (val === true) {
      approved = state.booksInCart.filter((item) => item.isApproved);
    } else {
      approved = state.booksInCart.filter((item) => !item.isApproved);
    }
    let action = {
      type: "FILTER_BOOKS",
      payload: approved,
    };
    dispatch(action);
  };

  return (
    <StoreContext.Provider
      value={{
        getBooks,
        getSearchBook,
        sortBooks,
        addBookToMyBooks,
        getBooksFromCart,
        availableHandler,
        approvedHandler,
        filteredBooks: state.filteredBooks,
        books: state.books,
        booksInCart: state.booksInCart,
        isFiltered: state.isFiltered,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
