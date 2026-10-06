import fetchBattleLog from "../api/fetchBattleLog";
import useSWR from "swr";

const useFetchBattleLog = (logNo?: number) =>
  useSWR(logNo ? `/battle-log/${logNo}` : null, () => fetchBattleLog(logNo!));

export default useFetchBattleLog;
