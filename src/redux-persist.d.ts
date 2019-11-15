// TODO Remove this stub typing once redux-persist updates
declare module "redux-persist/es/persistCombineReducers" {
  import { Reducer, ReducersMapObject } from "redux";
  import { PersistConfig, PersistedState } from "redux-persist/es/types";
  /**
   * It provides a way of combining the reducers, replacing redux's @see combineReducers
   * @param config persistence configuration
   * @param reducers set of keyed functions mapping to the application state
   * @returns reducer
   */
  export function persistCombineReducers<S>(
    config: PersistConfig,
    reducers: ReducersMapObject<S, any>
  ): Reducer<S & PersistedState>;
}
