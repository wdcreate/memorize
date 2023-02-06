import React from "react";
 
function AddCard(props) {
  return (
    <div>
      <div className="add-inner">
        <form onSubmit={props.onSubmit}>
          <input onChange={props.onChangeWord} value={props.word} type="text" placeholder="write your word"/>
          <input onChange={props.onChangeTranslate} value={props.translate} type="text" placeholder="write translate"/>
          <textarea onChange={props.onChangeNote} value={props.note} placeholder="place for your notes"></textarea>
          <div className="btn-block">
            <button  type="submit">Save</button>
            <button onClick={props.resetFormAdd} type="reset">Reset</button>
          </div>
        </form>
        {props.warn ? <div className='warn'>Warning! <br/> Write word and translate!</div> : ''}
      </div>
    </div>
  );
}
 
export default AddCard;