import { supabase } from "@/lib/supabaseClient";
import type { Summary } from "@/features/battleLog/types/Summary";
import useSWR from "swr";

const fetcher = async (): Promise<Summary[]> => {
  const { data, error } = await supabase.from("battle_summary").select("*");
  if (error) throw error;

  return data.map((d) => ({
    logNo: d.log_no ?? 0,
    title: d.title ?? "",
    lrig: d.lrig_name ?? "",
    wonCount: d.won_count ?? 0,
    loseCount: d.lose_count ?? 0,
  }));
};

const useFetchSummary = () => {
  const { data, error, isLoading, mutate } = useSWR("battle-summary", fetcher);
  return { summary: data ?? [], error, isLoading, mutate };
};

export default useFetchSummary;
