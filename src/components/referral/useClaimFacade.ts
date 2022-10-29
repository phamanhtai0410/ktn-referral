import { fetchReferralCode, fetchUserRank } from '@/actions/referralActions'
import { useAppDispatch } from '@/app/hooks'
import { setAlert } from '@/reducers/alert'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import { selectClaim, selectIsOpenModalClaim, selectIsPending, selectReferralCode, selectUserRank } from '@/reducers/referral'
import { selectWalletAccount } from '@/reducers/walletSlice'
import { randomKeyUUID } from '@/_helpers/utils/lib'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";

const REACT_APP_WSS_URL: string = import.meta.env.VITE_SOCKET_URL.toString() || ''

const useClaimFacade = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const isOpen = useSelector(selectIsOpenModalClaim)
  const userRank = useSelector(selectUserRank)
  const referralInfo = useSelector(selectReferralCode)
  const listMyNFTs = useSelector(selectMyNFTs)
  const isPending = useSelector(selectIsPending)
  const claim = useSelector(selectClaim)
  const [step, setStep] = useState(1)
  const [claimType, setClaimType] = useState('USDT')
  const [isClaiming, setIsClaiming] = useState(false)

  const nextStep = () => {
    if (step === 1) {
      setStep(step + 3)
    } else {
      setStep(step + 1)
    }
  }

  // const checkStaked = () => {
  //   let flag = false
  //   listMyNFTs?.items?.map((item) => {
  //     if (item.is_staking) {
  //       flag = true
  //     }
  //   })
  //   return flag
  // }

  const resetModal = () => {
    setStep(1)
    setClaimType('USDT')
    setIsClaiming(false)
  }

  const listenClaimEvent = () => {
    let socket = io(REACT_APP_WSS_URL, {
        forceNew: true,
        transports: ["websocket"],
        auth: {},
    });
    socket.connect()
    socket.on("connect", () => {
      socket.emit("subscribe", {
          'room_id': walletAccount.toLowerCase()
      }, (response) => {
          console.log("response", response);
      })
  
    });
    socket.on("EXCHANGE", (data) => {
      if (data?.status==="OKE") {
        dispatch(
          setAlert({
            type: 'info',
            key: randomKeyUUID(),
            message: {
              status: 'info',
              title: 'Claimed detail',
              link: `https://testnet.bscscan.com/tx/${data?.tx_hash}`
            },
          }),
        )
        // dispatch(fetchReferralCode({ address: walletAccount }))
        // fetchUserRank({ event: 'top_referral', search: walletAccount }),
        socket.disconnect()
      }
    });
  }

  useEffect(() => {
    if (step === 1 || step === 2) {
    }
    if (step === 3) {
      // setIsClaiming(true)
      // dispatch(unStakeAll())
      // setIsClaiming(false)
    }
    if (step === 4) {
    }
    if (step === 5) {
      // closeModal();
    }
  }, [step])

  useEffect(() => {
    setIsClaiming(isPending)
    if (step===3 && !isPending) {
      nextStep()
    }
  }, [isPending])
  
  useEffect(() => {
    if (!claim?.isPending && claim?.status==="PENDING") {
      dispatch(
        setAlert({
          type: 'success',
          key: randomKeyUUID(),
          message: {
            status: 'success',
            title: 'Claimed successfully!',
          },
        }),
      )
      dispatch(fetchReferralCode({ address: walletAccount }))
      dispatch(fetchUserRank({ event: 'top_referral', search: walletAccount }))
      listenClaimEvent();
    }
  }, [claim])

  return {
    isOpen,
    step,
    claimType,
    isClaiming,
    userRank,
    referralInfo,
    setClaimType,
    resetModal,
    nextStep,
    setStep,
  }
}

export default useClaimFacade
