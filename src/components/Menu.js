import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import AddCard from "../pages/AddCard";
import Search from "../pages/Search";
import Account from "../pages/Account";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "./Layout";
//import { SavedList } from "./SavedList";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { db } from "../firebase";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";
import "./styles/Menu.css";

function Menu() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [note, setNote] = useState("");
  let [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [warn, setWarn] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "langcards-db"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let wordsArr = [];
      querySnapshot.forEach((doc) => {
        wordsArr.push({ ...doc.data(), id: doc.id });
      });
      setData(wordsArr);
    });
    return () => unsubscribe();
  }, []);
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
      });
      console.log(word, translate, note)
      setWord("");
      setTranslate("");
      setNote("");
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
    <div className="content">
      <AuthContextProvider>
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
      </AuthContextProvider>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Menu;
