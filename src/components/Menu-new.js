import React, { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import AddCard from "../pages/AddCard";
import Search from "../pages/Search";
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
    const [filteredData, setFilteredData] = useState([]);
    //const [searchBlock, setSearchBlock] = useState(false);
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
     const deletePost =(id)=>{
       setData(data.filter((el, ind)=>(ind !==id)))
     }
     const resetForm =()=>{
      setSearchInput('')
      setFilteredData('')

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
                />
              }
            />
            <Route
              path="saved"
              element={<Saved data={data}  del={deletePost} />}
            />
            <Route
              path="search"
              element={<Search data={data} resetForm={resetForm} del={deletePost} ons={onSearchF} filtered={filteredData} searchInput={searchInput}/>}
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