import { React } from "react";

function Search({ data, ons, del, filtered, searchInput, resetForm }) {
  return (
    <div className="search-page">
      <div className="sec-menu">
        <h2>Search list</h2>
        <form>
          <input
            type="text"
            value={searchInput}
            placeholder="search"
            onChange={(e) => ons(e.target.value)}
          />
          <button onClick={resetForm} type="reset">
            reset
          </button>
        </form>
      </div>
      <div className="filtered">
        {filtered.length ? (
          <ul className="search-list">
            {filtered.map((item, i) => (
              <li key={i}>
                {item.word} <span>{item.translate}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>Write your correct search data</div>
        )}
      </div>
    </div>
  );
}
export default Search;
