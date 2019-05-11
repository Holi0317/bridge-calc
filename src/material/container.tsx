import * as React from "react";
import classes from "./container.pcss";

interface IContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: IContainerProps) {
  return <div className={classes.container}>{children}</div>;
}
