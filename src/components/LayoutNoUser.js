import { Outlet} from "react-router-dom";
import Header from "./Header";
import "./styles/Layout.scss"

const LayoutNoUser = ({nouser}) => {
  return (
    <>
      <Header nouser={nouser}/>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default LayoutNoUser;
