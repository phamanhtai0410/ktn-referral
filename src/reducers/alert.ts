// import { alertConstants } from "../constants";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
const autoClose = 3000;

// export function alert(state = {}, action) {
//   switch (action.type) {
//     case alertConstants.LOADING:
//       return {
//         type: "loading",
//         key: action.key,
//         duration: 0,
//         message: action.message,
//       };
//     default:
//       return state;
//   }
// }
const initialState={
  alertData:{
    type: "",
    key: "",
    message: ""
  }
}

const AlertSlice = createSlice({
  name:'alert',
  initialState:initialState,
  reducers:{
      setAlert(state,action){
        state.alertData = {...action.payload, duration: 3000}
      },
  },
  extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      // builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
      //   // Add user to the state array
      //   state.items.push(action.payload.items)
      //     //   state.pagination = {
      //     //     page: action.payload.page,
      //     //     num_of_page: action.payload.num_of_page
      //     //   }
      // })
  },
})

export const { setAlert } = AlertSlice.actions;
export default AlertSlice.reducer;

// create and export the selector
export const selectAlert = (state: RootState) => state.alert.alertData;