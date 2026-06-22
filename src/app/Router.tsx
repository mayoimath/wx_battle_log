import { Route, Routes } from "react-router";
import { HeaderLayout } from "../layouts/HeaderLayout";
import Edit from "../features/battleLog/pages/Edit";
import Home from "../features/battleLog/pages/Home";
import Create from "@/features/battleLog/pages/Create";
import ProtectedRoute from "@/app/ProtectedRoute";
import Login from "@/features/auth/pages/Login";

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
