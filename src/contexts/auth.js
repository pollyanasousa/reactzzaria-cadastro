import React, { useState, useCallback, createContext, useEffect } from "react";
import t from "prop-types";
import {
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
  getAuth,
} from "firebase/auth";
// eslint-disable-next-line
import FirebaseApp, { db } from "../services/firebase";
import { getDoc, doc, setDoc } from "@firebase/firestore";

export const AuthContext = createContext();

function Auth({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const uid = userInfo.user?.uid || "EMPTY";
    const docRef = doc(db, "users", uid);

    const loadUser = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() || uid === "EMPTY") {
        return;
      }

      setDoc(docRef, {
        email: userInfo.user.email,
        name: userInfo.user.displayName,
        role: "user",
      });
    };
    loadUser();
  }, [userInfo]);

  const login = useCallback(() => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  }, []);

  const logout = useCallback(() => {
    signOut(auth).then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: t.node.isRequired,
};

const auth = getAuth();

export default Auth;
