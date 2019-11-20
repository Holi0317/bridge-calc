import React from "react";
import { useLocation } from "react-router";
import { CssBaseline } from "@material-ui/core";
import { ToastSingleton } from "../toast-singleton";
import { SWReg } from "../sw-reg";
import { Migration } from "../migration";
import { Routes } from "./routes";
import { Navbar } from "./navbar";
import { GlobalStyle } from "./global-style";

export function Shell() {
  const location = useLocation();

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
      <GlobalStyle />
    </div>
  );
}
