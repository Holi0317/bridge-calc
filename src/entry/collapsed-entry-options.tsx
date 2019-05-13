import * as React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import { EntryOptions } from "./entry-options";
import classes from "./entry.pcss";

export function CollapsedEntryOptions() {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className={classes.optionsSection}>
      <Button
        variant="contained"
        onClick={() => setExpanded(!expanded)}
        className={classes.optionsBtn}
      >
        {t("Options")}
      </Button>
      <Collapse in={expanded}>
        <EntryOptions />
      </Collapse>
    </div>
  );
}
