import { fetchUserRank, unStakeAll } from '@/actions/stakingActions'
import { useAppDispatch } from '@/app/hooks'
import { setAlert } from '@/reducers/alert'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import { selectClaim, selectIsOpenModalClaim, selectIsPending, selectUserRank } from '@/reducers/staking'
import { selectWalletAccount } from '@/reducers/walletSlice'
import { randomKeyUUID } from '@/_helpers/utils/lib'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";

const REACT_APP_WSS_URL = "https://socket-stag.scanhub.ai";


const useClaimFacade = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const isOpen = useSelector(selectIsOpenModalClaim)
  const userRank = useSelector(selectUserRank)
  const listMyNFTs = useSelector(selectMyNFTs)
  const isPending = useSelector(selectIsPending)
  const claim = useSelector(selectClaim)
  const [step, setStep] = useState(1)
  const [claimType, setClaimType] = useState('USDT')
  const [isClaiming, setIsClaiming] = useState(false)

  const nextStep = () => {
    if (step === 1 && !checkStaked()) {
      setStep(step + 3)
    } else {
      setStep(step + 1)
    }
  }

  const checkStaked = () => {
    let flag = false
    listMyNFTs?.items?.map((item) => {
      if (item.is_staking) {
        flag = true
      }
    })
    return flag
  }

  const resetModal = () => {
    setStep(1)
    setClaimType('USDT')
    setIsClaiming(false)
  }

  const listenClaimEvent = () => {
    // let message = {
    //   room_id: walletAccount
    // }
    // const socket = io("https://socket-stag.scanhub.ai");

    const host = 'http://54.255.240.19:8443'
    let socket = io(host, {
        forceNew: true,
        transports: ["websocket"],
        auth: {},
        // path: "/"
    });
    console.log("toLowerCase", '0x6094b4Fa111CBD26Db9B5F901eaCA497a99Ee7ce'.toLowerCase());
    socket.on("connect", () => {
      console.log('connected', socket.id);
      socket.emit("subscribe", {
          'room_id': '0x6094b4Fa111CBD26Db9B5F901eaCA497a99Ee7ce'.toLowerCase()
      }, (response) => {
          console.log(response); // ok
      })
  
    });
    socket.on("EXCHANGE", (data) => {
      console.log('====EXCHANGE', data);
    });
    
    // socket.on("disconnect", () => {
    //   console.log(socket.id); // undefined
    // });
  }

  useEffect(() => {
    if (step === 1 || step === 2) {
    }
    if (step === 3) {
      setIsClaiming(true)
      dispatch(unStakeAll())
      setIsClaiming(false)
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
            title: 'Claimed successfully! Your request is pending now.',
          },
        }),
      )
      dispatch(fetchUserRank({ event: 'stake', search: walletAccount }))
      listenClaimEvent();
    }
  }, [claim])

  return {
    isOpen,
    step,
    claimType,
    isClaiming,
    userRank,
    setClaimType,
    resetModal,
    nextStep,
    setStep,
  }
}

export default useClaimFacade
