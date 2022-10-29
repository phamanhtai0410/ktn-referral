import { createAsyncThunk } from '@reduxjs/toolkit'
import { referralService } from "@/service/referral.service"
import { userService } from '@/service/user.service'
import { RootState } from '@/store'
import { randomKeyUUID } from '@/_helpers/utils/lib'
import { setAlert } from '@/reducers/alert'
import ABI_STAKING from '@/_contract/ABI_STAKING_V3.json';
import ABI_NFT from '@/_contract/ABI_NFT_V7.json';
import { ethers } from 'ethers'

const ADDRESS_STAKING: string = import.meta.env.VITE_ADDRESS_STAKING.toString() || '';
const ADDRESS_NFT: string = import.meta.env.VITE_ADDRESS_NFT.toString() || '';

export const fetchReferralCode = createAsyncThunk(
    'referral/fetchReferralCode',
    async (params:{address:string}, { dispatch, getState }) => {
        const response = await referralService.getReferralCode(params)
        return response.data
    }
)

export const fetchUserRank = createAsyncThunk(
    'referral/fetchUserRank',
    async (params:any, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchExchangeInfo = createAsyncThunk(
    'referral/exchange',
    async (params:any, { dispatch, getState }) => {
        
        const response = await referralService.getExchangeInfo(params)
        if (response?.data?.nonce && response?.data?.msg) {
            const rootState = getState() as RootState;
            const { easyWeb3, address} = rootState.wallet;
            const signature = await userService.web3PersonalSign(response.data.msg, address);
            return exchange(response.data, signature, address, params.amount, params.event)
        }
        // return response.data
    }
)

const exchange = async (data, signature, address, amount, event) => {
    let params = {
        nonce: data.nonce,
        signature: signature,
        address: address,
        amount: amount,
        event: event
    }
    const response = await referralService.exchange(params)
    return response.data;
}

export const fetchListMyNFTs = createAsyncThunk(
    'referral/myNfts',
    async (params:any, { dispatch, getState }) => {
        const response = await referralService.getListMyNFTs(params)
        return response.data
    }
)

export const unStakeAll = createAsyncThunk(
    'referral/unStakeAll',
    async (_, { dispatch, getState ,rejectWithValue}) => {

        const rootState = getState() as RootState;
        const  { easyWeb3, address} = rootState.wallet;

        const signer = easyWeb3.getSigner();

        try {

            if(signer && ADDRESS_NFT ){
                const contractStaking = new ethers.Contract(
                    ADDRESS_STAKING,
                    ABI_STAKING,
                    signer,
                )
                let nftsTxn = await contractStaking.unstakeAll(
                    ADDRESS_NFT
                );
                
                console.log("Unstaking all ... please wait");
                await nftsTxn.wait();
                if (nftsTxn?.hash) {
                    dispatch(
                        setAlert({
                          type: 'success',
                          key: randomKeyUUID(),
                          message: {
                            status: 'success',
                            title: 'Unstaked all successfully!',
                          },
                        }),
                      )
                }
                console.log(`Unstaked all, see transaction: https://rinkeby.etherscan.io/tx/${nftsTxn.hash}`);

            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
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