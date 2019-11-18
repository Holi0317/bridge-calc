import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import classes from "./version-display.pcss";

export function VersionDisplay() {
  const { t } = useTranslation();

  // FIXME: version should be version-gitHASH
  const version = `${process.env.REACT_APP_VERSION}-${process.env.REACT_APP_GIT_SHA}`;

  return (
    <div className={classes.text}>
      <Typography variant="caption">
        {t("Version: {{version}}", { version })}
      </Typography>
      <Typography variant="body1">
        <a
          href="https://gitlab.com/holi0317/bridge-calc/tags"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("See Changelog")}
        </a>
      </Typography>
    </div>
  );
}
