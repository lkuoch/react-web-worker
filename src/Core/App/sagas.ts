import { all, takeLatest } from "typed-redux-saga/macro";

import { actions } from "./redux";

export function* initAppSaga() {
  console.log("[SAGA]: APP STARTED");
}

export default function* () {
  yield* all([takeLatest(actions.initApp, initAppSaga)]);
}
