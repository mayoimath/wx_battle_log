import { supabase } from "@/supabase/supabaseClient";
import type { BattleLog } from "@/types/BattleLog";
import { useState, useEffect } from "react";

const useFetchBattleLog = (logNo: number) => {
  const [battleLog, setBattleLog] = useState<BattleLog>();
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("battle_logs").select(`*,battle_log_details (*) `).eq("log_no", logNo).single();
      setBattleLog({
        title: data?.title ?? "",
        lrig: data?.lrig_id?.toString() ?? "",
        battles: data?.battle_log_details.map((battle) => ({
          lrig: battle.opponent_lrig_id.toString(),
          isFirst: battle.play_first ?? false,
          won: battle.result == 1,
        })),
      });
    })();
  }, []);
  return battleLog;
};

export default useFetchBattleLog;
