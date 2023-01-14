import React, { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import AddCard from "../pages/AddCard";
import Search from "../pages/Search";
//import SavedData from "../components/SavedData";
import "./styles/Menu.css";
import Layout from "./Layout";
import { SavedList } from "./SavedList";

function Menu() {
    const [word, setWord] = useState('');
    const [translate, setTranslate] = useState('');
    const [note, setNote] = useState('');
    let [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState(SavedList);
    const [warn, setWarn] = useState(false);
    //const [editp, setEditp] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

      
  
   

    const onChangeWord = (event) => {
        setWord(event.target.value);
      };
     const onChangeTranslate = (event) => {
        setTranslate(event.target.value);
      };
       const onChangeNote = (event) => {
        setNote(event.target.value );
      };
     const onSubmit = (e) => {
        e.preventDefault();
        let rw = word.replace(/\s/g, "");
        let rt = translate.replace(/\s/g, "");
        if (rw.length >= 1 && rt.length >= 1) {
          setWarn(false);
          const post = {
            id: `#ea-${data.length+1}`,
            word: word,
            translate: translate,
            note: note,
          };
          let temp = [...data];
          temp.push(post);
          setData(temp);
          setWord('');
          setTranslate('');
          setNote('');
        } else {
            setWarn(true);
        }
      };

     const resetForm =()=>{
      setSearchInput('')
      setFilteredData('')
     }
     const resetFormAdd=()=>{
      setWord('');
          setTranslate('');
          setNote('');
     }
     
     let filtered
     const onSearchF = (keyword) => {
        filtered = data.filter((entry) =>
          Object.values(entry).some(
            (val) => typeof val === "string" && val.toLowerCase().includes(keyword.toLowerCase())
            )
          );
          if(keyword.length >0){
            setFilteredData(filtered)
            setSearchInput(keyword)
          }else{
            setFilteredData('')
            setSearchInput('')
          }
      };
      
    return(
       <div className="content">
        <Routes>
          <Route path="/" element={<Layout onSearch={()=>onSearchF()} data={data}/>}>
            <Route
              index
              element={
                <Home data={data} num={data.length} />
              }
            />
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
              element={<Saved data={data}  setData={setData}/>}
            />
            <Route
              path="search"
              element={<Search data={data} resetForm={resetForm}  ons={onSearchF} filtered={filteredData} searchInput={searchInput}/>}
            />
          </Route>
        </Routes>
        <div>
          <Outlet />
        </div>
      </div>
    )
}
export default Menu;