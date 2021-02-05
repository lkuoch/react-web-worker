import { combineReducers } from "redux";

import {
  name as appName,
  reducer as appReducer,
  initialState as appInitialState,
} from "@Core/App/redux";

export const initialState = {
  [appName]: appInitialState,
};

export const rootReducer = combineReducers({
  [appName]: appReducer,
});
