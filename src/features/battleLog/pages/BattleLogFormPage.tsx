import { toaster } from "../../../components/ui/toaster";
import type { BattleLogDB, BattleLogInput } from "../types/BattleLog";
import { useParams } from "react-router";
import useFetchBattleLog from "@/features/battleLog/hooks/UseFetchBattleLog";
import updateBattleLog from "@/features/battleLog/api/updateBattleLog";
import { useNavigate } from "react-router";
import BattleLogForm from "../components/BattleLogForm";
import insertBattleLog from "../api/insertBattleLog";

const toBattleLogInput = (battleLog: BattleLogDB | undefined): BattleLogInput | undefined => {
  if (!battleLog) return undefined;
  const { title, lrigId, detail } = battleLog;
  return {
    title,
    lrig: lrigId.toString(),
    battles: detail.map(({ lrigId, playFirst, result, memo }) => ({
      lrig: lrigId.toString(),
      playFirst: (playFirst ?? false) ? "1" : "0",
      result: (result ?? 0).toString(),
      memo,
    })),
  };
};

const BattleLogFormPage = () => {
  const { logNo } = useParams();
  const isEdit = !!logNo;
  const battleLog = isEdit
    ? toBattleLogInput(useFetchBattleLog(Number(logNo)))
    : { title: "", lrig: "", battles: [{ lrig: "", playFirst: "1", result: "1", memo: "" }] };

  const navigate = useNavigate();

  const operation = isEdit ? "更新" : "登録";
  const onSubmit = async (field: BattleLogInput) => {
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
