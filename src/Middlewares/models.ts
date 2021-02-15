import { Action } from "redux";

export const CALL_GQL_MIDDLEWARE_TYPE = "@GQLA";

export interface ICallGQLAction extends Action {
  type: string;
  payload: ICallGqlPayload;
}

export interface ICallGqlPayload {
  types: [string, string, string];
  retryCount?: number;

  endpoint: string;
  query: string;
  variables?: object;
}

export function createGQLAction(input: ICallGqlPayload): ICallGQLAction {
  return {
    type: CALL_GQL_MIDDLEWARE_TYPE,
    payload: input,
  };
}

interface IApiResult {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export const ApiResult = (name: String, id?: String): IApiResult => ({
  REQUEST: `@REQUEST/${name}${id != null ? "/" + id : ""}`,
  SUCCESS: `@SUCCESS/${name}${id != null ? "/" + id : ""}`,
  FAILURE: `@FAILURE/${name}${id != null ? "/" + id : ""}`,
});
