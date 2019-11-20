import React from "react";
import { useLocation } from "react-router";
import { ToastSingleton } from "../toast-singleton";
import { SWReg } from "../sw-reg";
import { Migration } from "../migration";
import { Routes } from "./routes";
import { Navbar } from "./navbar";
import { CssBaseline } from "@material-ui/core";

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
    </div>
  );
}
