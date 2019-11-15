import * as EntryActions from "../../entry/actions";
import * as ScoreSetActions from "../../score-input/settings/actions";

// Root actions that has migrated to typesafe-actions
export default {
  entry: EntryActions,
  scoreSettings: ScoreSetActions
};
