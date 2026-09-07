import { supabase } from "@/lib/supabaseClient";

const deleteBattleLog = async (log_no: number) => {
  return await supabase.rpc("delete_log", {
    t_log_no: log_no,
  });
};

export default deleteBattleLog;
