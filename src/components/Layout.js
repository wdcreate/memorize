import { Outlet, NavLink} from "react-router-dom";
import Header from './Header';

const Layout = () => {
  return (
    <>
    <Header/>
      <ul className="menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/addcard">+</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
