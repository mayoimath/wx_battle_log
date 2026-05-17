import type { BattleLogDetail } from "./BattleLogDetail";

export type BattleLog = {
  title: string;
  lrig: string;
  battles: Array<BattleLogDetail> | undefined;
};
