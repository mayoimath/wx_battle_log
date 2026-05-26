import { Route, Routes } from "react-router";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import Edit from "../components/pages/Edit";
import Home from "../components/pages/Home";
import Create from "@/components/pages/Create";
import Login from "@/components/pages/Login";
import ProtectedRoute from "@/components/pages/ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="battle_log" element={<Create />} />
          <Route path="battle_log/:logNo" element={<Edit />} />
        </Route>
      </Route>
    </Routes>
  );
};
