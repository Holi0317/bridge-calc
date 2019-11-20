import { GameState as GS } from "./types";

export { currentGameReducer } from "./reducer";
export {
  isGameState,
  isEndedState,
  isWaitingBidState,
  isWaitingWinState
} from "./validator";

export type GameState = GS;
