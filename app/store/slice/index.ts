import {combineReducers} from '@reduxjs/toolkit';
import {appSlice} from './appSlice';

const reducers = {
  app: appSlice,
};

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
