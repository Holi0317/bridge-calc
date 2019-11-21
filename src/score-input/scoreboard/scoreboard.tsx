import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../../material/container";
import { ScoreboardTable } from "./scoreboard-table";
import { currentGameSelector } from "../selectors/current-game";

const ScoreboardContainer = styled.div`
  margin-top: 1em;
`;

export function Scoreboard() {
  const entry = useSelector(currentGameSelector);

  return (
    <Container>
      {entry && (
        <ScoreboardContainer>
          <ScoreboardTable entry={entry} mini={false} />
        </ScoreboardContainer>
      )}
    </Container>
  );
}
