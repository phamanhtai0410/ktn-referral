import { useTranslation } from 'react-i18next'
import {
  addressWalletCompact,
  copyTextToClipboard,
  randomKeyUUID,
} from '@/_helpers/utils/lib'
import IcCopy from '../../assets/images/referral/ic_copy.svg'
import IcTop1 from '../../assets/images/staking/ic_top1.svg'
import IcTop2 from '../../assets/images/staking/ic_top2.svg'
import IcTop3 from '../../assets/images/staking/ic_top3.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/reducers/alert'
const Top = (props) => {
  const dispatch = useDispatch()
  const { item, index } = props
  const [showCopyIcon, setShowCopyIcon] = useState(false)

  const getIconListTop = (rank) => {
    switch (rank) {
      case 1:
        return IcTop1
      case 2:
        return IcTop2
      case 3:
        return IcTop3
      default:
        break
    }
  }

  const onCopy = (value) => {
    copyTextToClipboard(value)
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

  return (
    <div
      key={index}
      className="referral__top relative w-[304px] flex flex-col items-center py-2 space-y-2"
      onMouseEnter={() => setShowCopyIcon(true)}
      onMouseLeave={() => setShowCopyIcon(false)}
    >
      <div className="relative flex flex-row items-center">
        <span className="font-poppins font-semibold text-base text-[#FFB156]">
          {item?.address ? addressWalletCompact(item.address) : '--'}
        </span>
        {showCopyIcon && (
          <img
            src={IcCopy}
            alt="copy"
            className="absolute right-[-24px] w-[11px] h-[14px] cursor-pointer"
            onClick={() => onCopy(item?.address)}
          />
        )}
      </div>
      <span className="font-poppins font-semibold text-base text-white">
        Point: {item?.point ? item.point.toFixed(2) : '--'}
      </span>
      <img
        src={getIconListTop(index + 1)}
        alt="top"
        className="absolute top-[-25%] left-[-36px]"
      />
    </div>
  )
}
export default Top
