import z from "zod";
import { battleLogDetailSchema, type BattleLogDetailDB, type BattleLogDetailView } from "./BattleLogDetail";

export const battleLogSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  lrig: z.string().min(1, "ルリグを選んでください。"),
  battles: z.array(battleLogDetailSchema).min(1, "1戦も登録されていません。"),
});

export type BattleLogInput = z.infer<typeof battleLogSchema>;

export type BattleLogView = {
  title: string;
  lrigName: string;
  detail: Array<BattleLogDetailView>;
};

export type BattleLogDB = {
  logNo: number;
  title: string;
  lrigId: number;
  lrigName: string;
  detail: Array<BattleLogDetailDB>;
};
