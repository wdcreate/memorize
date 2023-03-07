import React from "react";
import "./styles/AddCardPage.scss";

function AddCard(props) {
  return (
    <div>
      <div className="add-inner">
        <form onSubmit={props.onSubmit}>
          <input
            onChange={props.onChangeWord}
            value={props.word}
            type="text"
            placeholder="write your word"
            required
          />
          <input
            onChange={props.onChangeTranslate}
            value={props.translate}
            type="text"
            placeholder="write translate"
            required
          />
          <textarea
            onChange={props.onChangeNote}
            value={props.note}
            placeholder="place for your notes"
          ></textarea>
          <input
            onChange={props.onChangeCategory}
            value={props.category}
            type="text"
            placeholder="write category"
            required
            maxLength="20"
          />
          {/* 
         <div className="color-block">
          <label>Choose card color:</label>
           <input
            type="color"
            defaultValue="#bd0017"
          />
          </div>
         */}

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
