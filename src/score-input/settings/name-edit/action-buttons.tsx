import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import Button from "@material-ui/core/Button";
import { allowNamesCommitSelector } from "../selectors/allow-names-commit";
import { IRootState, ITranslateMixin } from "../../../types";

const mapStateToProps = (state: IRootState, { t }: ITranslateMixin) => ({
  changeDisabled: !allowNamesCommitSelector(state, t)
});

type stateType = ReturnType<typeof mapStateToProps>;

interface IActionButtonProps {
  requestDialog(): void;
}

export class ActionButtonsImpl extends React.Component {
  public props: IActionButtonProps & stateType & ITranslateMixin;

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
  translate(),
  connect(mapStateToProps)
)(ActionButtonsImpl) as React.ComponentType<IActionButtonProps>;
