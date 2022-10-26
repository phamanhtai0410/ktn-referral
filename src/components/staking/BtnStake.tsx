import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsPending } from '@/reducers/staking'
import { ClipLoader } from 'react-spinners'
import classNames from 'classnames'

const BtnStake = ({ data, onStake }) => {
  const isPending = useSelector(selectIsPending)
  const [isOnClick, setIsOnClick] = useState(false)
  useEffect(() => {
    if (!isPending) {
      setIsOnClick(false)
    }
  }, [isPending])

  return (
    <button
      className={classNames(
        'flex flex-row items-center justify-center space-x-4 py-[10px] rounded-lg',
        { 'bg-[#4D4233]': isOnClick },
        { 'bg-white bg-opacity-5': !isOnClick },
        { 'hover:bg-[#4D4233]': !isPending },
      )}
      disabled={isPending}
      onClick={() => {
        setIsOnClick(true)
        onStake(data?.token_id, data?.is_staking)
      }}
    >
      <span className="font-poppins font-medium text-base text-white text-center">
        {!data?.is_staking
          ? !isOnClick
            ? 'Stake'
            : 'Staking'
          : !isOnClick
          ? 'UnStake'
          : 'Unstaking'}
      </span>

      {isPending && isOnClick && <ClipLoader color="white" size={17} />}
    </button>
  )
}

export default BtnStake
