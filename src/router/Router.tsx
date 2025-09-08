import { Route, Routes } from "react-router";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import Home from "../components/pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
    </Routes>
  );
};
