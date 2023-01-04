import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="menu-inner">
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/addcard">+</NavLink>
          </li>
          <li>
            <NavLink to="/saved">Saved</NavLink>
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
