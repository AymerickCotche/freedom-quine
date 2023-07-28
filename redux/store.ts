import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import quineReducer from './features/quine/quineSlice'

export const store = configureStore({
  reducer: {
    quine: quineReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;