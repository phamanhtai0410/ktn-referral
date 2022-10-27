import IcReferral from '../../assets/images/referral/ic_referral.svg'
import IcCopy from '../../assets/images/referral/ic_copy.svg'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { useSelector } from 'react-redux'
import { selectReferralCode } from '@/reducers/referral'
import { submitReferralCode } from '@/actions/referralActions'
import { copyTextToClipboard, randomKeyUUID } from '@/_helpers/utils/lib'
import { LocalStorageService } from '@/_helpers'
import { useSearchParams } from 'react-router-dom'
import { setAlert } from '@/reducers/alert'

const ReferralForm = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const referralCode = useSelector(selectReferralCode)

  const onCopy = (value) => {
    let url = window.location.href + '?ref=' + value
    copyTextToClipboard(url)
    dispatch(
      setAlert({
        type: 'success',
        key: randomKeyUUID(),
        message: {
          status: 'success',
          title: 'Copied!',
        },
      }),
    )
  }

  const onSubmitReferralCode = (e) => {
    e.preventDefault()
    let inputCode = e.target[0].value

    dispatch(
      submitReferralCode({
        address: LocalStorageService.getAccessAccount(),
        code: inputCode,
      }),
    )
  }
  const [inputReferralCode, setInputReferralCode] = useState('')

  const onChangeReferralCode = (value) => {
    setInputReferralCode(value)
  }

  useEffect(() => {
    setInputReferralCode(searchParams.get('ref') || '')
  }, [searchParams])

  return (
    <div className="flex flex-col w-full space-y-4 max-w-[1280px]">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        Referral
      </span>
      <div className=" referral__head flex flex-col p-8 border-[0.5px] border-[#FFA52C] rounded-2xl backdrop-blur-[25px]">
        <div className="flex flex-row space-x-4">
          <img src={IcReferral} alt="referral" className="cursor-pointer" />
          <span className="font-oxanium font-bold text-4xl text-white">
            Referral
          </span>
        </div>
        <div className="flex flex-col mt-7 space-y-7">
          <div className="flex flex-row items-center justify-between">
            <span className="font-poppins font-medium text-base text-[#E2C1AA]">
              My referral code:
            </span>
            <div className="flex flex-row items-center space-x-4">
              {referralCode?.code && (
                <img
                  src={IcCopy}
                  alt="referral"
                  className="cursor-pointer"
                  onClick={() => onCopy(referralCode?.code)}
                />
              )}
              <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                {referralCode?.code || '--'}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="font-poppins font-medium text-base text-[#E2C1AA]">
              Referral People:
            </span>
            <span className="font-poppins font-bold text-xl text-[#FFA52C]">
              {referralCode?.point ? referralCode.point : '--'}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="font-poppins font-medium text-base text-[#E2C1AA]">
              Total Earned:
            </span>
            <span className="font-poppins font-bold text-xl text-[#FFA52C]">
              {referralCode?.total_earn}
            </span>
          </div>
        </div>
        {!referralCode?.code_linked && (
          <div className="flex flex-col w-full">
            <div className="mt-[26px] mb-6 h-[1px] border border-dashed border-[#81715C]"></div>

            <div className="flex flex-col space-y-[10px]">
              <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                Been referred by a friend?
              </span>
              <form
                onSubmit={(event) => onSubmitReferralCode(event)}
                className="flex flex-row w-full items-center space-x-4"
              >
                <input
                  className="w-full p-3 font-poppins font-medium text-base text-[#E2C1AA] placeholder:text-[#81715C] bg-white bg-opacity-10 rounded-lg focus:outline-none"
                  placeholder="Enter code"
                  value={inputReferralCode}
                  onChange={(e) => onChangeReferralCode(e.target.value)}
                />
                <button
                  type="submit"
                  className={`px-4 py-3 font-poppins font-semibold text-base rounded-lg ${
                    inputReferralCode.length > 5
                      ? 'bg-[#FFA52C] text-white'
                      : 'bg-white bg-opacity-10 text-[#81715C]'
                  } `}
                  disabled={inputReferralCode.length < 6}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ReferralForm
