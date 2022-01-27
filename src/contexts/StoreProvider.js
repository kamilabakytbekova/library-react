import React, { useReducer, useState } from "react";
import { db } from "../components/Firebase/Firebase";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { createContext } from "react";
import { API } from "../api/const";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

const INIT_STATE = {
  books: null,
  filteredBooks: null,
  isFiltered: false,
  booksInCart: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return { ...state, books: action.payload, isFiltered: false };
    case "SORT_BOOKS":
      return { ...state, books: action.payload };
    case "GET_CART":
      return { ...state, booksInCart: action.payload };
    case "FILTER_BOOKS":
      return { ...state, filteredBooks: action.payload, isFiltered: true };
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

  const addBookToMyBooks = async (id, userId) => {
    try {
      let response = await setDoc(
        doc(db, "users", `${userId}`),
        {
          booksId: {
            [id]: true,
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
      const userDoc = await getDoc(doc(db, "users", `${userId}`));
      if (userDoc.data().booksId) {
        if (state.books) {
          let newBookList = state.books.filter(
            (book) => userDoc.data().booksId[book.id]
          );
          let action = {
            type: "GET_CART",
            payload: newBookList,
          };
          dispatch(action);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        getBooks,
        getSearchBook,
        sortBooks,
        addBookToMyBooks,
        getBooksFromCart,
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
