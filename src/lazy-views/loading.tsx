import * as React from "react";
import Loadable from "react-loadable";
import { Spinner } from "../material/spinner";
import { Ouch } from "../error-boundary/ouch";
import classes from "./loading.pcss";

export function Loading({ error, pastDelay }: Loadable.LoadingComponentProps) {
  if (error) {
    console.error(error);
    return <Ouch error={new Error("Failed to load route.")} />;
  }
  if (pastDelay) {
    return (
      <div className={classes.container}>
        <Spinner />
      </div>
    );
  }
  return null;
}
