import React, { useState } from "react";
import "../pages/styles/SavedPage.scss"

export default function SavedData({id, word, translate, note, category, del, editData}) {
  const [isEditing, setEditing] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslate, setNewTranslate] = useState(translate);
  const [newNote, setNewNote] = useState(note);
  const [newCategory, setNewCategory] = useState(category);
  function handleSubmit(e) {
    e.preventDefault();
    if (!newWord.trim() || !newTranslate.trim()) {
      return;
    }
    editData(id, newWord, newTranslate, newNote, newCategory);
    setEditing(false);
  }
  const removeEditing =()=>{
    setEditing(false)
    setNewNote(note)
    setNewWord(word)
    setNewTranslate(translate)
    setNewCategory(category)
  }
  const editingTemplate = (
    <form className="saved-card edit-saved-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder='word place'
          defaultValue={newWord || word}
          onChange={(e)=>setNewWord(e.target.value)}
          required
        />
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder='translate place'
          defaultValue={newTranslate || translate}
          onChange={(e)=>setNewTranslate(e.target.value)}
          required
        />
        <textarea
          id={id}
          className="card-text"
          type="text"
          placeholder='note place'
          defaultValue={newNote || note}
          onChange={(e)=>setNewNote(e.target.value)}
        />
         <input
          id={id}
          className="card-text"
          type="text"
          placeholder='category place'
          defaultValue={newCategory || category}
          onChange={(e)=>setNewCategory(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="form-btn"
          onClick={() => removeEditing()}>
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
      <div className="top-sec">
          <label className="saved-card-word" >
            {word}
          </label>
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
      <div className="saved-info">
          <label className="saved-card-translate" >
            {translate}
          </label>
          <label className="saved-card-note" >
            {note}
          </label>
        </div>
        <label className="saved-card-category" >
            {category}
          </label>
    </div>
  );
  return <div className="saved-wrapper" >{isEditing ? editingTemplate : viewTemplate}</div>;
}