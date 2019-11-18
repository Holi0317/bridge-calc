import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { default as MaterialLink } from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { JokerIcon } from "./joker-icon";
import classes from "./no-prev-game-placeholder.pcss";

const Link = MaterialLink as React.ComponentType<any>;

export function NoPrevGamePlaceholder() {
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <JokerIcon className={classes.jokerIcon} />
      <Typography>{t("You have not played any game yet.")}</Typography>
      <Link component={RouterLink} to="/entry" className={classes.startLink}>
        {t("Click here to start a new game")}
      </Link>
    </div>
  );
}
