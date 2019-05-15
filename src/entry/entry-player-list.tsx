import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../name-input-list";
import { entryOptionsValidator } from "./entry-validator";
import { setPlayerNamesAction } from "./actions/set-entry-props";
import { Dispatch, IRootState } from "../types";
import { ITranslateData, trans } from "../utils";

// Getters and setters for name input list element
export const getter = (val: string) => val;

export const setter = (newVal: string) => newVal;

const mapStateToProps = (state: IRootState) => ({
  playerNames: state.entry.playerNames,
  playerNamesError: entryOptionsValidator(state).playerNames
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setPlayerNames: setPlayerNamesAction }, dispatch);

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type EntryPlayerListProps = stateType & dispatchType;

export function EntryPlayerListImpl({
  playerNames,
  playerNamesError,
  setPlayerNames
}: EntryPlayerListProps) {
  const { t } = useTranslation();

  const errorGetter = (
    error: Array<ITranslateData | null>,
    _: string,
    index: number
  ) => {
    const item = error[index];
    if (item == null) {
      return "";
    }
    return trans(t, item);
  };

  return (
    <NameInputList
      values={playerNames}
      error={playerNamesError || []}
      onChange={setPlayerNames}
      getter={getter}
      setter={setter}
      errorGetter={errorGetter}
    />
  );
}

export const EntryPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPlayerListImpl);
