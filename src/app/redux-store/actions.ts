import * as EntryActions from "../../entry/actions";
import * as ScoreSetActions from "../../score-input/settings/actions";
import * as ToastActions from "../../toast-singleton/actions";
import * as ScoreInputActions from "../../score-input/actions";
import * as PrevGamesActions from "../../prev-games/actions";
import * as ThemeActions from "../../theme/actions";

// Root actions that has migrated to typesafe-actions
export default {
  entry: EntryActions,
  scoreSettings: ScoreSetActions,
  toast: ToastActions,
  scoreInput: ScoreInputActions,
  prevGames: PrevGamesActions,
  theme: ThemeActions
};
