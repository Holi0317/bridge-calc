import * as React from "react";
import mapValues from "lodash-es/mapValues";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Dropdown } from "../../material/dropdown";
import { GameStage } from "../game-stage";
import { stageSelector } from "../selectors/stage";
import { namesSelector } from "../selectors/names";
import { bidSelector } from "../selectors/bid";
import { winSelector } from "../selectors/win";
import { playerOrderSelector } from "../selectors/player-order";
import { stackInputValidator } from "./stack-input-validator";
import { bidStackInputSourceSelector } from "../selectors/bid-stack-input-source";
import { winStackInputSourceSelector } from "../selectors/win-stack-input-source";
import { setBidAction } from "../actions/set-bid";
import { setWinAction } from "../actions/set-win";
import { trans } from "../../utils";
import { RootState, Dispatch } from "../../types";
import classes from "./stack-input.pcss";

const mapStateToProps = (state: RootState) => ({
  bidDisabled: stageSelector(state) !== GameStage.waitingBid,
  winDisabled: stageSelector(state) !== GameStage.waitingWin,
  playerOrder: playerOrderSelector(state),
  bid: bidSelector(state),
  win: winSelector(state),
  names: namesSelector(state),
  error: stackInputValidator(state),
  bidStackInput: bidStackInputSourceSelector(state),
  winStackInput: winStackInputSourceSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setBid: setBidAction, setWin: setWinAction }, dispatch);

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type StackInputProps = stateType & dispatchType;

export function StackInputImpl({
  bidDisabled,
  winDisabled,
  playerOrder,
  names,
  bid,
  win,
  error,
  bidStackInput,
  winStackInput,
  setBid,
  setWin
}: StackInputProps) {
  const { t } = useTranslation();

  const bidErrors = mapValues(error.bid || {}, val => trans(t, val));
  const winErrors = mapValues(error.win || {}, val => trans(t, val));

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr>
            <th />
            {playerOrder.map(playerID => (
              <th key={playerID}>
                <Typography component="span">{names[playerID]}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.body}>
          <tr>
            <td>
              <Typography component="span">{t("Bid")}</Typography>
            </td>
            {playerOrder.map(playerID => (
              <td key={playerID}>
                <Dropdown
                  value={bid[playerID]}
                  source={bidStackInput[playerID]}
                  label={t("Bid for {{name}}", { name: names[playerID] })}
                  disabled={bidDisabled}
                  error={bidErrors[playerID]}
                  onChange={(value: number) =>
                    setBid({ ...bid, [playerID]: value })
                  }
                />
              </td>
            ))}
          </tr>

          <tr>
            <td>
              <Typography component="span">{t("Win")}</Typography>
            </td>
            {playerOrder.map(playerID => (
              <td key={playerID}>
                <Dropdown
                  value={win[playerID] == null ? "" : win[playerID]}
                  source={winStackInput[playerID]}
                  label={t("Win for {{name}}", { name: names[playerID] })}
                  disabled={winDisabled}
                  error={winErrors[playerID]}
                  onChange={(value: number) =>
                    setWin({ ...win, [playerID]: value })
                  }
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export const StackInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(StackInputImpl);
