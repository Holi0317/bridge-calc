import { createSelector } from "reselect";
import sumBy from "lodash-es/sumBy";
import mapValues from "lodash-es/mapValues";
import last from "lodash-es/last";
import { stageSelector } from "../selectors/stage";
import { playerOrderSelector } from "../selectors/player-order";
import { bidSelector } from "../selectors/bid";
import { winSelector } from "../selectors/win";
import { currentRoundSelector } from "../selectors/current-round";
import { GameStage } from "../game-stage";
import { isOk, ITranslateData, removeUndef, tData } from "../../utils";
import { IPlayerMap } from "../../types";

export interface IStackInput {
  bid?: IPlayerMap<number>;
  win?: IPlayerMap<number>;
  currentRound: number;
  lastPlayerID: string;
}

export interface IStackInputError {
  /**
   * Error in bid for given input from players.
   *
   * If all player's input are valid, this property will be undefined.
   *
   * If the player's input is invalid, then this property will be a `IPlayerMap`
   * that map player ID to error message.
   *
   * If the player's input is valid, the value of the player id will be
   * undefined.
   */
  bid?: IPlayerMap<ITranslateData>;

  /**
   * Error in win for given input from players.
   *
   * @see {IStackInputError.bid} for behaviour in returning error message
   */
  win?: IPlayerMap<ITranslateData>;
}

function validateBid(opts: IStackInput): IPlayerMap<ITranslateData> | null {
  if (!opts.bid) {
    return null;
  }
  const sum: number = sumBy(Object.entries(opts.bid), ([, value]) => value);
  return sum === opts.currentRound
    ? { [opts.lastPlayerID]: tData("Cannot choose that") }
    : null;
}

function validateWin(opts: IStackInput): IPlayerMap<ITranslateData> | null {
  if (!opts.win || /* Is empty? */ isOk(opts.win)) {
    return null;
  }
  const sum: number = sumBy(Object.entries(opts.win), ([, value]) => value);
  if (sum === opts.currentRound) {
    return null;
  }
  const msg =
    sum > opts.currentRound
      ? tData("Too many stacks")
      : tData("Too less stacks");
  return mapValues(opts.win, () => msg);
}

/**
 * Validate Stack Input.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> Player ID -> error message will be returned.
 * Use utils.isOk to check if there is any error during validation process.
 */
export const stackInputValidator = createSelector(
  stageSelector,
  playerOrderSelector,
  bidSelector,
  winSelector,
  currentRoundSelector,
  (
    stage: GameStage | null,
    playerOrder: string[],
    bid: IPlayerMap<number>,
    win: IPlayerMap<number>,
    currentRound: number
  ): IStackInputError => {
    if (!stage || stage === GameStage.ended) {
      return {};
    }
    const lastPlayerID = last(playerOrder);

    const opts = {
      bid,
      win: stage === GameStage.waitingWin ? win : {},
      currentRound,
      lastPlayerID: lastPlayerID || ""
    };
    const res = {
      bid: validateBid(opts),
      win: validateWin(opts)
    };
    return removeUndef(res);
  }
);

/**
 * Select if current stack input state is valid or not.
 * If true, the current state is valid. False if otherwise.
 */
export const isStackInputValid = createSelector(
  stackInputValidator,
  isOk
);
