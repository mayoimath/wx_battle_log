import { Route, Routes } from "react-router";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import Edit from "../components/pages/Edit";
import Home from "../components/pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route index element={<Home />} />
        <Route path="edit" element={<Edit />} />
      </Route>
    </Routes>
  );
};
