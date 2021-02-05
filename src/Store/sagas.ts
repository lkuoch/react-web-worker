import { all, spawn, call } from "typed-redux-saga/macro";

import appSagas from "@Core/App/sagas";

// Allow sagas to be restarted in event of failure
export default function* rootSagas() {
  const sagas = [appSagas];

  yield* all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (err) {
            console.log("[ERROR]:", saga, err);
          }
        }
      })
    )
  );
}
