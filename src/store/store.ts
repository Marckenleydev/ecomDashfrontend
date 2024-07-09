import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../service/UserService";
import { productAPI } from "../service/ProductService";
import logger from "redux-logger";
import { transactionAPI } from "../service/TransactionService";
import { overViewAPI } from "../service/OverviewService";
import { dashboardAPI } from "../service/DashboardService";

// Define the global slice
const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

// Combine reducers
const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [transactionAPI.reducerPath]: transactionAPI.reducer,
  [overViewAPI.reducerPath]: overViewAPI.reducer,
  [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  global: globalSlice.reducer,  // Add the global slice reducer here
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(userAPI.middleware)
        .concat(productAPI.middleware)
        .concat(transactionAPI.middleware)
        .concat(overViewAPI.middleware)
        .concat(dashboardAPI.middleware)
        .concat(logger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
