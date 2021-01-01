import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = React.createContext({
  currentUser: {
    uid: "",
  },
});
export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then(() => {
          setCurrentUser(user);
        });
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
