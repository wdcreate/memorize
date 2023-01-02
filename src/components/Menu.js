import React, { Component } from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AddCard from "../pages/AddCard";
import './styles/Menu.css'
import Layout from './Layout';


class Menu extends Component {
  render() {
    return (
          <div className="content">
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />}/>
                  <Route path="addcard" element={<AddCard />}/>
                  <Route path="profile" element={<Profile />}/>
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
