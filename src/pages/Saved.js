import { React, Component } from "react";

class Saved extends Component {
  render() {
    const sl = this.props.data.map((sl, id) => {
      return (
        <div className="saved-card" key={id}>
          <div className="content">
            <p>{id}</p>
            <p>{sl.word}</p>
            <p>{sl.translate}</p>
            <p>{sl.note}</p>
          </div>
          <div className="btn-block">
            <button
              onClick={() => this.props.del(id)}
              type="button"
              className="delete-btn"
            >
              delete
            </button>
            <button
              className="redo-btn"
            >
              redo
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h2>Saved list</h2>
        <div className="saved-inner">
          <div className="saved-list">{sl}</div>
        </div>
      </div>
    );
  }
}

export default Saved;
