import React from "react";
import { Auth, User, UserCredential } from "firebase/auth";

export interface IChildren {
  children?: React.ReactNode;
}

export interface IAuthContextModel {
  auth?: Auth; 
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string, username: string) => Promise<UserCredential>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  triggerResetEmail: () => void;
  verifyEmail: () => Promise<void>;
  loginResetEmail: (emailForm: string) => void;
  googleAuth: () => void;
  noUser: boolean;
  setNoUser: React.Dispatch<React.SetStateAction<boolean>>;
}