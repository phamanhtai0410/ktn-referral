
import { combineReducers } from '@reduxjs/toolkit'

import wallet from "./walletSlice"
import referral from './referral'
import alert from './alert'

const rootReducer = combineReducers({
    wallet,
    referral,
    alert,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

