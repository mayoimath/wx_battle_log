export type BattleLogDetail = {
  lrig: string;
  playFirst: string;
  result: string;
};

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
