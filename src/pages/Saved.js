import React from "react";
import {Link } from "react-router-dom";
import SavedData from "../components/SavedData";


function Saved({data, setData}) {

  function editData(id, newWord, newTranslate, newNote) {

    const editedDataList = data.map((card) => {
      if (id === card.id) {
        return { ...card, word: newWord, translate: newTranslate, note: newNote };
      }
      return card;
    });
    localStorage.setItem('langCards', JSON.stringify(editedDataList))
    setData(editedDataList);
    
  }
  function deletePost(id) {
    const remainingTasks = data.filter((card) => id !== card.id);
    localStorage.setItem('langCards', JSON.stringify(remainingTasks))
    setData(remainingTasks);
  }
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

  return(
      <div>
        <div className="sec-menu">
        </div>
      <div className="saved-inner">
        {data.length>=1 ? <div className="saved-list">{dataList}</div> : <div className="oops-section">
              <img src="../assets/oops.png" alt="Oops..." />
            <Link className="main-btn" to="/addcard">
              Add first word
            </Link>
            </div>}
      </div>
      
    </div>
  )
  }
export default Saved;

