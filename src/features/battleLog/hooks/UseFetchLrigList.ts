import { supabase } from "@/lib/supabaseClient";
import type { OptionItem } from "@/types/OptionItem";
import useSWR from "swr";

const fetcher = async (): Promise<OptionItem[]> => {
  const { data, error } = await supabase.from("m_lrigs").select().order("lrig_name");
  if (error) throw error;

  return data.map((d) => ({
    label: d.lrig_name ?? "",
    value: d.lrig_id.toString(),
  }));
};

const useFetchLrigList = () => {
  const { data, error, isLoading } = useSWR("lrig-list", fetcher);
  return { lrigList: data ?? [], error, isLoading };
};

export default useFetchLrigList;
