
import axiosClient from "./axiosClient"

import { GET_MESSAGE ,VERIFY_SIGN } from "./endpoint"

export const userService = {

  getMessage: (queryParams) => {
    return axiosClient.get(GET_MESSAGE, { 
        params: queryParams 
    })
  },

  verifySign: (bodyParams) => {
    return axiosClient.post(VERIFY_SIGN, bodyParams)
  },

  web3PersonalSign: async (message:string, account:string) =>{
    try {
        return await window.ethereum.request({ method: "personal_sign", params: [message,account] 
        })
    } catch (error) {
        console.error(error);
        return false;
    }
  }, 
  
}





