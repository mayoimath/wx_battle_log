import { supabase } from "@/lib/supabaseClient";
import { ToBattleLogDB, type BattleLog } from "../types/BattleLog";

const updateBattleLog = async (logNo: number, battleLog: BattleLog) => {
  const { lrig_id, title, battle_log_details } = ToBattleLogDB(battleLog);
  return await supabase.rpc("update_log", {
    t_log_no: logNo,
    t_log_row: { lrig_id, title },
    t_detail_rows: battle_log_details,
  });
};

export default updateBattleLog;
