import React, {useState} from "react";
import { Link } from "react-router-dom";
import SavedData from "../components/SavedData";
import { db } from "../firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import "./styles/SavedPage.scss";

export default function Saved({ data, setData }) {
  const [sortType, setSortType] = useState(1);
  const editData = async (id, newWord, newTranslate, newNote) => {
    const editedDataList = await Promise.all(
      data.map(async (card) => {
        let newFields = {
          word: newWord,
          translate: newTranslate,
          note: newNote,
          date: new Date(),
        };

        if (id === card.id) {
          return { ...card, ...newFields };
        }
        await updateDoc(doc(db, "langcards-db", id), newFields);
        return card;
      })
    );
    setData(editedDataList);
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "langcards-db", id));
  };
  const sortedData = () =>{
    if (sortType === 1) {
      return data.sort((a, b)=> b.date - a.date).map((card) => (
          <SavedData
            id={card.id}
            key={card.id}
            word={card.word}
            translate={card.translate}
            note={card.note}
            editData={editData}
            del={deletePost}
          />
        )) 
    }else{
      return data.sort((a, b)=> a.date - b.date).map((card) => (
        <SavedData
          id={card.id}
          key={card.id}
          word={card.word}
          translate={card.translate}
          note={card.note}
          editData={editData}
          del={deletePost}
        />
      )) 
    }
  }
  return (
    <div>
      <div className="saved-inner">
        {data.length >= 1 ? (
          <div className="saved-wrapper">
            <div className="saved-menu">
              <button type="button" onClick={()=>setSortType(1)} className="sort-btn sort-new " id={sortType === 1 ? 'active-sorttype' : ''} >
                <img src="./assets/sortnew.svg" alt="Sort by date" />
              </button>
              <button type="button" onClick={()=>setSortType(2)} className="sort-btn sort-old" id={sortType === 2 ? 'active-sorttype' : ''}>
                <img src="./assets/sortold.svg" alt="Sort by date" />
              </button>
            </div>
            <div className="saved-list">{sortedData()}</div>
          </div>
        ) : (
          <div className="oops-section">
            <img src="../assets/oops.png" alt="Oops..." />
            <Link className="main-btn" to="/addcard">
              Add first word
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
