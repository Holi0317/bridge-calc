import { mapValues, sum, range } from "lodash-es";
import { GameState } from "../reducer";
import { PlayerMap } from "../../types";
import { toOrdinal } from "../../utils";
import { GameStage } from "../game-stage";

const TOP_EMOJI = [" 👑", " 🥈", " 🥉"];
const LAST = " 💩";

/**
 * Query emoji for this player.
 * First 3 places emoji will have higher priority than last one.
 * If no emoji available, empty string would be produced
 *
 * @param rank - 1-based rank of this player
 * @param isLast - is player at last position
 */
function getEmoji(rank: number, isLast: boolean): string {
  if (rank <= 3) {
    return TOP_EMOJI[rank - 1];
  }
  if (isLast) {
    return LAST;
  }
  return "";
}

function getRank(scores: PlayerMap<number>): PlayerMap<string> {
  const sortedScores: number[] = Object.values(scores).sort((a, b) => b - a);
  const lastScore = sortedScores[sortedScores.length - 1];
  return mapValues(scores, score => {
    const rank = sortedScores.indexOf(score) + 1;
    return toOrdinal(rank) + getEmoji(rank, score === lastScore);
  });
}

/**
 * Get number of rounds in forms of array that has ended.
 * Like range(endedRounds - 1).
 * For example, if currentRound is 1, then this will return [].
 * If currentRound is 2, then this will return [1].
 * If game has ended at round 13, the this will return [1..13].
 * Null state will return []
 */
function getEndedRounds(entry: NonNullable<GameState>): number[] {
  if (entry.stage === GameStage.ended) {
    return range(1, entry.rounds + 1);
  }
  return range(1, entry.currentRound);
}

export interface ScoreboardData {
  names: PlayerMap<string>;
  scores: PlayerMap<number[]>;
  prevScores: PlayerMap<number>;
  totalScores: PlayerMap<number>;
  ranks: PlayerMap<string>;
  endedRounds: number[];
}

export function computeData(entry: NonNullable<GameState>): ScoreboardData {
  const totalScores = mapValues(entry.scores, sum);
  return {
    names: entry.names,
    scores: entry.scores,
    prevScores: mapValues(entry.scores, score => score[score.length - 1] || 0),
    totalScores,
    ranks: getRank(totalScores),
    endedRounds: getEndedRounds(entry)
  };
}
