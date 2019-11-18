import { ActionType } from "typesafe-actions";

declare global {
  type RootActions = ActionType<
    typeof import("./app/redux-store/actions").default
  >;
}

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootActions;
  }
}
