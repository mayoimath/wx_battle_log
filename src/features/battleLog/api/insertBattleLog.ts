import { supabase } from "@/lib/supabaseClient";
import { type BattleLogInput } from "../types/BattleLog";

const insertBattleLog = async ({ title, lrig, battles }: BattleLogInput) => {
  return await supabase.rpc("insert_log", {
    t_log_row: { lrig_id: Number(lrig), title: title },
    t_detail_rows: battles.map((battle) => ({
      opponent_lrig_id: Number(battle.lrig),
      play_first: battle.playFirst == "1",
      result: Number(battle.result),
      memo: battle.memo,
    })),
  });
};

export default insertBattleLog;
