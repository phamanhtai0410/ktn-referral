import { useAppDispatch } from '@/app/hooks'
import { fetchListMyNFTs } from '@/actions/stakingActions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import ModalClaim from './ModalClaim'
import { selectWalletAccount } from '@/reducers/walletSlice'
import Information from './Information'
import MyNfts from './MyNfts'
import UserStakeInfo from './UserStakeInfo'
import './index.scss'
import LeaderBoard from '../referral/LeaderBoard'

const StakingPage = () => {
  const dispatch = useAppDispatch()

  return (
    <section className="staking">
      <div className="staking__main pt-40 pb-12 relative flex flex-col items-center min-h-[1254px] sm:px-0 px-4">
        <div className="container">
          <UserStakeInfo />
          <LeaderBoard event="stake" />
          <Information />
          <MyNfts />
        </div>
      </div>
      <ModalClaim />
    </section>
  )
}
export default StakingPage
