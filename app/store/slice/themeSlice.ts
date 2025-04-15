import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeState} from '../types/types';

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDark: action.payload,
      };
    },
  },
});

export const {setIsDarkTheme} = themeSlice.actions;
export default themeSlice.reducer;
