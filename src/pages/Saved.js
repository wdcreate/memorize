import React from "react";
import {Link } from "react-router-dom";
import SavedData from "../components/SavedData";


function Saved({data, setData}) {

  function editData(id, newWord, newTranslate, newNote) {

    const editedDataList = data.map((card) => {
      if (id === card.id) {
        return { ...card, name: newWord, translate: newTranslate, note: newNote };
      }
      return card;
    });
    setData(editedDataList);
  }
  function deletePost(id) {
    const remainingTasks = data.filter((card) => id !== card.id);
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
          <h2>Saved list</h2>          
        </div>
      <div className="saved-inner">
        {data.length>=1 ? <div className="saved-list">{dataList}</div> : <Link className="main-btn" to="/addcard">Save your first word</Link>}
      </div>
      
    </div>
  )
  }

export default Saved;

