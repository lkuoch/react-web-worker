import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import polly from "polly-js";

import { CALL_GQL_MIDDLEWARE_TYPE, ICallGqlPayload } from "./models";

export const gqlMiddleware: Middleware<Dispatch> = ({
  dispatch,
}: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (action.type !== CALL_GQL_MIDDLEWARE_TYPE) return next(action);

  // Get body
  const callAPIPayload: ICallGqlPayload = action.payload;

  // Get redux types to return
  const [requestType, successType, failureType] = callAPIPayload.types;

  // Dispatch request type
  dispatch({
    type: requestType,
  });

  // Begin network requests
  return polly()
    .retry(callAPIPayload?.retryCount || 0)
    .executeForPromise(async () => {
      const response = await (
        await fetch(callAPIPayload.endpoint, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            query: callAPIPayload.query,
            variables: callAPIPayload?.variables ?? {},
          }),
        })
      ).json();

      if (response.errors) {
        return dispatch({
          type: failureType,
          error: `Error fetching with response: ${response}`,
        });
      }

      return dispatch({
        type: successType,
        payload: response.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: failureType,
        error: `Error fetching with error: ${err}`,
      });
    });
};
