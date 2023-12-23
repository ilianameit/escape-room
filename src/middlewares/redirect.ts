import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../store/actions';
import { rootReducer } from '../store/root-reducer';
import browserHistory from '../browser-history';


type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (typeof action.type === redirectToRoute.toString()) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
