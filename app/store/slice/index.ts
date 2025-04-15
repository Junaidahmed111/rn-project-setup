import {combineReducers} from '@reduxjs/toolkit';
import {appSlice} from './appSlice';
import themeSlice from './themeSlice';
const reducers = {
  app: appSlice,
  theme: themeSlice,
};

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
