import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import styled from "styled-components/macro";
import { EntryOptions } from "./entry-options";

const OptionsSelection = styled.div`
  margin-top: 1em;
`;

const OptionsBtn = styled(Button)`
  width: 100%;
`;

export function CollapsedEntryOptions() {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();

  return (
    <OptionsSelection>
      <OptionsBtn variant="contained" onClick={() => setExpanded(!expanded)}>
        {t("Options")}
      </OptionsBtn>
      <Collapse in={expanded}>
        <EntryOptions />
      </Collapse>
    </OptionsSelection>
  );
}
