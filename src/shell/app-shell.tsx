import * as React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { ToastSingleton } from "../toast-singleton";
import { SWReg } from "../sw-reg";
import { Migration } from "../migration";
import { Routes } from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Navbar } from "./navbar";

type AppProps = RouteComponentProps<any>;

export function ShellImpl({ location }: AppProps) {
  return (
    <div>
      <Navbar />
      <main>
        <Routes location={location} />
      </main>

      <CssBaseline />
      <Migration />
      <ToastSingleton />
      <SWReg />
    </div>
  );
}

export const Shell = withRouter(ShellImpl);
