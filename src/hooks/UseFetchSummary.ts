import { supabase } from "@/supabase/supabaseClient";
import type { Summary } from "@/types/Summary";
import { useState, useEffect } from "react";

const useFetchSummary = () => {
  const [summary, setSummary] = useState<Array<Summary>>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("battle_summary").select("*");
      if (!data) return;
      setSummary(
        data.map((d) => ({
          title: d.title ?? "",
          lrig: d.lrig_name ?? "",
          wonCount: d.won_count ?? 0,
          loseCount: d.lose_count ?? 0,
        })),
      );
    })();
  }, []);
  return summary;
};

export default useFetchSummary;
