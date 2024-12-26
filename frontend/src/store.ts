import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/user.ts"
import fieldReducer from "./slices/field.ts"

export const store = configureStore({
    reducer: {
      user: userReducer,
      field: fieldReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch