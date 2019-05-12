import * as React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import classes from "./version-display.pcss";

// Variables is injected by webpack
declare const VERSION: string;
declare const HASH: string;

export function VersionDisplay() {
  const { t } = useTranslation();

  return (
    <div className={classes.text}>
      <Typography variant="caption">
        {t("Version: {{version}}", { version: `${VERSION}-${HASH}` })}
      </Typography>
      <Typography variant="body1">
        <a
          href="https://gitlab.com/holi0317/bridge-calc/tags"
          rel="noopener"
          target="_blank"
        >
          {t("See Changelog")}
        </a>
      </Typography>
    </div>
  );
}
