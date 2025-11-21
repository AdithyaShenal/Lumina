import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div id="main" className="container m-auto mt-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
