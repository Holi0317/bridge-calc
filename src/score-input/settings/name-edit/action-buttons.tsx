import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { allowNamesCommitSelector } from "../selectors/allow-names-commit";
import { IRootState } from "../../../types";

const mapStateToProps = (state: IRootState, { t }: WithTranslation) => ({
  changeDisabled: !allowNamesCommitSelector(state, t)
});

type stateType = ReturnType<typeof mapStateToProps>;

interface IActionButtonProps {
  requestDialog(): void;
}

export class ActionButtonsImpl extends React.Component {
  public props: IActionButtonProps & stateType & WithTranslation;

  public render() {
    const { changeDisabled, requestDialog, t } = this.props;

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          disabled={changeDisabled}
          onClick={requestDialog}
        >
          {t("Change names")}
        </Button>
      </>
    );
  }
}

export const ActionButtons = flowRight(
  withTranslation(),
  connect(mapStateToProps)
)(ActionButtonsImpl) as React.ComponentType<IActionButtonProps>;
