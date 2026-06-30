import z from "zod";
import { battleLogDetailSchema, ToBattleLogDetail, ToBattleLogDetailDB, type BattleLogDetailDB } from "./BattleLogDetail";

export const battleLogSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  lrig: z.string().min(1, "ルリグを選んでください。"),
  battles: z.array(battleLogDetailSchema).min(1, "1戦も登録されていません。"),
});

export type BattleLog = z.infer<typeof battleLogSchema>;

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
