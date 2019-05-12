import * as React from "react";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dropdown } from "../material/dropdown";
import {
  setRoundsAction,
  setStartingRoundAction
} from "./actions/set-entry-props";
import { optionsSourcesSelector } from "./selectors/options-sources";
import { Dispatch, IRootState } from "../types";
import classes from "./entry.pcss";

const mapStateToProps = (state: IRootState) => {
  const { entry } = state;
  return {
    sources: optionsSourcesSelector(state),
    rounds: entry.rounds,
    startingRound: entry.startingRound
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setRounds: setRoundsAction,
      setStartingRound: setStartingRoundAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type EntryOptionsProps = stateType & dispatchType;

export function EntryOptionsImpl({
  sources,
  rounds,
  startingRound,
  setRounds,
  setStartingRound
}: EntryOptionsProps) {
  const { t } = useTranslation();

  return (
    <div className={classes.optionsRootContainer}>
      <Dropdown
        label={t("Number of rounds")}
        className={classes.optionsDropdown}
        value={rounds}
        source={sources.rounds}
        onChange={setRounds}
      />

      <Dropdown
        label={t("Starting round")}
        className={classes.optionsDropdown}
        value={startingRound}
        source={sources.startingRound}
        onChange={setStartingRound}
      />
    </div>
  );
}

export const EntryOptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryOptionsImpl);
