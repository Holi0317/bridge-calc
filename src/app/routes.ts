import React from "react";
import { RouteProps } from "react-router";
import {
  MenuView,
  EntryView,
  ScoreInputView,
  PrevGamesView,
  GlobalSettingsView,
  NotFoundView
} from "../lazy-views";
import { GameTitle } from "../score-input/title";
import { titleAugment } from "../utils";

export interface Route extends RouteProps {
  title: React.ComponentType<any>;
  name: string;
  path?: string;
}

export const routes: Route[] = [
  {
    path: "/",
    name: "root",
    component: MenuView,
    exact: true,
    title: titleAugment("Bridge calculator")
  },
  {
    path: "/entry",
    name: "entry",
    component: EntryView,
    title: titleAugment("Entry")
  },
  {
    path: "/score-input",
    name: "score-input",
    component: ScoreInputView,
    title: GameTitle
  },
  {
    path: "/prev-games",
    name: "prev-games",
    component: PrevGamesView,
    title: titleAugment("Previous games")
  },
  {
    path: "/global-settings",
    name: "global-settings",
    component: GlobalSettingsView,
    title: titleAugment("Global settings")
  },
  {
    name: "not-found",
    title: titleAugment("Not found"),
    component: NotFoundView
  }
];
