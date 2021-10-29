import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import { ActionType } from '../../types/action';

type ReducerType = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, ReducerType> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

