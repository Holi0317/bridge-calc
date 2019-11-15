import { StateType, ActionType } from "typesafe-actions";

declare module "typesafe-actions" {
  interface Types {
    RootAction: ActionType<typeof import("./app/redux-store/actions").default>;
  }
}
