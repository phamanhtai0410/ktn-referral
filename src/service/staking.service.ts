
import axiosClient from "./axiosClient"

import { LEADER_BOARD_LIST_ITEMS ,GET_LIST_MY_NFTS, TOTAL_STAKED, EXCHANGE_INFO } from "./endpoint"

export const stakingService = {

  getTotalStaked: (params) => {
    return axiosClient.get(TOTAL_STAKED, { params })
  },

  getListLeaderBoard: (params) => {
    return axiosClient.get(LEADER_BOARD_LIST_ITEMS, { params })
  },

  getListMyNFTs: (params) => {
    return axiosClient.get(GET_LIST_MY_NFTS, { params })
  },

  getExchangeInfo: (params) => {
    return axiosClient.get(EXCHANGE_INFO, { params })
  },

  exchange: (params) => {
    return axiosClient.post(EXCHANGE_INFO, params)
  },

}





