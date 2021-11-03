import { combineReducers } from '@reduxjs/toolkit';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';

export enum Reducer {
  app = 'APP',
  data = 'DATA',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [Reducer.app]: appProcess,
  [Reducer.data]: appData,
  [Reducer.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
