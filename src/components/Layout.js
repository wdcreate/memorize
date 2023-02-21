import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";
import "./styles/Layout.css"

const Layout = ({searchBlock, onSearch, data}) => {
  return (
    <>
      <Header sblock={searchBlock} onS ={onSearch} data={data}/>
      <div className="menu-inner">
        <ul className="menu">
          <li>
            <NavLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill:"none", stroke:"currentColor", strokeWidth: 2, strokeLinecap:"round", strokLinejoin:"round" }}className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </NavLink>
          </li>
          <li>
            <NavLink to="/addcard">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill:"none" ,stroke:"currentColor", strokeWidth: 2, strokeLinecap:"round", strokeLinejoin:"round"}} className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill:"none",stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round",}} className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
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
