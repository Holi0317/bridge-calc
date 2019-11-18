import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../name-input-list";
import { entryOptionsValidator } from "./entry-validator";
import { setPlayerNamesAction } from "./actions/set-entry-props";
import { Dispatch, RootState } from "../types";
import { trans } from "../utils";

const mapStateToProps = (state: RootState) => ({
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

  const values = playerNames.map((name, index) => {
    const error = playerNamesError == null ? null : playerNamesError[index];

    return {
      value: name.value,
      error: error == null ? "" : trans(t, error),
      id: name.id
    };
  });

  return <NameInputList values={values} onChange={setPlayerNames} />;
}

export const EntryPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPlayerListImpl);
