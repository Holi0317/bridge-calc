import * as Loadable from "react-loadable";
import { Loading } from "./loading";

const importer = () =>
  import("../not-found" /* webpackChunkName: "not-found-view" */).then(
    mod => mod.NotFound
  );

export const NotFoundView = Loadable({
  loader: importer,
  loading: Loading
});
