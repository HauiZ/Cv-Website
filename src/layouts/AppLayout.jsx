import { Outlet } from "react-router-dom";
import ScrollAndLoaderHandler from "../components/ScrollAndLoaderHandler";

const AppLayout = () => {
  return (
    <>
      <ScrollAndLoaderHandler />
      <Outlet />
    </>
  );
};

export default AppLayout;
