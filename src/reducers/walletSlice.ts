import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IWalletModel } from "@/models/redux-models";
import { RootState } from "@/app/store";

const initialState:IWalletModel={
    address: "",
    balance: "0",
    chainId: null,
    easyWeb3: null
}

const walletSlice =createSlice({
    name:'wallet',
    initialState:initialState,
    reducers:{
        setReducerWalletInfo(state,action:PayloadAction<IWalletModel>){
            state.address = action.payload.address;
            state.chainId = action.payload.chainId;
            state.easyWeb3 = action.payload.easyWeb3;
        },
    },
    extraReducers: (builder) => {
     
    },
    
})

export const { setReducerWalletInfo  } = walletSlice.actions;
export default walletSlice.reducer;

// create and export the selector
export const selectWalletAccount = (state: RootState) => state.wallet.address;
export const selectEasyWeb3 = (state: RootState) => state.wallet.easyWeb3;
export const selectChain = (state: RootState) => state.wallet.chainId;