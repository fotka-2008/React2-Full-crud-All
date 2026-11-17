import { configureStore } from '@reduxjs/toolkit'
import { todoApi } from '../api/todo'
import categoryReducer from './categorySlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
