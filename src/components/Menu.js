import React, { Component } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import AddCard from "../pages/AddCard";
import "./styles/Menu.css";
import Layout from "./Layout";
import { SavedList } from "./SavedList";

class Menu extends Component {
  state = {
    word: "",
    translate: "",
    note: "",
    data: SavedList,
    warn: false,
  };
  onChangeWord = (event) => {
    this.setState({ word: event.target.value });
  };
  onChangeTranslate = (event) => {
    this.setState({ translate: event.target.value });
  };
  onChangeNote = (event) => {
    this.setState({ note: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let rw = this.state.word.replace(/\s/g, "");
    let rt = this.state.translate.replace(/\s/g, "");
    if (rw.length >= 1 && rt.length >= 1) {
      this.setState({ warn: false });
      const post = {
        word: this.state.word,
        translate: this.state.translate,
        note: this.state.note,
      };
      this.setState((state) => {
        const temp = [...state.data];
        temp.push(post);
        return { data: temp };
      });
      this.setState({
        word: "",
        translate: "",
        note: "",
      });
    } else {
      this.setState({ warn: true });
    }
  };
  deletePost = (id) => {
    this.setState({
      data: this.state.data.filter((el, ind) => ind !== id),
    });
  };
  //search
  //search
  //search
  onSearchF = (keyword) => {
    const filtered = this.state.data.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.includes(keyword)
      )
    );

    console.log(keyword);
    console.log(filtered);
  };

  render() {
    return (
      <div className="content">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home data={this.state.data} num={this.state.data.length} />
              }
            />
            <Route
              path="addcard"
              element={
                <AddCard
                  onChangeWord={this.onChangeWord}
                  onChangeNote={this.onChangeNote}
                  onChangeTranslate={this.onChangeTranslate}
                  onSubmit={this.onSubmit}
                  word={this.state.word}
                  translate={this.state.translate}
                  note={this.state.note}
                  warn={this.state.warn}
                />
              }
            />
            <Route
              path="saved"
              element={<Saved data={this.state.data} del={this.deletePost} onSearchF={this.onSearchF}/>}
            />
          </Route>
        </Routes>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
}
export default Menu;
