import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '@/reducers/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk,logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch