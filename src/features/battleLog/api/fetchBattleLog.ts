import { supabase } from "@/lib/supabaseClient";
// import type { QueryData } from "@supabase/supabase-js";
import type { BattleLogDB } from "../types/BattleLog";

// const query = (logNo: number) =>
//   supabase
//     .from("battle_logs")
//     .select(
//       `*,
//       battle_log_details (
//         opponent_lrig_id,
//         m_lrigs (lrig_name) ,
//         play_first,
//         result,
//         memo
//       ) ,
//       m_lrigs (lrig_name) `,
//     )
//     .eq("log_no", logNo)
//     .single();

// type QueryResult = QueryData<ReturnType<typeof query>>;

// const toBattleLog = (result: QueryResult): BattleLogDB => ({
//   logNo: result.log_no,
//   title: result.title ?? "",
//   lrigId: result.lrig_id,
//   lrigName: result.m_lrigs.lrig_name ?? "",
//   detail: result.battle_log_details.map((detail) => ({
//     lrigId: detail.opponent_lrig_id,
//     lrigName: detail.m_lrigs.lrig_name ?? "",
//     playFirst: detail.play_first ?? false,
//     result: detail.result ?? 0,
//     memo: detail.memo ?? "",
//   })),
// });

const fetchBattleLog = async (logNo: number): Promise<BattleLogDB> => {
  // const { data } = await query(logNo);
  // return data ? toBattleLog(data) : undefined;
  const { data, error } = await supabase
    .from("battle_logs")
    .select(
      `*,
      battle_log_details (
        opponent_lrig_id,
        m_lrigs (lrig_name) ,
        play_first,
        result,
        memo
      ) ,
      m_lrigs (lrig_name) `,
    )
    .eq("log_no", logNo)
    .single();

  if (error) throw error;

  return {
    logNo: data.log_no,
    title: data.title ?? "",
    lrigId: data.lrig_id,
    lrigName: data.m_lrigs.lrig_name ?? "",
    detail: data.battle_log_details.map((detail) => ({
      lrigId: detail.opponent_lrig_id,
      lrigName: detail.m_lrigs.lrig_name ?? "",
      playFirst: detail.play_first ?? false,
      result: detail.result ?? 0,
      memo: detail.memo ?? "",
    })),
  };
};

export default fetchBattleLog;
