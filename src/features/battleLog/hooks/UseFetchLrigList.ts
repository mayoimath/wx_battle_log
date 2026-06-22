import { supabase } from "@/lib/supabaseClient";
import type { OptionItem } from "@/types/OptionItem";
import { useState, useEffect } from "react";

const useFetchLrigList = () => {
  const [lrigList, setLrigList] = useState<Array<OptionItem> | null>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("m_lrigs").select();
      setLrigList(
        data?.map((x) => ({
          label: x.lrig_name ?? "",
          value: x.lrig_id.toString(),
        })) ?? [],
      );
    })();
  }, []);
  return lrigList;
};

export default useFetchLrigList;
