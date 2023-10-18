import React from "react";
import "./styles/AddCardPage.scss";

interface IAddCardProp {
  word: string;
  translate: string;
  note: string;
  category: string;
  warn: boolean;
  resetFormAdd:  () => void;
  onSubmit: (event:  React.FormEvent<HTMLFormElement>)=>Promise<void>;
  onChangeWord: (event: React.ChangeEvent<HTMLInputElement> )=> void;
  onChangeTranslate: (event: React.ChangeEvent<HTMLInputElement> )=> void;
  onChangeNote: (event: React.ChangeEvent<HTMLTextAreaElement> )=> void;
  onChangeCategory: (event: React.ChangeEvent<HTMLInputElement> )=> void;
}

function AddCard(props: IAddCardProp) {
  return (
    <div>
      <div className="add-inner">
        <form onSubmit={props.onSubmit}>
          <div className="inputGroup">
            <input
              id="word"
              onChange={props.onChangeWord}
              value={props.word}
              type="text"
              required
              maxLength={25}
            />
            <label htmlFor="word">Place for Word</label>
          </div>
          <div className="inputGroup">
            <input
              id="translate"
              onChange={props.onChangeTranslate}
              value={props.translate}
              type="text"
              required
              maxLength={40}
            />
            <label htmlFor="translate">Place for Translate</label>
          </div>
          <div className="inputGroup">
            <textarea
              id="note"
              onChange={props.onChangeNote}
              value={props.note}
              placeholder=""
              required
              maxLength={300}
            ></textarea>
            <label htmlFor="note">Place for Notes</label>
          </div>
          <div className="inputGroup">
            <input
              onChange={props.onChangeCategory}
              value={props.category}
              type="text"
              required
              maxLength={20}
              id="category"
            />
            <label htmlFor="category">Place for Category</label>
          </div>
          <div className="btn-block">
            <button type="submit">Save</button>
            <button onClick={props.resetFormAdd} type="reset">
              Reset
            </button>
          </div>
        </form>
        {props.warn ? (
          <div className="warn">
            Warning! <br /> Write word and translate!
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AddCard;
