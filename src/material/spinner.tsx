import * as React from "react";
import classes from "./spinner.pcss";

export function Spinner() {
  return (
    <div className={classes.spinner}>
      <svg className={classes.circular} viewBox="25 25 50 50">
        <circle
          className={classes.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}
