import { createContext, useContext, useEffect, useState, } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification

} from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {    
        setUser(currentUser);
        console.log(currentUser.uid)
      } else {
        setUser(null)
        
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }
   const triggerResetEmail = (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent")
      
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    })}

   const verifyEmail = ()=> sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Done!')
      });
  const logout = () => {
      return signOut(auth)
  }

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, triggerResetEmail, verifyEmail }}>
      {children}
    </UserContext.Provider>
  );
};


export const UserAuth = () => {
  return useContext(UserContext);
};