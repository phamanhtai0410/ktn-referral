import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { Registry } from './helper/event-bus'
import {
  ConnectState,
  IWeb3Event,
  Web3Callback,
  DEFAULT_WALLET_INFO,
  EasyWeb3,
} from './'
import { setReducerWalletInfo } from '@/reducers/walletSlice'

export const useEasyWeb3 = (cb?: Web3Callback) => {
  const [connectState, setConnectState] = useState(ConnectState.Disconnected)
  const [walletInfo, setWalletInfo] = useState(DEFAULT_WALLET_INFO)

  const dispatch = useAppDispatch();
  const easyWeb3 = EasyWeb3.getInstance()
  let registry: Registry
  const web3Callback: Web3Callback = (e: IWeb3Event) => {
    setConnectState(easyWeb3.getConnectState())
    setWalletInfo({ ...easyWeb3.getWalletInfo()})
    cb && cb(e)
  }
  useEffect(() => {
   // console.log("---useEffect---useEasyWeb3");
    registry = easyWeb3.registerEvent(web3Callback)
    easyWeb3.connectWalletIfCached()
    return () => {
      easyWeb3.unregisterEvent(registry)
    }
  }, [])

  useEffect(() => {
    
    // console.log("connectState",connectState);
    if(ConnectState.Connected === connectState){
      dispatch(setReducerWalletInfo({ 
        ...easyWeb3.getWalletInfo(),
        ...{
          easyWeb3
      }}))
    }
    if(ConnectState.Disconnected === connectState){
      // console.log("DEFAULT_WALLET_INFO",DEFAULT_WALLET_INFO);
      dispatch(setReducerWalletInfo({ 
        ...DEFAULT_WALLET_INFO,
        ...{
          easyWeb3:null,
          address:null,
          chainId:null,
          balance:"0"
      }}))
    }
  }, [connectState])

  return { easyWeb3, connectState, walletInfo }
  
}
