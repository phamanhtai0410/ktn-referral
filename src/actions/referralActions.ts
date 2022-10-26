import { createAsyncThunk } from '@reduxjs/toolkit'
import { referralService } from "@/service/referral.service"
import { userService } from '@/service/user.service'

export const fetchReferralCode = createAsyncThunk(
    'referral/fetchReferralCode',
    async (params:{address:string}, { dispatch, getState }) => {
        const response = await referralService.getReferralCode(params)
        return response.data
    }
)

export const submitReferralCode = createAsyncThunk(
    'referral/submitReferralCode',
    async (params:{address:string, code:string}, { dispatch, getState }) => {
        const response = await referralService.validateReferralCode(params)
        if (response?.data && response?.data?.nonce && response?.data?.msg) {
            const signature = await userService.web3PersonalSign(response.data.msg, params.address)
            console.log("signature", signature)
            let body = {address:params.address,code:params.code,nonce:response.data.nonce,signature:signature}
            if (signature) {
                try {
                    const result = await referralService.submitReferralCode(body)
                    alert("Successfully!")
                } catch (error) {
                    alert("Errors: "+error.msg)
                }
            }
        }
        // return response.data
    }
)

export const fetchListLeaderBoard = createAsyncThunk(
    'referral/fetchLeaderBoard',
    async (params:any, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)