import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [noUser, setNoUser] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setNoUser(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential)
        const token = credential.accessToken;
        // The signed-in user info.
        const userG = result.user;
        setUser(userG)
        navigate('/account')
        setNoUser(false);

      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.customData.email);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const triggerResetEmail = () => {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password reset email sent! Please check your email");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  const loginResetEmail = (emailForm) => {
    sendPasswordResetEmail(auth, emailForm)
      .then(() => {
        alert("Password reset email sent! Please check your email");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const verifyEmail = () =>
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Done!");
    });
  const logout = () => {
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        triggerResetEmail,
        verifyEmail,
        loginResetEmail,
        googleAuth, noUser, setNoUser

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
