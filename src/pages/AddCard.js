import React, { Component } from "react";
 
class AddCard extends Component {

  render() {
     
    return (
      <div>
        <h2>AddCard</h2>
        <div className="add-inner">
          <form onSubmit={this.props.onSubmit}>
            <input onChange={this.props.onChangeWord} value={this.props.word} type="text" placeholder="write your word"/>
            <input onChange={this.props.onChangeTranslate} value={this.props.translate} type="text" placeholder="write translate"/>
            <textarea onChange={this.props.onChangeNote} value={this.props.note} placeholder="place for your notes"></textarea>
            <div className="btn-block">
              <button  type="submit">Save</button>
              <button type="reset">Reset</button>
            </div>
          </form>
          {this.props.warn ? <div className='warn'>Warning! <br/> Write word and translate!</div> : ''}
        </div>
      </div>
    );
  }
}
 
export default AddCard;