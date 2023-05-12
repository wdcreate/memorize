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
  updateProfile
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [noUser, setNoUser] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNoUser(false);

      } else {
        setNoUser(true);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const updateUsername = async(username) =>  {
    updateProfile(auth.currentUser,{
      displayName: username
    })
    await auth.currentUser.reload();
  };
  const createUser = async(email, password, username) =>  {
    const result = await createUserWithEmailAndPassword(auth, email, password,username)
    updateProfile(auth.currentUser,{
      displayName: username
    })
    await auth.currentUser.reload();
    return result;
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userG = result.user;
        setUser(userG)
        navigate('/')
        setNoUser(false);

      })
      .catch((error) => {
        //console.log(error.message);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const triggerResetEmail = () => {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password reset email sent! Please check your email");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const loginResetEmail = (emailForm) => {
    sendPasswordResetEmail(auth, emailForm)
      .then(() => {
        alert("Password reset email sent! Please check your email");
      })
      .catch((error) => {
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
        updateUsername,
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
