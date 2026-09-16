import { useState, useEffect } from "react";
import { type BattleLogDB } from "../types/BattleLog";
import fetchBattleLog from "../api/fetchBattleLog";

const useFetchBattleLog = (logNo: number) => {
  const [battleLog, setBattleLog] = useState<BattleLogDB>();
  useEffect(() => {
    (async () => {
      setBattleLog(await fetchBattleLog(logNo));
    })();
  }, []);
  return battleLog;
};

export default useFetchBattleLog;
