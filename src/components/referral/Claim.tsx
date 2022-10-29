import { fetchUserRank } from '@/actions/referralActions'
import { useAppDispatch } from '@/app/hooks'
import {
  openModalClaim,
  selectReferralCode,
  selectUserRank,
} from '@/reducers/referral'
import { selectWalletAccount } from '@/reducers/walletSlice'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import IcRank from '../../assets/images/referral/ic_rank.svg'

const Claim = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const userRank = useSelector(selectUserRank)
  const referralInfo = useSelector(selectReferralCode)

  const onClickClaim = async () => {
    await dispatch(
      fetchUserRank({ event: 'top_referral', search: walletAccount }),
    )
    dispatch(openModalClaim({ isOpen: true }))
  }

  useEffect(() => {
    if (walletAccount) {
      dispatch(fetchUserRank({ event: 'top_referral', search: walletAccount }))
    }
  }, [walletAccount])

  return (
    <div className="mt-8 flex flex-col w-full space-y-4">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        Rank
      </span>
      <div className="mt-12 flex flex-col h-[208px] space-y-8 border border-[#FFA52C] rounded-2xl backdrop-blur-[25px] p-8 pb-12">
        <div className="flex flex-row items-center space-x-4">
          <img src={IcRank} alt="staking" />
          <span className="font-oxanium font-bold text-4xl text-white">
            My Rank
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-3">
            <span className="font-poppins font-bold text-xl text-white">
              Rank:
            </span>
            <span className="font-poppins font-bold text-xl text-[#FFA52C]">
              {userRank?.rank || '-'}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <span className="font-poppins font-bold text-xl text-white">
              Point:
            </span>
            <span className="font-poppins font-bold text-xl text-[#FFA52C]">
              {referralInfo?.total_earn
                ? referralInfo?.total_earn.toFixed(2)
                : '0'}
            </span>
          </div>

          <button
            className={classNames(
              'px-4 py-3 rounded-lg font-poppins font-bold text-base',
              { 'bg-[#FFA52C] text-white': walletAccount },
              { 'bg-[#4D4233] text-[#806B4F]': !walletAccount },
            )}
            onClick={() => {
              onClickClaim()
            }}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  )
}
export default Claim
