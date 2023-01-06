import React, { Component } from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import AddCard from "../pages/AddCard";
import './styles/Menu.css'
import Layout from './Layout';
import {SavedList} from "./SavedList";

class Menu extends Component {
  state = { 
    word: '',
    translate: '',
    note: '',
    data: SavedList,
  }
  onChangeWord = (event)=>{
    this.setState({word:event.target.value})
  }
  onChangeTranslate = (event)=>{
    this.setState({translate:event.target.value})
  }
  onChangeNote = (event)=>{
    this.setState({note:event.target.value})
  }
  onSubmit = (e) =>{
    e.preventDefault()
    const post = {
      word: this.state.word,
      translate: this.state.translate,
      note: this.state.note,
    }
    this.setState((state)=>{
      const temp =[...state.data]
      temp.push(post)
      return{data: temp}
    })
    console.log(this.state.data)
  }
  render() {
    return (
          <div className="content">
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home data={this.state.data} num={this.state.data.length}/>}/>
                  <Route path="addcard" element={<AddCard onChangeWord={this.onChangeWord} onChangeNote={this.onChangeNote} onChangeTranslate={this.onChangeTranslate} onSubmit={this.onSubmit} />}/>
                  <Route path="saved" element={<Saved data={this.state.data}/>}/>
              </Route>
            </Routes>
            <div>
            <Outlet/>
            </div>
        </div>
    );
  }
}
export default Menu;
