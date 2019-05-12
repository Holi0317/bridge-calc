import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { JokerIcon } from "./joker-icon";
import classes from "./no-prev-game-placeholder.pcss";

export function NoPrevGamePlaceholder() {
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <JokerIcon className={classes.jokerIcon} />
      <div>{t("You have not played any game yet.")}</div>
      <Link to="/entry" className={classes.startLink}>
        {t("Click here to start a new game")}
      </Link>
    </div>
  );
}
