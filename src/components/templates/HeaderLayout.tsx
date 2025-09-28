import Header from "../organisms/Header";
import { Outlet } from "react-router";

export const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
