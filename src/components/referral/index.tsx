import './index.scss'
import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { useSelector } from 'react-redux'
import { fetchReferralCode } from '@/actions/referralActions'
import { selectWalletAccount } from '@/reducers/walletSlice'
import LeaderBoard from './LeaderBoard'
import Information from './Information'
import ReferralForm from './ReferralForm'
import ModalClaim from './ModalClaim'
import Claim from './Claim'
import AffiliateHistory from './AffiliateHistory'
import { clearReferralCode } from '@/reducers/referral'

const ReferralPage = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)

  useEffect(() => {
    if (walletAccount) {
      dispatch(fetchReferralCode({ address: walletAccount }))
    } else {
      dispatch(clearReferralCode({}))
    }
  }, [walletAccount])

  return (
    <section className="referral">
      <div className="referral__main pt-40 pb-12 relative flex flex-col items-center min-h-[1254px] sm:px-0 px-4">
        <div className="container">
          <ReferralForm />
          <Claim />
          <LeaderBoard event="top_referral" />
          <AffiliateHistory />
          <Information />
        </div>
      </div>
      <ModalClaim />
    </section>
  )
}
export default ReferralPage
