import { openModalClaim } from '@/reducers/referral'
import Modal from 'react-modal'
import useClaimFacade from './useClaimFacade'
import IcUsdt from '../../assets/images/referral/ic_usdt.svg'
import IcNft from '../../assets/images/referral/ic_nft.svg'
import IcClose from '../../assets/images/referral/ic_close.svg'
import classNames from 'classnames'
import { FadeLoader } from 'react-spinners'
import { useState } from 'react'
import { fetchExchangeInfo } from '@/actions/referralActions'
import { useAppDispatch } from '@/app/hooks'
import BtnClaim from './BtnClaim'
import { useSelector } from 'react-redux'
import { selectEasyWeb3 } from '@/reducers/walletSlice'
import { EasyWeb3 } from '@/service/web3'

const customStyles = {
  content: {
    border: '1px solid #FFA52C',
    background: 'rgba(48, 25, 8, 0.5)',
    backdropFilter: 'blur(25px)',
  },
}

const ModalClaim = () => {
  const dispatch = useAppDispatch()
  const {
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
  } = useClaimFacade()

  const easyWeb3Data = useSelector(selectEasyWeb3)
  const [point, setPoint] = useState('')
  const setMaxPoint = (point) => {
    setPoint(point)
  }

  const onChangePoint = (value) => {
    if (Number(value) > referralInfo?.total_earn) {
      return
    }
    setPoint(value)
  }

  const claim = async (point) => {
    let acceptChain: number = import.meta.env.VITE_CHAIN_ID
    if (acceptChain !== easyWeb3Data?.walletInfo?.chainId) {
      const result = await EasyWeb3.getInstance().switchEthereumChain(
        acceptChain,
      )
      if (result !== undefined) {
        await dispatch(
          fetchExchangeInfo({ amount: point, event: 'top_referral' }),
        )
      }
    }
    closeModal()
  }

  const closeModal = () => {
    dispatch(openModalClaim({ isOpen: false }))
    resetModal()
  }

  return (
    <div className="flex items-start relative">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        className="katana-modal lg:p-8 p-6 flex flex-col rounded-2xl sm:w-[460px] w-[340px]"
        overlayClassName="katana-modal-overlay"
      >
        <div className="flex flex-col">
          <div className="relative flex flex-row items-center border-b border-[#FFA52C] border-opacity-20 pb-6">
            <h2 className="font-poppins font-bold w-full text-align text-center text-xl text-[#FFF6DE]">
              Claim
            </h2>
            <img
              src={IcClose}
              alt="staking"
              className="absolute right-4 cursor-pointer hover:scale-110"
              onClick={closeModal}
            />
          </div>
          {step === 1 && (
            <div className="mt-8 flex flex-col space-y-8">
              <span className="font-poppins font-semibold w-full text-align text-center text-base text-[#FFF6DE]">
                Do you want to claim?
              </span>
              <div className="flex flex-row space-x-8">
                <div
                  className={classNames(
                    'flex flex-col items-center w-full py-6 space-y-4 bg-white bg-opacity-5 border border-[#FFA52C] rounded-lg cursor-pointer',
                    { 'border-opacity-20': claimType !== 'USDT' },
                  )}
                  onClick={() => setClaimType('USDT')}
                >
                  <span className="font-poppins font-semibold w-full text-align text-center text-base text-[#FFF6DE]">
                    USDT
                  </span>
                  <img src={IcUsdt} alt="staking" />
                </div>
                <div
                  className={classNames(
                    'flex flex-col items-center w-full py-6 space-y-4 bg-white bg-opacity-5 border border-[#FFA52C] rounded-lg',
                    { 'border-opacity-20': claimType !== 'NFT' },
                  )}
                  // onClick={() => setClaimType('NFT')}
                >
                  <span className="font-poppins font-semibold w-full text-align text-center text-base text-[#FFF6DE]">
                    NFT
                  </span>
                  <img src={IcNft} alt="staking" />
                </div>
              </div>
              <button
                className={classNames(
                  'w-full py-3 rounded-[32px] font-poppins font-semibold',
                  { 'bg-[#FFA52C] text-white': claimType !== '' },
                  { 'bg-[#4D4233] text-[#806B4F]': claimType === '' },
                )}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 flex flex-col space-y-8">
              <span className="font-poppins font-semibold w-full text-align text-center text-base text-[#FFF6DE]">
                Do you want to Unstake all NFTs?
              </span>
              <div className="flex flex-row space-x-8">
                <button
                  className="w-full py-3 rounded-[32px] font-poppins font-semibold text-white bg-white bg-opacity-5 border border-[#FFA52C] border-opacity-20"
                  onClick={() => setStep(4)}
                >
                  No
                </button>
                <button
                  className="w-full py-3 rounded-[32px] font-poppins font-semibold bg-[#FFA52C] text-white"
                  onClick={nextStep}
                >
                  Yes
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full">
              <div className="mt-8 flex flex-col items-center space-y-8">
                <span className="font-poppins font-semibold w-full text-align text-center text-base text-[#FFF6DE]">
                  You are unstaking all ...
                </span>
                <FadeLoader color="#FFA540" loading={isClaiming} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="w-full">
              <div className="mt-8 flex flex-col items-center space-y-3">
                <span className="font-poppins font-normal w-full text-align text-sm text-[#FFF6DE]">
                  Transaction overview
                </span>
                <div className="relative w-full flex items-center">
                  <input
                    placeholder="Enter point"
                    className="w-full p-4 focus:outline-none rounded-lg bg-white bg-opacity-5 border border-[#FFA52C] border-opacity-20 font-poppins font-normal text-base text-[#FFA52C] placeholder:text-[#81715C]"
                    value={point}
                    onChange={(e) => onChangePoint(e.target.value)}
                  />
                  <button
                    className="absolute right-4 font-poppins font-bold text-align text-base text-[#FFA52C]"
                    onClick={() => setMaxPoint(referralInfo?.total_earn)}
                  >
                    MAX
                  </button>
                </div>

                <div className="flex flex-row w-full items-center justify-between">
                  <span className="font-poppins font-normal text-align text-sm text-[#FFF6DE]">
                    Available
                  </span>
                  <span className="font-poppins font-normal text-align text-sm text-[#FFF6DE]">
                    {referralInfo?.total_earn}
                  </span>
                </div>
              </div>
              <div className="w-full mt-8">
                <BtnClaim
                  disable={!(Number(point) > 0)}
                  onClaim={() => claim(point)}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ModalClaim
