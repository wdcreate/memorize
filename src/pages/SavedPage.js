import React, { useState } from "react";
import { Link } from "react-router-dom";
import SavedData from "../components/SavedData";
import { db } from "../firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import "./styles/SavedPage.scss";

export default function Saved({ data, setData }) {
  const [sortType, setSortType] = useState(1);
  let [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredCategData, setFilteredCategData] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const editData = async (id, newWord, newTranslate, newNote, newCategory) => {
    const editedDataList = await Promise.all(
      data.map(async (card) => {
        let newFields = {
          word: newWord,
          translate: newTranslate,
          note: newNote,
          category: newCategory,
          date: new Date(),
        };
        if (id === card.id) {
          return { ...card, ...newFields };
        }
        await updateDoc(doc(db, "langcards-db", id), newFields);
        return card;
      })
    );
    setData(editedDataList);
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "langcards-db", id));
  };
  const sortedData = (baseData) => {
    if (sortType === 1) {
      return baseData
        .sort((a, b) => b.date - a.date)
        .map((card) => (
          <SavedData
            id={card.id}
            key={card.id}
            word={card.word}
            translate={card.translate}
            note={card.note}
            category={card.category}
            editData={editData}
            del={deletePost}
          />
        ));
    } else {
      return baseData
        .sort((a, b) => a.date - b.date)
        .map((card) => (
          <SavedData
            id={card.id}
            key={card.id}
            word={card.word}
            translate={card.translate}
            note={card.note}
            category={card.category}
            editData={editData}
            del={deletePost}
          />
        ));
    }
  };
  let filtered;
  const filterKeys = ["word", "translate", "note"];
  const onSearchF = (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    if (filterMode) {
      filtered = filteredCategData.filter((entry) => {
        return filterKeys.some((key) =>
          entry[key].toLowerCase().includes(lowerKeyword)
        );
      });
    } else {
      filtered = data.filter((entry) => {
        return filterKeys.some((key) =>
          entry[key].toLowerCase().includes(lowerKeyword)
        );
      });
    }
    if (keyword.length > 0) {
      setFilteredData(filtered);
      setSearchInput(keyword);
    } else {
      setFilteredData("");
      setSearchInput("");
    }
  };

  const dataChanges = () => {
    if (searchActive === true && searchInput.length >= 2) {
      if (filteredData.length >= 1) {
        return sortedData(filteredData);
      } else {
        return <div className="nodata">Nothing found</div>;
      }
    } else if (filterMode) {
      return sortedData(filteredCategData);
    } else {
      return sortedData(data);
    }
  };
  const filterByCategory = (categ) => {
    setFilterMode(true);
    if (categ === "all") {
      filtered = data;
    } else {
      filtered = data.filter((entry) => {
        return entry.category.toLowerCase().includes(categ.toLowerCase());
      });
    }
    setFilteredCategData(filtered);
  };
  const handleSelect = (value) => {
    filterByCategory(value);
    setSearchActive(false);
    setSearchInput("");
  };
  return (
    <div>
      <div className="saved-inner">
        {data.length >= 1 ? (
          <div className="savedpage-wrapper">
            <div className="saved-nav">
              <div className="saved-menu">
                <button
                  type="button"
                  onClick={() => setSortType(1)}
                  className="sort-btn sort-new "
                  id={sortType === 1 ? "active-sorttype" : ""}
                >
                  <img src="./assets/sortnew.svg" alt="Sort by date" />
                </button>
                <button
                  type="button"
                  onClick={() => setSortType(2)}
                  className="sort-btn sort-old"
                  id={sortType === 2 ? "active-sorttype" : ""}
                >
                  <img src="./assets/sortold.svg" alt="Sort by date" />
                </button>
              </div>
              <div className="filter">
                <select
                  defaultValue={"all"}
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  {[...new Set(data.map((hs) => hs.category.toLowerCase()))].map((sn) => (
                    <option key={sn}>{sn}</option>
                  ))}
                  <option value="all">All</option>
                </select>
                <span className="arrow"></span>
              </div>
              <div className="search-block">
                <input
                  type="text"
                  value={searchInput}
                  className={
                    searchActive ? "search-input-active" : "search-input"
                  }
                  placeholder="place for search"
                  onChange={(e) => onSearchF(e.target.value)}
                />
                <div
                  className={searchActive ? "search hide" : "search"}
                  onClick={() => setSearchActive(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{ width: "31", height: "31", fill: "#000" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g style={{ strokeWidth: "0" }}></g>
                    <g
                      style={{
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    ></g>
                    <g>
                      {" "}
                      <rect style={{ fill: "#000" }}></rect>{" "}
                      <path
                        style={{
                          fillRule: "evenodd",
                          cliRule: "evenodd",
                          fill: "#fff",
                        }}
                        d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="saved-list">{dataChanges()}</div>
          </div>
        ) : (
          <div className="oops-section">
            <img src="../assets/oops.png" alt="Oops..." />
            <Link className="main-btn" to="/addcard">
              Add first word
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
