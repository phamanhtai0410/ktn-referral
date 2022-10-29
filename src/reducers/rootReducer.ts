
import { combineReducers } from '@reduxjs/toolkit'

import wallet from "./walletSlice"
import referral from './referral'
import alert from './alert'
import myNFTs from './myNFTsSlice'

const rootReducer = combineReducers({
    wallet,
    referral,
    alert,
    myNFTs,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

