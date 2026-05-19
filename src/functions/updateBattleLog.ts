import { supabase } from "@/supabase/supabaseClient";
import type { BattleLog } from "@/types/BattleLog";

const updateBattleLog = async (logNo: number, { lrig, title, battles }: BattleLog) =>
  await supabase.rpc("update_log", {
    t_log_no: logNo,
    t_log_row: { lrig_id: Number(lrig), title },
    t_detail_rows: battles!.map((battle) => ({
      opponent_lrig_id: Number(battle.lrig),
      play_first: battle.isFirst,
      result: battle.won ? 1 : 0,
    })),
  });

export default updateBattleLog;
