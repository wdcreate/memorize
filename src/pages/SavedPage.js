import React from "react";
import { Link } from "react-router-dom";
import SavedData from "../components/SavedData";
import { db } from "../firebase";
import {
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./styles/SavedPage.css"


export default function Saved({ data, setData, }) {
  
const editData = async (id, newWord, newTranslate, newNote) => {
  const editedDataList = await Promise.all(data.map(async (card) => {
    let newFields = {
      word: newWord,
      translate: newTranslate,
      note: newNote,
    };

    if (id === card.id) {
      return { ...card, ...newFields };
    }
    await updateDoc(doc(db, "langcards-db", id), newFields);
    return card;
  }));
  setData(editedDataList);
};

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "langcards-db", id));
  };
  const dataList = data.map((card) => (
    <SavedData
      id={card.id}
      key={card.id}
      word={card.word}
      translate={card.translate}
      note={card.note}
      editData={editData}
      del={deletePost}
    />
  ));

  return (
    <div>
      <div className="saved-inner">
        {data.length >= 1 ? (
          <div className="saved-list">{dataList}</div>
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
