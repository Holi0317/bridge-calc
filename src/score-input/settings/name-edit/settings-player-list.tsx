import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../../../name-input-list";
import {
  nameInputListSourceSelector,
  PlayerName
} from "../selectors/name-input-list-source";
import { setNamesFromArrayAction } from "../actions/set-names";
import { settingsValidator } from "../settings-validator";
import { trans2 } from "../../../utils";
import { IRootState, Dispatch } from "../../../types";

/**
 * Get player name from PlayerName type.
 * Used as getter of name-input-list component.
 */
const getter = ([, name]: PlayerName) => name;

/**
 * Set player name for PlayerName type.
 * Used as setter of name-input-list component.
 */
const setter = (newVal: string, [ID]: PlayerName): PlayerName => [ID, newVal];

const mapStateToProps = (state: IRootState) => ({
  names: nameInputListSourceSelector(state),
  errors: settingsValidator(state).names
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeNames: setNamesFromArrayAction
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

  return (
    <NameInputList
      values={names}
      error={errors}
      getter={getter}
      setter={setter}
      errorGetter={(error, [ID]: PlayerName) =>
        error[ID] == null ? null : trans2(t, error[ID])
      }
      onChange={changeNames}
    />
  );
}

export const SettingsPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPlayerListImpl);
