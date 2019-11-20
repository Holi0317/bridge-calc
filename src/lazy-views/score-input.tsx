import React from "react";
import Loadable from "react-loadable";
import { useSelector } from "react-redux";
import { Loading } from "./loading";
import { Redirect } from "react-router";
import { currentGameSelector } from "../score-input/selectors/current-game";

const importer = () =>
  import(
    "../score-input/layout" /* webpackChunkName: "score-input-view" */
  ).then(mod => mod.Layout);

export const Content = Loadable({
  loader: importer,
  loading: Loading
});

export function ScoreInputView() {
  const currentGame = useSelector(currentGameSelector);
  const gameRedirect = currentGame == null;

  return gameRedirect ? <Redirect to="/entry" /> : <Content />;
}
