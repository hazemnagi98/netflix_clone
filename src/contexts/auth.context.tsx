import React, { useState, useEffect } from "react";
import Loading from "../Components/Shared/Loading/Loading";
import { auth } from "../firebase/firebase";

export const AuthContext = React.createContext({
  currentUser: {
    uid: "",
  },
});
export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then(() => {
          setCurrentUser(user);
          setPending(false);
        });
      } else {
        setPending(false);
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
