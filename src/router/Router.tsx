import { Route, Routes } from "react-router";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import Edit from "../components/pages/Edit";

export const Router = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route index element={<Edit />} />
      </Route>
    </Routes>
  );
};
