import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ILeaderBoardModel, ILeaderBoardArrayModel } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchReferralCode, fetchListLeaderBoard, fetchExchangeInfo, fetchUserRank } from "@/actions/referralActions";
import { IReferralCode } from "@/models/referral-models";

const initialState={
    referralCode:<IReferralCode>{},
    leaderBoard:<ILeaderBoardArrayModel>{},
    leaderBoardTop3:<ILeaderBoardArrayModel>{},
    isOpenModalClaim: false,
    claim: {
        isPending: false,
        status: "",
    },
    isPending:false,
    userRank: null,
}

const referralSlice = createSlice({
    name:'referral',
    initialState:initialState,
    reducers:{
        openModalClaim(state,action){
            state.isOpenModalClaim = action.payload.isOpen;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReferralCode.fulfilled, (state, action) => {
            state.referralCode = action.payload
        })
        builder.addCase(fetchReferralCode.rejected, (state, action) => {
            state.referralCode = <IReferralCode>{}
        })

        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
          state.leaderBoard= action.payload
          if (action.payload.page===1) {
            state.leaderBoardTop3.items= action.payload.items.slice(0,Math.min(3,action.payload.items.length))
          }
        })

        builder.addCase(fetchUserRank.fulfilled, (state, action) => {
            state.userRank = action.payload.items[0]
        })

         // CLAIM
         builder.addCase(fetchExchangeInfo.pending, (state, action) => {
            state.claim.isPending= true;
        })
        builder.addCase(fetchExchangeInfo.fulfilled, (state, action) => {
            state.claim.isPending= false;
            state.claim.status=action.payload.status;
        })
        builder.addCase(fetchExchangeInfo.rejected, (state, action) => {
            state.claim.isPending= false;
            state.claim.status= "REJECTED";
        })
    },
})

export const { openModalClaim } = referralSlice.actions;
export default referralSlice.reducer;

// create and export the selector
export const selectReferralCode = (state: RootState) => state.referral.referralCode;
export const selectLeaderBoard = (state: RootState) => state.referral.leaderBoard;
export const selectLeaderBoardTop3 = (state: RootState) => state.referral.leaderBoardTop3;
export const selectClaim = (state: RootState) => state.referral.claim;
export const selectIsPending = (state: RootState) => state.referral.isPending;
export const selectUserRank = (state: RootState) => state.referral.userRank;
export const selectIsOpenModalClaim = (state: RootState) => state.referral.isOpenModalClaim;