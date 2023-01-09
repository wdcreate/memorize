import { React} from "react";
import {Link } from "react-router-dom";

function Saved({data, ons, del, filtered}) {
    const dt = data
    const sl = dt.map((sl, id) => {
        return (
          <div className="saved-card" key={id}>
            <div className="content">
              <p>{sl.word}</p>
              <p>{sl.translate}</p>
              <p>{sl.note}</p>
            </div>
            <div className="btn-block">
              <button
                onClick={() => del(id)}
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
    let dataLength = data.length
    return(
        <div>
          <div className="sec-menu">
            <h2>Saved list</h2>
          <input type="text" placeholder="search" onChange={(e)=>ons(e.target.value)}/>
          </div>
      <div className="filtered">
      {filtered.length ? (
        <ul style={{ maxHeight: '250px', overflowY: 'scroll' }}>
          {filtered.map((item, i) => (
            <li key={i}>{item.word}</li>
          ))}
        </ul>
      ) : (
        <div>No data found</div>
      )}
      <button onClick={()=>console.log(filtered)}>1111</button>
      </div>
        <div className="saved-inner">
          {dataLength>=1 ? <div className="saved-list">{sl}</div> : <Link className="main-btn" to="/addcard">Save your first word</Link>}
        </div>
      </div>
    )
}
export default Saved