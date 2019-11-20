import React from "react";
import { mapValues } from "lodash-es";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
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
import { useAction } from "../../hooks/use-action";
import { Typography } from "@material-ui/core";

const TableContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledTable = styled.table`
  table-layout: fixed;
  white-space: nowrap;

  tr {
    height: 3.5em;
  }
`;

const StyledTHead = styled.thead`
  th {
    text-align: left;
    width: 300px;
    min-width: 100px;
    display: table-cell;
    font-weight: bold;
    font-size: 16px;
  }
`;

const StyledTBody = styled.tbody`
  td {
    width: 300px;
    min-width: 100px;

    /* Caption styling */
    &:first-of-type {
      padding-right: 0.5em;
      display: table-cell;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export function StackInput() {
  const { t } = useTranslation();

  const stage = useSelector(stageSelector);
  const bidDisabled = stage !== GameStage.waitingBid;
  const winDisabled = stage !== GameStage.waitingWin;
  const playerOrder = useSelector(playerOrderSelector);
  const bid = useSelector(bidSelector);
  const win = useSelector(winSelector);
  const names = useSelector(namesSelector);
  const error = useSelector(stackInputValidator);
  const bidStackInput = useSelector(bidStackInputSourceSelector);
  const winStackInput = useSelector(winStackInputSourceSelector);

  const setBid = useAction(setBidAction);
  const setWin = useAction(setWinAction);

  const bidErrors = mapValues(error.bid || {}, val => trans(t, val));
  const winErrors = mapValues(error.win || {}, val => trans(t, val));

  return (
    <TableContainer>
      <StyledTable>
        <StyledTHead>
          <tr>
            <th />
            {playerOrder.map(playerID => (
              <th key={playerID}>
                <Typography component="span">{names[playerID]}</Typography>
              </th>
            ))}
          </tr>
        </StyledTHead>
        <StyledTBody>
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
        </StyledTBody>
      </StyledTable>
    </TableContainer>
  );
}
