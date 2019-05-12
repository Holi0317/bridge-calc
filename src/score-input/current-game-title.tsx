import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { gameTitleSelector } from "./selectors/game-title";
import { IRootState } from "../types";

const mapStateToProps = (state: IRootState, { t }: WithTranslation) => ({
  title: gameTitleSelector(state, t)
});

export class CurrentGameTitleImpl extends React.Component {
  public props: ReturnType<typeof mapStateToProps>;

  public render() {
    const { title } = this.props;
    return <span>{title}</span>;
  }
}

export const CurrentGameTitle = flowRight(
  withTranslation(),
  connect(mapStateToProps)
)(CurrentGameTitleImpl);
