import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { gameTitleSelector } from "./selectors/game-title";
import { IRootState, ITranslateMixin } from "../types";

const mapStateToProps = (state: IRootState, { t }: ITranslateMixin) => ({
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
  translate(),
  connect(mapStateToProps)
)(CurrentGameTitleImpl);
