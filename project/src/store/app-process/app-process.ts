import { createReducer } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { toggleIsLoading, toggleIsPosting } from '../action';

const initialStare: AppProcess = {
  isLoading: false,
  isPosting: false,
};

const appProcess = createReducer(initialStare, (builder) => {
  builder
    .addCase(toggleIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(toggleIsPosting, (state, action) => {
      state.isPosting = action.payload;
    });
});

export { appProcess };
