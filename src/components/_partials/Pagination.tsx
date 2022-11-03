import React from 'react'
import './index.scss'
import classnames from 'classnames'
import IcArrow from '../../assets/images/partials/arrow_bot.svg'
import IcPrev from '../../assets/images/partials/ic_prev.svg'
import IcNext from '../../assets/images/partials/ic_next.svg'
import { usePagination, DOTS } from './usePagination'
import classNames from 'classnames'

interface Props {
  index: string
  numOfPage: string
}

const Pagination = (props) => {
  const {
    numOfPage,
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    numOfPage,
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null
  // }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div
      className={classnames('flex flex-row space-x-4 items-center', {
        [className]: className,
      })}
    >
      <button
        className={classNames(
          'flex flex-row items-center space-x-2 p-2 bg-[#353A4552] rounded-lg cursor-pointer',
          { 'hover:bg-white hover:bg-opacity-10': currentPage !== 1 },
        )}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <img src={IcPrev} alt="staking" />
        <span className="font-poppins font-normal text-base text-[#BFBFBF]">
          Prev
        </span>
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={index}
              className="flex flex-row w-10 items-center justify-center space-x-2 p-2 bg-[#353A4552] rounded-lg cursor-pointer font-poppins font-normal text-base text-[#BFBFBF]"
            >
              &#8230;
            </div>
          )
        }

        return (
          <div
            key={index}
            className={classnames(
              'flex flex-row w-10 items-center justify-center space-x-2 p-2 bg-[#353A4552] rounded-lg cursor-pointer font-poppins font-normal text-base hover:bg-white hover:bg-opacity-10',
              {
                'text-[#FFA52C]': pageNumber === currentPage,
                'text-[#BFBFBF]': pageNumber !== currentPage,
              },
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        )
      })}
      <button
        className={classNames(
          'flex flex-row items-center space-x-2 p-2 bg-[#353A4552] rounded-lg cursor-pointer',
          { 'hover:bg-white hover:bg-opacity-10': currentPage !== lastPage },
        )}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <span className="font-poppins font-normal text-base text-[#BFBFBF]">
          Next
        </span>
        <div className="partitals__arrow right" />
        {/* <img src={IcNext} alt="staking" /> */}
      </button>
    </div>
  )
}

export default Pagination
