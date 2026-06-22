import { ToBattleLogDetail, ToBattleLogDetailDB, type BattleLogDetail, type BattleLogDetailDB } from "./BattleLogDetail";

export type BattleLog = {
  title: string;
  lrig: string;
  battles: Array<BattleLogDetail>;
};

export type BattleLogDB = {
  title: string | null;
  lrig_id: number;
  battle_log_details: Array<BattleLogDetailDB>;
};

export const ToBattleLogDB = ({ title, lrig, battles }: BattleLog): BattleLogDB => ({
  title: title ?? null,
  lrig_id: Number(lrig),
  battle_log_details: battles.map((battle) => ToBattleLogDetailDB(battle)),
});

export const ToBattleLog = ({ title, lrig_id: lrig, battle_log_details: battles }: BattleLogDB): BattleLog => ({
  title: title ?? "",
  lrig: lrig.toString(),
  battles: battles.map((battle) => ToBattleLogDetail(battle)),
});
