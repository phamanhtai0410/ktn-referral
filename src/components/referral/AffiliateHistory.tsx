import Pagination from '@/components/_partials/Pagination'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { addressWalletCompact, formatDateTime } from '@/_helpers/utils/lib'
import { selectReferralCode } from '@/reducers/referral'
import { selectWalletAccount } from '@/reducers/walletSlice'

const AffiliateHistory = () => {
  const referralInfo = useSelector(selectReferralCode)

  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        Affiliate History
      </span>
      {referralInfo?.address_referrals?.length > 0 ? (
        <div className="flex flex-col space-y-8 overflow-auto">
          {referralInfo?.address_referrals?.length > 0 && (
            <div className="flex flex-col border border-white border-opacity-10 rounded-2xl overflow-auto">
              <div className="grid grid-cols-5 items-center justify-between py-6 min-w-[700px]">
                <span className="font-oxanium font-bold text-2xl text-white text-center">
                  #
                </span>
                <span className="font-oxanium font-bold text-2xl text-white text-center">
                  Wallet L1
                </span>
                <span className="font-oxanium font-bold text-2xl text-white text-center">
                  Join Date
                </span>
                <span className="font-oxanium font-bold text-2xl text-white text-center">
                  Wallet L2
                </span>
                <span className="font-oxanium font-bold text-2xl text-white text-center">
                  Join Date
                </span>
              </div>
              {referralInfo?.address_referrals?.map((item, index) => (
                <SwitchTransition key={index} mode={'out-in'}>
                  <CSSTransition key={index} timeout={100 + index * 40}>
                    <div className="grid grid-cols-5 items-center justify-between py-5 border-t border-white border-opacity-10 cursor-pointer hover:bg-[#FFA52C] hover:bg-opacity-10 min-w-[700px]">
                      <span className="font-poppins font-normal text-base text-white text-center">
                        {index + 1}
                      </span>
                      <span className="font-poppins font-normal text-base text-white text-center">
                        {item.address_level_1
                          ? addressWalletCompact(item.address_level_1)
                          : '-'}
                      </span>
                      <span className="font-poppins font-normal text-base text-white text-center">
                        {item.updated_time_level_1
                          ? formatDateTime(
                              'date',
                              item.updated_time_level_1 * 1000,
                              'YYYY/MM/DD',
                            )
                          : '-'}
                      </span>

                      <span className="font-poppins font-normal text-base text-white text-center">
                        {item.address_level_2
                          ? addressWalletCompact(item.address_level_2)
                          : '-'}
                      </span>
                      <span className="font-poppins font-normal text-base text-white text-center">
                        {item.updated_time_level_2
                          ? formatDateTime(
                              'date',
                              item.updated_time_level_2 * 1000,
                              'YYYY/MM/DD',
                            )
                          : '-'}
                      </span>
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              ))}
            </div>
          )}
        </div>
      ) : (
        <span className="font-poppins font-semibold text-base text-center text-[#FFB156]">
          No data found!
        </span>
      )}
    </div>
  )
}
export default AffiliateHistory
