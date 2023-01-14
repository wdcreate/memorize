import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";

const Layout = ({searchBlock, onSearch, data}) => {
  return (
    <>
      <Header sblock={searchBlock} onS ={onSearch} data={data}/>
      <div className="menu-inner">
        <ul className="menu">
          <li>
            <NavLink to="/">
            <img src="./assets/home.svg" alt="Home" />

            </NavLink>
          </li>
          <li>
            <NavLink to="/addcard">
            <img src="./assets/add-btn.svg" alt="Add word" />

            </NavLink>
          </li>
          <li>
            <NavLink to="/saved">
            <img src="./assets/saved.svg" alt="Saved list" />

            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
