import { createSelector } from "reselect";
import sumBy from "lodash-es/sumBy";
import mapValues from "lodash-es/mapValues";
import last from "lodash-es/last";
import i18next from "i18next";
import { stageSelector } from "../selectors/stage";
import { playerOrderSelector } from "../selectors/player-order";
import { bidSelector } from "../selectors/bid";
import { winSelector } from "../selectors/win";
import { currentRoundSelector } from "../selectors/current-round";
import { GameStage } from "../game-stage";
import { isOk, removeUndef } from "../../utils";
import { IPlayerMap, IRootState } from "../../types";

export interface IStackInput {
  bid?: IPlayerMap<number>;
  win?: IPlayerMap<number>;
  currentRound: number;
  lastPlayerID: string;
}

export interface IStackInputError {
  bid?: IPlayerMap<string>;
  win?: IPlayerMap<string>;
}

function validateBid(
  opts: IStackInput,
  t: i18next.TFunction
): IPlayerMap<string> | null {
  if (!opts.bid) {
    return null;
  }
  const sum: number = sumBy(Object.entries(opts.bid), ([, value]) => value);
  return sum === opts.currentRound
    ? { [opts.lastPlayerID]: t("Cannot choose that") }
    : null;
}

function validateWin(
  opts: IStackInput,
  t: i18next.TFunction
): IPlayerMap<string> | null {
  if (!opts.win || /* Is empty? */ isOk(opts.win)) {
    return null;
  }
  const sum: number = sumBy(Object.entries(opts.win), ([, value]) => value);
  if (sum === opts.currentRound) {
    return null;
  }
  const msg =
    sum > opts.currentRound ? t("Too many stacks") : t("Too less stacks");
  return mapValues(opts.win, () => msg);
}

/**
 * Validate Stack Input.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> Player ID -> error message will be returned.
 * Use utils.isOk to check if there is any error during validation process.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const stackInputValidator = createSelector(
  stageSelector,
  playerOrderSelector,
  bidSelector,
  winSelector,
  currentRoundSelector,
  (_: IRootState, t: i18next.TFunction) => t,
  (
    stage: GameStage | null,
    playerOrder: string[],
    bid: IPlayerMap<number>,
    win: IPlayerMap<number>,
    currentRound: number,
    t: i18next.TFunction
  ) => {
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
      bid: validateBid(opts, t),
      win: validateWin(opts, t)
    };
    return removeUndef(res);
  }
);

/**
 * Select if current stack input state is valid or not.
 * If true, the current state is valid. False if otherwise.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const isStackInputValid = createSelector(
  stackInputValidator,
  isOk
);

/**
 * Same functionality as stackInputValidator.
 * Except the selected object must contain both bid and win properties.
 * If there is no error, the bid and win properties will be empty object.
 * This aims to suppress undefined error from JS when accessing error.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const stackInputValidatorWithProps = createSelector(
  stackInputValidator,
  (error: IStackInputError) => {
    const bid: IPlayerMap<string> = {};
    const win: IPlayerMap<string> = {};
    return {
      bid,
      win,
      ...error
    };
  }
);
