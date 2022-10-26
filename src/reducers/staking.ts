import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { approveStaking, fetchListLeaderBoard, fetchTotalStaked, fetchUserRank, stakeNFT, unStakeNFT, unStakeAll, fetchExchangeInfo } from "@/actions/stakingActions";
import { ILeaderBoardArrayModel } from "@/models/redux-models";

const initialState={
    isPending:false,
    userRank: null,
    totalStaked:0,
    leaderBoard:<ILeaderBoardArrayModel>{},
    leaderBoardTop3:<ILeaderBoardArrayModel>{},
    isOpenModalClaim: false,
    claim: {
        isPending: false,
        status: "",
    },
}

const stakingSlice = createSlice({
    name:'staking',
    initialState:initialState,
    reducers:{
        openModalClaim(state,action){
            state.isOpenModalClaim = action.payload.isOpen;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRank.fulfilled, (state, action) => {
            state.userRank = action.payload.items[0]
        })
        builder.addCase(fetchTotalStaked.fulfilled, (state, action) => {
            state.totalStaked = action.payload.total
        })
        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
            state.leaderBoard= action.payload
            if (action.payload.page===1) {
                state.leaderBoardTop3.items= action.payload.items.slice(0,Math.min(3,action.payload.items.length))
            }
        })
        
        // APPROVE NFT
        builder.addCase(approveStaking.pending, (state, action) => {
            state.isPending= true;
        })
        builder.addCase(approveStaking.rejected, (state, action) => {
            state.isPending= false;
        })

        // STAKE NFT
        builder.addCase(stakeNFT.fulfilled, (state, action) => {
            state.isPending= false;
        })
        builder.addCase(stakeNFT.rejected, (state, action) => {
            state.isPending= false;
        })

        // UNSTAKE NFT
        builder.addCase(unStakeNFT.pending, (state, action) => {
            state.isPending= true;
        })
        builder.addCase(unStakeNFT.fulfilled, (state, action) => {
            state.isPending= false;
        })
        builder.addCase(unStakeNFT.rejected, (state, action) => {
            state.isPending= false;
        })

        // UNSTAKE ALL
        builder.addCase(unStakeAll.pending, (state, action) => {
            state.isPending= true;
        })
        builder.addCase(unStakeAll.fulfilled, (state, action) => {
            state.isPending= false;
        })
        builder.addCase(unStakeAll.rejected, (state, action) => {
            state.isPending= false;
        })

        // CLAIM
        builder.addCase(fetchExchangeInfo.pending, (state, action) => {
            state.claim.isPending= true;
        })
        builder.addCase(fetchExchangeInfo.fulfilled, (state, action) => {
            state.claim.isPending= false;
            state.claim.status=action.payload.status
        })
        builder.addCase(fetchExchangeInfo.rejected, (state, action) => {
            state.claim.isPending= false;
        })
    },
})

export const { openModalClaim } = stakingSlice.actions;
export default stakingSlice.reducer;

// create and export the selector
export const selectIsPending = (state: RootState) => state.staking.isPending;
export const selectUserRank = (state: RootState) => state.staking.userRank;
export const selectIsOpenModalClaim = (state: RootState) => state.staking.isOpenModalClaim;
export const selectTotalStaked = (state: RootState) => state.staking.totalStaked;
export const selectLeaderBoard = (state: RootState) => state.staking.leaderBoard;
export const selectLeaderBoardTop3 = (state: RootState) => state.staking.leaderBoardTop3;
export const selectClaim = (state: RootState) => state.staking.claim;