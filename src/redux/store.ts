import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { taskCompleteSlice } from './slice/completed';
import { inProgressSlice } from './slice/inProgress';
import { todoSlice } from './slice/todo';

export const store = configureStore({
  reducer: combineReducers({
    taskDone: taskCompleteSlice.reducer,
    inProgress: inProgressSlice.reducer,
    todo: todoSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
