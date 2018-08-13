// @flow
// $FlowFixMe
import type {ActionCreator as ReduxActionCreator} from "redux";

// types
export type ActionCreator<T> = ReduxActionCreator<Action<T>, T>;

export type Action<T> = {
  type: string,
  payload: ?T
};

export type NetworkActionCreator<S, T> = {
  submit: ActionCreator<S>,
  resolved: ActionCreator<T>,
  rejected: ActionCreator<any>,
}

// util to create actions to keep it DRY
export function actionCreator<T>(type: string): ActionCreator<T> {
  return payload => {
    return {
      type,
      payload
    }
  };
}

export function networkActionCreator<S, T>(type: string): NetworkActionCreator<S, T> {
  return {
    submit  : actionCreator(`${type}__SUBMIT`),
    resolved: actionCreator(`${type}__RESOLVED`),
    rejected: actionCreator(`${type}__REJECTED`),
  }
}