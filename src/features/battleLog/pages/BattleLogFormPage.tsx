import { toaster } from "../../../components/ui/toaster";
import type { BattleLog } from "../types/BattleLog";
import { useParams } from "react-router";
import useFetchBattleLog from "@/features/battleLog/hooks/UseFetchBattleLog";
import updateBattleLog from "@/features/battleLog/api/updateBattleLog";
import { useNavigate } from "react-router";
import BattleLogForm from "../components/BattleLogForm";
import insertBattleLog from "../api/insertBattleLog";

const BattleLogFormPage = () => {
  const { logNo } = useParams();
  const isEdit = !!logNo;
  const battleLog = isEdit ? useFetchBattleLog(Number(logNo)) : { title: "", lrig: "", battles: [{ lrig: "", playFirst: "1", result: "1" }] };

  const navigate = useNavigate();

  const operation = isEdit ? "更新" : "登録";
  const onSubmit = async (field: BattleLog) => {
    const { error } = isEdit ? await updateBattleLog(Number(logNo), field) : await insertBattleLog(field);
    if (error) {
      toaster.create({ title: `${operation}失敗`, type: "error" });
      return;
    }

    toaster.create({ title: `${operation}しました。`, type: "success" });
    navigate("/");
  };
  return <BattleLogForm {...{ battleLog, onSubmit, operation }} />;
};

export default BattleLogFormPage;
