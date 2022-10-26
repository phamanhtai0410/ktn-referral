import IcRank from '../../assets/images/staking/ic_rank.svg'
import IcStaked from '../../assets/images/staking/ic_staked.svg'
import IcLock from '../../assets/images/staking/ic_lock.svg'
import { useAppDispatch } from '@/app/hooks'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { selectWalletAccount } from '@/reducers/walletSlice'
import { openModalClaim } from '@/reducers/staking'
import { fetchTotalStaked, fetchUserRank } from '@/actions/stakingActions'
import { useEffect } from 'react'
import { selectTotalStaked, selectUserRank } from '@/reducers/staking'

const UserStakeInfo = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const userRank = useSelector(selectUserRank)
  const totalStaked = useSelector(selectTotalStaked)
  const onClickClaim = async () => {
    await dispatch(fetchUserRank({ event: 'stake', search: walletAccount }))
    dispatch(openModalClaim({ isOpen: true }))
  }

  useEffect(() => {
    if (walletAccount) {
      dispatch(fetchUserRank({ event: 'stake', search: walletAccount }))
    }
  }, [walletAccount])

  useEffect(() => {
    dispatch(fetchTotalStaked({ name: 'stake' }))
  }, [])

  return (
    <div className="flex flex-col w-full space-y-4 max-w-[1280px]">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        Stake
      </span>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full items-center sm:gap-x-8 gap-y-8">
        <div className="flex flex-col h-[208px] space-y-8 border border-[#FFA52C] rounded-2xl backdrop-blur-[25px] p-8 pb-12">
          <div className="flex flex-row items-center space-x-4">
            <img src={IcRank} alt="staking" />
            <span className="font-oxanium_ font-bold text-4xl text-white">
              My Rank
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="font-poppins font-bold text-xl text-white">
              Rank: {userRank?.rank || '--'}
            </span>
            <div className="flex flex-row items-center space-x-3">
              <span className="font-poppins font-bold text-xl text-white">
                Point:
              </span>
              <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                {userRank?.point.toFixed(2)}
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
        <div className="flex flex-col h-[208px] space-y-8 border border-[#FFA52C] rounded-2xl backdrop-blur-[25px] p-8 pb-12">
          <div className="flex flex-row space-x-4">
            <img src={IcStaked} alt="staking" />
            <span className="font-oxanium_ font-bold text-4xl text-white">
              Total Staked
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row space-x-2">
              <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                {totalStaked}
              </span>
              <span className="font-poppins font-bold text-xl text-white">
                NFTs
              </span>
            </div>

            <img src={IcLock} alt="staking" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserStakeInfo
