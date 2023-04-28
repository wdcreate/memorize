import React from "react";
import "./styles/AddCardPage.scss";

function AddCard(props) {
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
            ></textarea>
            <label htmlFor="note">Place for Notes</label>
          </div>
          <div className="inputGroup">
            <input
              onChange={props.onChangeCategory}
              value={props.category}
              type="text"
              required
              maxLength="20"
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
