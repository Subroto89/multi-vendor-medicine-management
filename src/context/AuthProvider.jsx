import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  updatePassword,
} from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInUser = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const userPasswordUpdate = (user, newPassword) => {
    setLoading(true);
    return updatePassword(user, newPassword);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        axios
          .post(`${import.meta.env.VITE_Server_API_KEY}/jwt`, {
            email: currentUser.email,
          })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
          });
      }
      if (!currentUser?.email) {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authData = {
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignInUser,
    user,
    updateUserProfile,
    logOutUser,
    userPasswordUpdate,
  };

  return <AuthContext value={authData}> {children} </AuthContext>;
};

export default AuthProvider;
