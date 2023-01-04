import React, { Component } from "react";
 
class AddCard extends Component {
  render() {
    return (
      <div>
        <h2>AddCard</h2>
        <div className="add-inner">
          <form>
            <input type="text" placeholder="write your word"/>
            <input type="text" placeholder="write translate"/>
            <textarea placeholder="place for your notes"></textarea>
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
          </form>
        </div>
      </div>
    );
  }
}
 
export default AddCard;