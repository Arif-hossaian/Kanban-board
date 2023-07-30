import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IModel } from '../../types';

const initialState: IModel[] = [];

export const createCustomSlice = (name: string) => {
  const {
    actions: {
      add,
      remove,
      completeStatus,
      reorder,
      update,
      updateHandler,
    },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        prepare: (title: string, description: string) => ({
          payload: {
            id: uuidv4(),
            title,
            description,
            isFinished: false,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
          } as IModel,
        }),
      },
      update(state, action) {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      remove(state, action: PayloadAction<string>) {
        const index = state.findIndex(({ id }) => id === action.payload);
        state.splice(index, 1);
      },
      completeStatus(state, action: PayloadAction<any>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
      updateHandler(
        state,
        action: PayloadAction<{
          id: string;
          title: string;
          description: string;
        }>
      ) {
        const { id, title, description } = action.payload;
        const index = state.findIndex((item) => item.id === id);
        if (index !== -1) {
          state[index].title = title;
          state[index].description = description;
        }
      },
    },
  });

  return {
    actions: {
      add,
      remove,
      completeStatus,
      reorder,
      update,
      updateHandler,
    },
    reducer,
  };
};
