import { configureStore } from '@reduxjs/toolkit'
import produtoReducer from './slices/produtoSlice'

export const store = configureStore({
  reducer: {
    produto: produtoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
