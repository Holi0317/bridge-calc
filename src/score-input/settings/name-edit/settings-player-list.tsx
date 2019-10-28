import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../../../name-input-list";
import { nameInputListSourceSelector } from "../selectors/name-input-list-source";
import { setNamesFromEntries } from "../actions/set-names";
import { settingsValidator } from "../settings-validator";
import { trans } from "../../../utils";
import { RootState, Dispatch } from "../../../types";

const mapStateToProps = (state: RootState) => ({
  names: nameInputListSourceSelector(state),
  errors: settingsValidator(state).names
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeNames: setNamesFromEntries
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type SettingsPlayerListProps = stateType & dispatchType;

export function SettingsPlayerListImpl({
  names,
  errors,
  changeNames
}: SettingsPlayerListProps) {
  const { t } = useTranslation();

  const values = names.map(([id, value]) => {
    const error = errors[id];

    return {
      value,
      id,
      error: error == null ? null : trans(t, error)
    };
  });

  return <NameInputList values={values} onChange={changeNames} />;
}

export const SettingsPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPlayerListImpl);
