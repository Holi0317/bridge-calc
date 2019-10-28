import * as React from "react";
import * as Loadable from "react-loadable";
import { hasOldData } from "./old-state-manager";

const importer = () =>
  import("./migration-exec" /* webpackChunkName: "migration-exec" */).then(
    mod => mod.MigrationExec
  );

const LoadableDialog = Loadable({
  loader: importer,
  // Just render nothing on loading. This module is not that important
  loading: () => null
});

interface MigrationState {
  hasOldState: boolean;
}

export class Migration extends React.Component {
  public state: MigrationState = {
    hasOldState: false
  };

  public componentDidMount() {
    if (hasOldData()) {
      this.setState(() => ({
        hasOldState: true
      }));
    }
  }

  public render() {
    return this.state.hasOldState ? <LoadableDialog /> : null;
  }
}
