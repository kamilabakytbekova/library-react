import React, { createContext, useEffect, useState } from "react";
import { auth } from "../components/Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUp = async (email, password, displayName) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        return updateProfile(auth.currentUser, {
          displayName: displayName,
        }).then(() => {
          setUser(userCred.user);
          navigate("/login");
          return userCred.user;
        });
      }
    );
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
      setUser(userCred.user);
      console.log(userCred.user);

      return userCred.user;
    });
  };

  useEffect(() => {
    const unsubrscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubrscribe();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, login, handleLogOut, user, error }}>
      {props.children}
    </AuthContext.Provider>
  );
};
