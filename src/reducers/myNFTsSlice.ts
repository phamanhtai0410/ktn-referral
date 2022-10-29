import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IMyNFTModel, IMyNFTsArrayModel, IPagination } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchListMyNFTs } from "@/actions/referralActions";

const initialState:IMyNFTsArrayModel={
    items: [],
    pagination: null,
    loading: false
}

const myNFTsSlice = createSlice({
    name:'myNFTs',
    initialState:initialState,
    reducers:{
        updateNftFlag(state,action){
            const tokenId = action.payload.token_id;
            const newState = state.items.map(obj => {
                if (obj.token_id === tokenId) {
                  return {...obj, is_staking: !obj.is_staking};
                }
                return obj;
              });
              state.items = newState;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListMyNFTs.fulfilled, (state, action) => {
          state.items = action.payload.items
          state.pagination = {page: action.payload.page, page_size: action.payload.page_size, num_of_page: action.payload.num_of_page}
        })
        builder.addCase(fetchListMyNFTs.rejected, (state, action) => {
            state.items = []
        })
    },
})

export const { updateNftFlag } = myNFTsSlice.actions;
export default myNFTsSlice.reducer;

// create and export the selector
export const selectMyNFTs = (state: RootState) => state.myNFTs;