import z from "zod";

export const battleLogDetailSchema = z.object({
  lrig: z.string().min(1, "ルリグを選んでください"),
  playFirst: z.string(),
  result: z.string(),
});

export type BattleLogDetail = z.infer<typeof battleLogDetailSchema>;

export type BattleLogDetailDB = {
  opponent_lrig_id: number;
  play_first: boolean | null;
  result: number | null;
};

export const ToBattleLogDetailDB = ({ lrig, playFirst, result }: BattleLogDetail): BattleLogDetailDB => ({
  opponent_lrig_id: Number(lrig),
  play_first: playFirst == "1",
  result: Number(result),
});

export const ToBattleLogDetail = ({ opponent_lrig_id: opponentLrigId, play_first: playFirst, result }: BattleLogDetailDB): BattleLogDetail => ({
  lrig: opponentLrigId.toString(),
  playFirst: (playFirst ?? false) ? "1" : "0",
  result: (result ?? 0).toString(),
});
