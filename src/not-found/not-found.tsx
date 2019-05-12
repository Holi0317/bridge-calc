import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AlertError from "@material-ui/icons/Error";
import classes from "./not-found.pcss";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <AlertError className={classes.icon} />
      <div className={classes.text}>{t("Page not found!")}</div>
      <Link className={classes.link} to="/">
        {t("Click here to return to main menu")}
      </Link>
    </div>
  );
}
