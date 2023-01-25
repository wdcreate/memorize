import React from "react";
import { Link } from "react-router-dom";
import SavedData from "../components/SavedData";
import { db } from "../firebase";
import {
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Saved({ data, setData }) {

  function editData(id, newWord, newTranslate, newNote) {
    const editedDataList = async (card) => {
      if (id === card.id) {
        return {
          ...card,
          word: newWord,
          translate: newTranslate,
          note: newNote,
        };
      }
      let newFields = {
          word: newWord,
          translate: newTranslate,
          note: newNote,
      }
      await updateDoc(doc(db, "langcards-db", id), newFields);
      return card;
    };
      console.log(data)
      console.log(editedDataList)
    setData(editedDataList);
  } 

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
      <div className="sec-menu"></div>
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
