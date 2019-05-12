import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import { EntryOptions } from "./entry-options";
import classes from "./entry.pcss";

interface ICollapsedEntryOptionsState {
  expanded: boolean;
}

export class CollapsedEntryOptionsImpl extends React.Component<
  WithTranslation,
  ICollapsedEntryOptionsState
> {
  public state = {
    expanded: false
  };

  public render() {
    const { t } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.optionsSection}>
        <Button
          variant="contained"
          onClick={this._toggleOptionOpen}
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

  private _toggleOptionOpen = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };
}

export const CollapsedEntryOptions = withTranslation()(
  CollapsedEntryOptionsImpl
);
