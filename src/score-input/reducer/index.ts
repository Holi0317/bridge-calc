import { GameState } from "./types";

export { currentGameReducer } from "./reducer";
export {
  isGameState,
  isEndedState,
  isWaitingBidState,
  isWaitingWinState
} from "./validator";

export type GameState = GameState;
