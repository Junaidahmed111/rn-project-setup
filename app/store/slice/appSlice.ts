import {createSlice} from '@reduxjs/toolkit';
import {AppState} from '../types/types';

const initialState: AppState = {
  currentRouteName: '',
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    saveCurrentRouteName: (state, action) => {
      return {
        ...state,
        currentRouteName: action.payload,
      };
    },
  },
});

export const {saveCurrentRouteName} = appSlice.actions;
export default appSlice.reducer;
