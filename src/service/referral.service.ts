
import axiosClient from "./axiosClient"

import { LEADER_BOARD_LIST_ITEMS, GET_REFERRAL_CODE, VALIDATE_REFERRAL_CODE, SUBMIT_REFERRAL_CODE, EXCHANGE_INFO, GET_LIST_MY_NFTS } from "./endpoint"

export const referralService = {

  validateReferralCode: (params) => {
    return axiosClient.get(VALIDATE_REFERRAL_CODE, { params })
  },

  submitReferralCode: async(params) => {
    return axiosClient.post(SUBMIT_REFERRAL_CODE,  params )
  },

  getReferralCode: (params) => {
    return axiosClient.get(GET_REFERRAL_CODE, { params })
  },

  getListLeaderBoard: (params) => {
    return axiosClient.get(LEADER_BOARD_LIST_ITEMS, { params })
  },

  getExchangeInfo: (params) => {
    return axiosClient.get(EXCHANGE_INFO, { params })
  },

  exchange: (params) => {
    return axiosClient.post(EXCHANGE_INFO, params)
  },

  getListMyNFTs: (params) => {
    return axiosClient.get(GET_LIST_MY_NFTS, { params })
  },

}