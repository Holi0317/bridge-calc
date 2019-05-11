import {
  isPlayerMapOf,
  isArrayOf,
  isArrayEqual,
  whitelistKeys
} from "../../utils";
import { GameStage } from "../game-stage";
import { IPlayerMap } from "../../types";

const BASE_PROPS = ["id", "rounds", "startTime", "names", "scores", "stage"];
const WAITING_BID_PROPS = [
  ...BASE_PROPS,
  "bid",
  "currentPlayerOrder",
  "currentRound"
];
const WAITING_WIN_PROPS = [...WAITING_BID_PROPS, "win"];
const ENDED_PROPS = [...BASE_PROPS, "endTime"];

/**
 * Check for equality of ID in given player maps.
 *
 * @see IPlayerMap
 */
function playerMapIDEqual(a: IPlayerMap<any>, b: IPlayerMap<any>): boolean {
  return isArrayEqual(Object.keys(a), Object.keys(b));
}

/**
 * Validate against the given object. Check if it is GameState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see GameState
 */
export function isGameState(state: any): boolean {
  return (
    state == null ||
    isWaitingBidState(state) ||
    isWaitingWinState(state) ||
    isEndedState(state)
  );
}

/**
 * Check if given object implements IBaseGameState
 * Special case: This validator will not return false for excess fields.
 */
function isBaseGameState(state: any): boolean {
  return (
    state != null &&
    typeof state === "object" &&
    typeof state.id === "string" &&
    typeof state.rounds === "number" &&
    typeof state.startTime === "number" &&
    isPlayerMapOf(state.names, "string") &&
    isPlayerMapOf(state.scores, "number[]") &&
    playerMapIDEqual(state.names, state.scores)
  );
}

/**
 * Validate against the given object. Check if it is IWaitingBidState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IWaitingBidState
 */
export function isWaitingBidState(state: any): boolean {
  return (
    isBaseGameState(state) &&
    whitelistKeys(state, WAITING_BID_PROPS) &&
    state.stage === GameStage.waitingBid &&
    isPlayerMapOf(state.bid, "number") &&
    isArrayOf(state.currentPlayerOrder, "string") &&
    typeof state.currentRound === "number" &&
    playerMapIDEqual(state.names, state.bid)
  );
}

/**
 * Validate against the given object. Check if it is IWaitingWinState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IWaitingWinState
 */
export function isWaitingWinState(state: any): boolean {
  return (
    isBaseGameState(state) &&
    whitelistKeys(state, WAITING_WIN_PROPS) &&
    state.stage === GameStage.waitingWin &&
    isPlayerMapOf(state.bid, "number") &&
    isArrayOf(state.currentPlayerOrder, "string") &&
    typeof state.currentRound === "number" &&
    isPlayerMapOf(state.win, "number") &&
    playerMapIDEqual(state.names, state.bid) &&
    playerMapIDEqual(state.names, state.win)
  );
}

/**
 * Validate against the given object. Check if it is IEndedState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IEndedState
 */
export function isEndedState(state: any): boolean {
  return (
    isBaseGameState(state) &&
    whitelistKeys(state, ENDED_PROPS) &&
    state.stage === GameStage.ended &&
    typeof state.endTime === "number"
  );
}
