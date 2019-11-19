import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "../material/container";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import { NoPrevGamePlaceholder } from "./no-prev-game-placeholder";
import { PrevGame } from "./prev-game";
import { ResetModal } from "./reset-modal";
import { GameModal } from "./game-modal";
import { replaceCurrentGameAction } from "../score-input/actions/replace-current-game";
import { deleteGameAction } from "./actions/delete-game";
import { showGameModalAction } from "./actions/game-modal";
import { havePrevGamesSelector } from "./selectors/have-prev-games";
import { reversedPrevGamesSelector } from "./selectors/reversed-prev-games";
import { RootState } from "../types";
import { useAction } from "../hooks/use-action";

const Root = styled.div`
  margin-top: 1em;
`;

export function PrevGames() {
  const { t } = useTranslation();

  const currentGame = useSelector((state: RootState) => state.currentGame);
  const havePrevGame = useSelector(havePrevGamesSelector);
  const prevGames = useSelector(reversedPrevGamesSelector);

  const del = useAction(deleteGameAction);
  const show = useAction(showGameModalAction);
  const load = useAction(replaceCurrentGameAction);

  if (!havePrevGame) {
    return <NoPrevGamePlaceholder />;
  }

  return (
    <Container>
      <Root>
        <Typography variant="h4" gutterBottom>
          {t("Click on an entry for details")}
        </Typography>
        <List>
          {prevGames.map((prevGame, revIndex) => (
            <PrevGame
              key={`prev-game-${revIndex}`}
              game={prevGame}
              requestDetail={() => {
                show(prevGames.length - revIndex - 1);
              }}
              requestDelete={() => {
                const entry = prevGames[revIndex];
                if (currentGame && currentGame.id === entry.id) {
                  load(null);
                }
                del(prevGames.length - revIndex - 1);
              }}
            />
          ))}
        </List>
      </Root>
      <GameModal />
      <ResetModal />
    </Container>
  );
}
