import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/HomePage";
import Saved from "../pages/SavedPage";
import AddCard from "../pages/AddCardPage";
import Search from "../pages/SearchPage";
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

function Menu() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [note, setNote] = useState("");
  let [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [warn, setWarn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = UserAuth();
  
  const fetchProduct = async () => {
    if (!user) {
      setData([]);
      setIsLoading(false);
    }
    const ref = collection(db, "langcards-db");
    const q = query(ref, where("author", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const arr = [];
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

  const onChangeWord = (event) => {
    setWord(event.target.value);
  };
  const onChangeTranslate = (event) => {
    setTranslate(event.target.value);
  };
  const onChangeNote = (event) => {
    setNote(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let rw = word.replace(/\s/g, "");
    let rt = translate.replace(/\s/g, "");
    if (rw.length >= 1 && rt.length >= 1) {
      setWarn(false);
      await addDoc(collection(db, "langcards-db"), {
        word: word,
        translate: translate,
        note: note,
        category: "category",
        author: user.uid,
      });
      setWord("");
      setTranslate("");
      setNote("");
      console.log(data);
    } else {
      setWarn(true);
    }
  };
  const resetFormAdd = () => {
    setWord("");
    setTranslate("");
    setNote("");
  };
  let filtered;
  const onSearchF = (keyword) => {
    filtered = data.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    if (keyword.length > 0) {
      setFilteredData(filtered);
      setSearchInput(keyword);
    } else {
      setFilteredData("");
      setSearchInput("");
    }
  };

  return (
    <div className="main-inner">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Layout onSearch={() => onSearchF()} data={data} />}
            >
              <Route index element={<Home data={data} num={data.length} />} />
              <Route
                path="addcard"
                element={
                  <AddCard
                    onChangeWord={onChangeWord}
                    onChangeNote={onChangeNote}
                    onChangeTranslate={onChangeTranslate}
                    onSubmit={onSubmit}
                    word={word}
                    translate={translate}
                    note={note}
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
                path="search"
                element={
                  <Search
                    data={data}
                    ons={onSearchF}
                    filtered={filteredData}
                    searchInput={searchInput}
                  />
                }
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
export default Menu;
