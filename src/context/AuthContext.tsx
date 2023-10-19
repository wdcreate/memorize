import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User,
  UserCredential,
  OAuthCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { IAuthContextModel, IChildren } from "../types/contextTypes";

const UserContext = createContext<IAuthContextModel>( {} as IAuthContextModel,);

export const AuthContextProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [noUser, setNoUser] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
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

  const updateUsername = async (username: string): Promise<void> => {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: username,
      });
      await user.reload();
    } else {
      console.log("No user is currently logged in.");
    }
  };

  const createUser = async (
    email: string,
    password: string,
    username: string
  ): Promise<UserCredential> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    updateUsername(username);
    await auth.currentUser?.reload();
    return result;
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleAuth = (): void => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);
          // eslint-disable-next-line
        const token: string | undefined = credential?.accessToken;
        const userG: User = result.user;
        setUser(userG);
        navigate("/addcard");
        setNoUser(false);
      })
      .catch((error) => {
        //console.log(error.message);
        // eslint-disable-next-line
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromError(error);
      });
  };

  const triggerResetEmail = (): void => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      if (userEmail) {
        sendPasswordResetEmail(auth, userEmail)
          .then(() => {
            alert("Password reset email sent! Please check your email");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("User email is null.");
      }
    } else {
      console.log("No user is currently logged in.");
    }
  };

  const loginResetEmail = (emailForm: string): void => {
    sendPasswordResetEmail(auth, emailForm)
      .then(() => {
        alert("Password reset email sent! Please check your email");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const verifyEmail = async (): Promise<void> => {
    if (user) {
      await sendEmailVerification(user);
      console.log("Done!");
    } else {
      console.log("No user is currently logged in.");
    }
  };

  const logout = (): Promise<void> => {
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
        googleAuth,
        noUser,
        setNoUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
