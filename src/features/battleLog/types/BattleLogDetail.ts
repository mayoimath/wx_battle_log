import z from "zod";

export const battleLogDetailSchema = z.object({
  lrig: z.string().min(1, "ルリグを選んでください"),
  playFirst: z.string(),
  result: z.string(),
  memo: z.string().nullable(),
});

export type BattleLogDetailView = {
  lrigName: string;
  playFirst: string;
  result: string;
  memo: string;
};

export type BattleLogDetailDB = {
  lrigId: number;
  lrigName: string;
  playFirst: boolean;
  result: number;
  memo: string;
};
