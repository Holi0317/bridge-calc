import * as React from "react";
import classes from "./container.pcss";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className={classes.container}>{children}</div>;
}
