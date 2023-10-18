import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/HomePage";
import Saved from "../pages/SavedPage";
import AboutPage from "../pages/AboutPage";
import AddCard from "../pages/AddCardPage";
import Account from "../pages/AccountPage";
import Login from "../pages/LoginPage";
import SignUp from "../pages/SignUpPage";
import Layout from "./Layout";
import Loader from "./Loader";
import { UserAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  where,
} from "firebase/firestore";
import { ICardMain } from "../types/cardTypes";

function AppBody() {
  const [word, setWord] = useState<string>("");
  const [translate, setTranslate] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [data, setData] = useState<ICardMain[]>([]);
  const [warn, setWarn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = UserAuth();

  const fetchProduct = async (): Promise<(() => void) | undefined> => {
    if (!user) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const ref = collection(db, "langcards-db");
    const q = query(ref, where("author", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const arr: any = [];
        querySnapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setData(arr);
        setIsLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [user]);

  const onChangeWord = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWord(event.target.value);
  };

  const onChangeTranslate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTranslate(event.target.value);
  };

  const onChangeNote = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNote(event.target.value);
  };

  const onChangeCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCategory(event.target.value);
  };

  const onSubmit = async (
    event:  React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    let rw = word.replace(/\s/g, "");
    let rt = translate.replace(/\s/g, "");
    if (rw.length >= 1 && rt.length >= 1) {
      setWarn(false);
      await addDoc(collection(db, "langcards-db"), {
        word: word,
        translate: translate,
        note: note,
        category: category.toLowerCase(),
        date: new Date(),
        author: user.uid,
        id: new Date().getTime(),
      });
      setWord("");
      setTranslate("");
      setNote("");
      setCategory("");
    } else {
      setWarn(true);
    }
  };

  const resetFormAdd = (): void => {
    setWord("");
    setTranslate("");
    setNote("");
    setCategory("");
  };

  return (
    <div className="main-inner">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home data={data} num={data.length} />} />
              <Route
                path="addcard"
                element={
                  <AddCard
                    onChangeWord={onChangeWord}
                    onChangeNote={onChangeNote}
                    onChangeTranslate={onChangeTranslate}
                    onChangeCategory={onChangeCategory}
                    onSubmit={onSubmit}
                    word={word}
                    translate={translate}
                    note={note}
                    category={category}
                    warn={warn}
                    resetFormAdd={resetFormAdd}
                  />
                }
              />
              <Route
                path="saved"
                element={<Saved data={data} setData={setData} />}
              />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Routes>
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
export default AppBody;
