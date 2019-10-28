import { GameStage } from "../game-stage";
import { skip } from "./skip";
import { bidWinGenerator } from "./bid-win-generator";
import { fillObj } from "../../utils";
import { StartAction } from "../actions/start";
import { WaitingBidState } from "./types";

/**
 * Helper function for reducer.
 * Start a new game base on start action parameters.
 */
export function start(action: StartAction) {
  const playerIDs = Object.keys(action.playerNames);

  const firstState: WaitingBidState = {
    stage: GameStage.waitingBid,
    id: action.id,
    rounds: action.rounds,
    startTime: action.startTime,
    names: action.playerNames,
    scores: fillObj({}, playerIDs, []),
    bid: bidWinGenerator(playerIDs),
    currentPlayerOrder: playerIDs,
    currentRound: 1
  };
  return skip(firstState, action.startingRound - 1, action.startTime);
}
