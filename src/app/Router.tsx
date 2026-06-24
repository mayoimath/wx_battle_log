import { Route, Routes } from "react-router";
import { HeaderLayout } from "../layouts/HeaderLayout";
import BattleLogFormPage from "../features/battleLog/pages/BattleLogFormPage";
import BattleLogListPage from "../features/battleLog/pages/BattleLogListPage";
import ProtectedRoute from "@/app/ProtectedRoute";
import Login from "@/features/auth/pages/Login";

export const Router = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<BattleLogListPage />} />
          <Route path="battle_log" element={<BattleLogFormPage />} />
          <Route path="battle_log/:logNo" element={<BattleLogFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
