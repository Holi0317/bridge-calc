import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ContentAdd from "@material-ui/icons/Add";
import GetApp from "@material-ui/icons/GetApp";
import styled from "styled-components/macro";
import { addRandomPlayerAction } from "./actions/add-player";
import { setImportOpenAction } from "./actions/set-entry-props";
import { useAction } from "../hooks/use-action";

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function EntryActionButtons() {
  const { t } = useTranslation();

  const addRandomPlayer = useAction(addRandomPlayerAction);
  const setImportOpen = useAction(setImportOpenAction);

  return (
    <BtnContainer>
      <Tooltip title={t("Add player")}>
        <IconButton onClick={addRandomPlayer}>
          <ContentAdd width="28px" height="28px" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t("Import names")}>
        <IconButton onClick={() => setImportOpen(true)}>
          <GetApp width="28px" height="28px" />
        </IconButton>
      </Tooltip>
    </BtnContainer>
  );
}
