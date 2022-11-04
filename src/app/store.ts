import { configureStore ,Middleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '@/reducers/rootReducer'

const middlewares: Middleware[] = [];

middlewares.push(thunk)
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false
  }).concat(middlewares)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch