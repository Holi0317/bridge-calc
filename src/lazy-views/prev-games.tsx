import * as Loadable from "react-loadable";
import { Loading } from "./loading";

const importer = () =>
  import("../prev-games" /* webpackChunkName: "prev-games-view" */).then(
    mod => mod.PrevGames
  );

export const PrevGamesView = Loadable({
  loader: importer,
  loading: Loading
});
