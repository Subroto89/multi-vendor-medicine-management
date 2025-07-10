import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInUser = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (updateData)=> {
    return updateProfile(auth.currentUser, updateData);
  }

  const logOutUser = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  };

  return <AuthContext value={authData}> {children} </AuthContext>;
};

export default AuthProvider;
