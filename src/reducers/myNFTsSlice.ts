import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IMyNFTModel, IMyNFTsArrayModel, IPagination } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchListMyNFTs } from "@/actions/stakingActions";

const initialState:IMyNFTsArrayModel={
    items: [],
    pagination: null,
    loading: false
}

const myNFTsSlice = createSlice({
    name:'myNFTs',
    initialState:initialState,
    reducers:{
        setListCollections(state,action:PayloadAction<IMyNFTModel[]>){
            state.items = action.payload;
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

export const { setListCollections } = myNFTsSlice.actions;
export default myNFTsSlice.reducer;

// create and export the selector
export const selectMyNFTs = (state: RootState) => state.myNFTs;