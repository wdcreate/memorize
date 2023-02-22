import React, { useState } from "react";
import "../pages/styles/SavedPage.scss"

export default function SavedData({id, word, translate, note, del, editData}) {
  const [isEditing, setEditing] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslate, setNewTranslate] = useState(translate);
  const [newNote, setNewNote] = useState(note);
  function handleSubmit(e) {
    e.preventDefault();
    if (!newWord.trim() || !newTranslate.trim()|| !newNote.trim()) {
      return;
    }
    editData(id, newWord, newTranslate, newNote);
    setEditing(false);
  }
  const editingTemplate = (
    <form className="saved-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder='word place'
          defaultValue={newWord || word}
          onChange={(e)=>setNewWord(e.target.value)}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder='translate place'
          defaultValue={newTranslate || translate}
          onChange={(e)=>setNewTranslate(e.target.value)}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder='note place'
          defaultValue={newNote || note}
          onChange={(e)=>setNewNote(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="form-btn"
          onClick={() => setEditing(false)}>
      <img src="../assets/cancel.svg" alt="Cancel" />
        </button>
        <button type="submit" className="form-btn">
        <img src="../assets/check.svg" alt="Save" />
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="saved-card">
      <div className="saved-info">
          <label className="saved-card-word" >
            {word}
          </label>
          <label className="saved-card-translate" >
            {translate}
          </label>
          <label className="saved-card-note" >
            {note}
          </label>
        </div>
        <div className="btn-block">
        <button
          type="button"
          className="form-btn"
          onClick={() => setEditing(true)}
          >
            <img src="../assets/edit.svg" alt="Edit" />
          </button>
          <button
                onClick={() => del(id)}
                type="button"
                className="delete-btn form-btn"
              >
            <img src="../assets/del.svg" alt="Delete" />
              </button>
        </div>
    </div>
  );
  return <div className="saved-wrapper" >{isEditing ? editingTemplate : viewTemplate}</div>;
}