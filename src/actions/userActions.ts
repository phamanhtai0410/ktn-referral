import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from "@/service/user.service"

export const fetchGetMessage = createAsyncThunk(
    'user/getMessage',
    async (params:any, { dispatch, getState }) => {
        const response = await userService.getMessage(params)
        return response.data
    }
)

export const verifySign = createAsyncThunk(
    'user/verifySign',
    async (params:any, { dispatch, getState }) => {
        const response = await userService.verifySign(params)
        return response.data
    }
)