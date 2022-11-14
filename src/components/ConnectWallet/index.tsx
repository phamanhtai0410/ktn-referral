import {
  ConnectState,
  IWeb3Event,
  IMessageInfo,
  useEasyWeb3,
  Web3Callback,
  Web3EventType,
} from '@/service/web3'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { userService } from '@/service/user.service'
import { fetchGetMessage, verifySign } from '@/actions/userActions'
import { useAppDispatch } from '@/app/hooks'
import { LocalStorageService } from '@/_helpers'

const ConnectWallet = () => {

  const { t } = useTranslation()
  const dispatch = useAppDispatch();
  const web3callback: Web3Callback = (e: IWeb3Event) => {
    switch (e.type) {
      case Web3EventType.Provider_Disconnect:
        alert(typeof e.data == 'string' ? e.data : JSON.stringify(e.data))
        break
    }
  }

  const { easyWeb3, connectState, walletInfo } = useEasyWeb3(web3callback)
  
  const onConnect = async () => {
    const messageSign = await easyWeb3.getMessageWallet()
      if(messageSign && messageSign.signature){
          await dispatch(verifySign(messageSign))
      }
  }


  const onDisconnect = () => {
    easyWeb3.disconnect()
  }

  return (
    <>
      {connectState == ConnectState.Disconnected && (
        <button
        className="home-btn text-white cursor-pointer uppercase bg-transparent font-medium rounded-xl text-base px-5 py-2.5 text-center"
         // className="text-sm bg-primary text-white px-6 py-2 btn rounded-full flex shadow shadow-gray-500/50"
          onClick={onConnect}
        >
          <span className='inline-block'>{t('connect')}</span>
          <span className="hidden sm:inline-block sm:ml-1">{t('wallet')}</span>
        </button>
      )}
      {connectState == ConnectState.Connecting && (
        <CircularProgress color="secondary" size="1.2rem" />
      )}
      {connectState == ConnectState.Connected && (
        <div className="flex items-center home-btn cursor-pointer uppercase bg-transparent font-medium rounded-xl px-5 py-2.5">
          <div className="flex flex-col items-center btn">
            <span className="text-white">
              {easyWeb3.getAddressShort(walletInfo.address)}
            </span>
            {/* <span className="text-sm">
              {easyWeb3.getBalanceShort(walletInfo.balance)}&nbsp;ETH
            </span> */}
          </div>
          <ExitToAppIcon sx={{ color: "#FFF",marginLeft:"10px" }} onClick={onDisconnect} />
        </div>
      )}
    </>
  )
}

export default ConnectWallet
