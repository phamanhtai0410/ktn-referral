import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectClaim } from '@/reducers/referral'
import { ClipLoader } from 'react-spinners'
import classNames from 'classnames'

const BtnClaim = ({ disable, onClaim }) => {
  const claim = useSelector(selectClaim)
  const [isOnClick, setIsOnClick] = useState(false)
  useEffect(() => {
    if (!claim?.isPending) {
      setIsOnClick(false)
    }
  }, [claim?.isPending])

  return (
    <button
      className={classNames(
        'flex flex-row w-full items-center justify-center space-x-4 py-[10px] rounded-[32px]',
        { 'bg-[#FFA52C] text-white': !claim?.isPending || disable },
        { 'bg-[#4D4233] text-[#806B4F]': claim?.isPending || disable },
      )}
      disabled={disable || claim?.isPending}
      onClick={() => {
        setIsOnClick(true)
        onClaim()
      }}
    >
      <span className="font-poppins font-medium text-base text-white text-center">
        {!claim?.isPending ? 'Claim' : 'Claiming...'}
      </span>

      {claim?.isPending && isOnClick && <ClipLoader color="white" size={17} />}
    </button>
  )
}

export default BtnClaim
