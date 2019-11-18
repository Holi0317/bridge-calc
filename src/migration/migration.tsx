import React from "react";
import Loadable from "react-loadable";
import { hasOldData } from "./old-state-manager";
import { useState, useEffect } from "react";

const importer = () =>
  import("./migration-exec" /* webpackChunkName: "migration-exec" */).then(
    mod => mod.MigrationExec
  );

const LoadableDialog = Loadable({
  loader: importer,
  // Just render nothing on loading. This module is not that important
  loading: () => null
});

export function Migration() {
  const [hasOldState, setOldState] = useState(false);
  useEffect(() => {
    if (hasOldData()) {
      setOldState(true);
    }
  }, []);

  return hasOldState ? <LoadableDialog /> : null;
}
