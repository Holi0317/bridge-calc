import { GameStage } from "../game-stage";
import { PlayerMap } from "../../types";

/**
 * States that must have regardless of current stage.
 * (Except the stage property)
 */
interface BaseGameState {
  /** Unique identifier for the game */
  id: string;
  /** Number of rounds for this game */
  rounds: number;
  /** The time that game has started, in unix timestamp */
  startTime: number;

  /** Player name map */
  names: PlayerMap<string>;
  /** Player score map */
  scores: PlayerMap<number[]>;
}

export interface WaitingBidState extends BaseGameState {
  stage: typeof GameStage.waitingBid;
  /** Current bid */
  bid: PlayerMap<number>;
  /** Order of players for current round */
  currentPlayerOrder: string[];
  /** Current round */
  currentRound: number;
}

export interface WaitingWinState extends BaseGameState {
  stage: typeof GameStage.waitingWin;
  /** Current bid */
  bid: PlayerMap<number>;
  /** Order of players for current round */
  currentPlayerOrder: string[];
  /** Current round */
  currentRound: number;
  /** Current win */
  win: PlayerMap<number>;
}

export interface EndedState extends BaseGameState {
  stage: typeof GameStage.ended;
  /** Time for the game to end, in unix timestamp */
  endTime: number;
}

export type GameState = null | WaitingBidState | WaitingWinState | EndedState;
