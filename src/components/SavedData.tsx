import React, { useState } from "react";
import "../pages/styles/SavedPage.scss";
import { ICardBase, ICardNew } from "../types/cardTypes";

interface ISavedData extends ICardBase {
  del: (id: string) => Promise<void>;
  editData: (item: ICardNew) => Promise<void>;
}

export default function SavedData({
  id,
  word,
  translate,
  note,
  category,
  del,
  editData,
}: ISavedData) {
  const [isEditing, setEditing] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslate, setNewTranslate] = useState(translate);
  const [newNote, setNewNote] = useState(note);
  const [newCategory, setNewCategory] = useState(category);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!newWord.trim() || !newTranslate.trim()) {
      return;
    }
    const item = {
      newWord: newWord,
      id: id,
      newTranslate: newTranslate,
      newNote: newNote,
      newCategory: newCategory,
    };
    editData(item);
    setEditing(false);
  }

  const removeEditing = () => {
    setEditing(false);
    setNewNote(note);
    setNewWord(word);
    setNewTranslate(translate);
    setNewCategory(category.toLowerCase());
  };

  const editingTemplate = (
    <form className="saved-card edit-saved-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder="word place"
          defaultValue={newWord || word}
          onChange={(e) => setNewWord(e.target.value)}
          required
          maxLength={25}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder="translate place"
          defaultValue={newTranslate || translate}
          onChange={(e) => setNewTranslate(e.target.value)}
          required
          maxLength={40}
        />
        <textarea
          id={id}
          className="card-text"
          placeholder="note place"
          defaultValue={newNote || note}
          onChange={(e) => setNewNote(e.target.value)}
          maxLength={300}
        />
        <input
          id={id}
          className="card-text"
          type="text"
          placeholder="category place"
          defaultValue={newCategory || category}
          onChange={(e) => setNewCategory(e.target.value)}
          maxLength={20}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="form-btn"
          onClick={() => removeEditing()}
        >
          <img src={require("../assets/cancel.svg").default} alt="Cancel" />
        </button>
        <button type="submit" className="form-btn">
          <img src={require("../assets/check.svg").default} alt="Save" />
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="saved-card">
      <div className="top-sec">
        <label className="saved-card-word">{word}</label>
        <div className="btn-block">
          <button
            type="button"
            className="form-btn"
            onClick={() => setEditing(true)}
          >
            <img src={require("../assets/edit.svg").default} alt="Edit" />
          </button>
          <button
            onClick={() => del(id)}
            type="button"
            className="delete-btn form-btn"
          >
            <img src={require("../assets/del.svg").default} alt="Delete" />
          </button>
        </div>
      </div>
      <div className="saved-info">
        <label className="saved-card-translate">{translate}</label>
        <label className="saved-card-note">{note}</label>
      </div>
      {category ? (
        <label className="saved-card-category">{category}</label>
      ) : (
        ""
      )}
    </div>
  );
  return (
    <div className="saved-wrapper">
      {isEditing ? editingTemplate : viewTemplate}
    </div>
  );
}
