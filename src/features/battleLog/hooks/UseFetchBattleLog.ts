import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { ToBattleLog, type BattleLog } from "../types/BattleLog";

const useFetchBattleLog = (logNo: number) => {
  const [battleLog, setBattleLog] = useState<BattleLog>();
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("battle_logs")
        .select(`*,battle_log_details (opponent_lrig_id,play_first,result) `)
        .eq("log_no", logNo)
        .single();
      if (!data) return;
      setBattleLog(ToBattleLog({ ...data }));
    })();
  }, []);
  return battleLog;
};

export default useFetchBattleLog;
