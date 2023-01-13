import React, { useState } from "react";


export default function SavedData({id, word, translate, note, del, editData}) {
  const [isEditing, setEditing] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newTranslate, setNewTranslate] = useState('');
  const [newNote, setNewNote] = useState('');
  function handleChangeWord(e) {
    setNewWord(e.target.value);
  }
  function handleChangeTranslate(e) {
    setNewTranslate(e.target.value);
  }
  function handleChangeNote(e) {
    setNewNote(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newWord.trim() || !newTranslate.trim()|| !newNote.trim()) {
      return;
    }
    editData(id, newWord, newTranslate, newNote);
    setNewWord("");
    setNewTranslate("");
    setNewNote("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="saved-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id={id}
          className="card-text"
          type="text"
          value={newWord || word}
          onChange={handleChangeWord}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          value={newTranslate || translate}
          onChange={handleChangeTranslate}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          value={newNote || note}
          onChange={handleChangeNote}
        />
      </div>
      <div className="btn-group">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="saved-card ">
      <div className="saved-info">
          <label className="todo-label" >
            {word}
          </label>
          <label className="todo-label" >
            {translate}
          </label>
          <label className="todo-label" >
            {note}
          </label>
        </div>
        <div className="btn-block">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          >
            Edit 
          </button>
          <button
                onClick={() => del(id)}
                type="button"
                className="delete-btn"
              >
                delete
              </button>
        </div>
    </div>
  );
  return <div className="saved-wrapper" >{isEditing ? editingTemplate : viewTemplate}</div>;
}