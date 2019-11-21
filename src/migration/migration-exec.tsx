import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { replaceCurrentGameAction } from "../score-input/actions/replace-current-game";
import {
  hasOldData,
  retrieveOldData,
  deleteOldData,
  isNotStarted
} from "./old-state-manager";
import { migrateOldState } from "./converter";
import { useAction } from "../hooks/use-action";

/**
 * React hook that create migrate function for attempting migration
 */
function useMigrate() {
  const { t } = useTranslation();
  const replaceCurrentGame = useAction(replaceCurrentGameAction);
  const showToast = useAction(showToastAction);

  return () => {
    try {
      const oldState = retrieveOldData();
      if (oldState == null) {
        // False positive on checking
        return;
      }

      if (isNotStarted(oldState)) {
        // Not started data
        deleteOldData();
        return;
      }

      const state = migrateOldState(oldState);

      replaceCurrentGame(state);
      showToast(t("Migrated game data from old version"));
    } catch (e) {
      console.error("Error when migrating old data", e);
      deleteOldData();
    }
  };
}

export function MigrationExec() {
  const tryMigrate = useMigrate();

  useEffect(() => {
    setTimeout(() => {
      if (hasOldData()) {
        tryMigrate();
      }
    }, 500);
  });

  return null;
}
