import { Route, Routes } from "react-router";
import { HeaderLayout } from "../layouts/HeaderLayout";
import BattleLogFormPage from "../features/battleLog/pages/BattleLogFormPage";
import BattleLogListPage from "../features/battleLog/pages/BattleLogListPage";
import ProtectedRoute from "@/app/ProtectedRoute";
import Login from "@/features/auth/pages/Login";
import BattleLogViewPage from "@/features/battleLog/pages/BattleLogViewPage";
import Contact from "@/features/contact/pages/Contact";

export const Router = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<BattleLogListPage />} />
          <Route path="battle_logs">
            <Route path="new" element={<BattleLogFormPage />} />
            <Route path=":logNo" element={<BattleLogViewPage />} />
            <Route path=":logNo/edit" element={<BattleLogFormPage />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>
    </Routes>
  );
};
