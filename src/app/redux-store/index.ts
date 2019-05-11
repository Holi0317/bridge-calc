import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { rootReducer } from "./root-reducer";
import { devEnhancer, prodEnchancer } from "./enhancer";

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "production" ? prodEnchancer() : devEnhancer()
);
export const persistor = persistStore(store);
