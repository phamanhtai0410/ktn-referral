
import { combineReducers } from '@reduxjs/toolkit'

import wallet from "./walletSlice"
import myNFTs from "./myNFTsSlice"
import referral from './referral'
import staking from './staking'
import alert from './alert'

const rootReducer = combineReducers({
    wallet,
    myNFTs,
    referral,
    staking,
    alert,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

