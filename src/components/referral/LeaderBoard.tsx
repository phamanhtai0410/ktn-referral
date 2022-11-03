import Pagination from '@/components/_partials/Pagination'
import { useAppDispatch } from '@/app/hooks'
import { fetchListLeaderBoard } from '@/actions/referralActions'
import { useEffect, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

import Top from '../_partials/Top'
import { addressWalletCompact } from '@/_helpers/utils/lib'
import { selectLeaderBoard, selectLeaderBoardTop3 } from '@/reducers/referral'

const LeaderBoard = ({ event }) => {
  const dispatch = useAppDispatch()
  const listLeaderBoard = useSelector(selectLeaderBoard)
  const listLeaderBoardTop3 = useSelector(selectLeaderBoardTop3)

  const [leaderBoardParams, setLeaderBoardParams] = useState({
    page: 1,
    page_size: 10,
    event: event,
  })

  const [currentRow, setCurrentRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageChangeIncrease, setPageChangeIncrease] = useState(false)
  const [currentTableData, setCurrentTableData] = useState([])

  useEffect(() => {
    setCurrentTableData(listLeaderBoard?.items)
  }, [currentPage, listLeaderBoard])

  useEffect(() => {
    setLeaderBoardParams({ ...leaderBoardParams, page: currentPage })
    dispatch(fetchListLeaderBoard({ ...leaderBoardParams, page: currentPage }))
  }, [currentPage])

  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        List Top
      </span>
      {listLeaderBoardTop3 &&
      listLeaderBoardTop3?.items &&
      listLeaderBoardTop3?.items?.length > 0 ? (
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center">
            <div
              className={`flex flex-col xl:flex-row items-center justify-center pl-[18px] mt-4 xl:space-x-20 space-y-12 xl:space-y-0`}
            >
              {listLeaderBoardTop3 &&
                listLeaderBoardTop3?.items?.map((item, index) => (
                  <Top item={item} index={index} />
                ))}
            </div>
          </div>
          {listLeaderBoard &&
            listLeaderBoard?.items &&
            listLeaderBoard?.items?.length > 0 && (
              <div className="referral__table flex flex-col overflow-hidden">
                <div className="grid grid-cols-3 items-center justify-between py-6 border-b border-white border-opacity-10">
                  <span className="font-oxanium font-bold text-2xl text-white text-center">
                    Rank
                  </span>
                  <span className="font-oxanium font-bold text-2xl text-white text-center">
                    Wallet Address
                  </span>
                  <span className="font-oxanium font-bold text-2xl text-white text-center">
                    Point
                  </span>
                </div>
                {currentTableData?.map((item, index) => (
                  <SwitchTransition key={index} mode={'out-in'}>
                    <CSSTransition
                      key={
                        leaderBoardParams.page_size * (currentPage - 1) +
                        index +
                        1
                      }
                      timeout={100 + index * 40}
                      classNames={classnames({
                        'table-row-item-left': !pageChangeIncrease,
                        'table-row-item-right': pageChangeIncrease,
                      })}
                    >
                      <div
                        className={classnames(
                          'grid grid-cols-3 items-center justify-between py-5 border-b border-white border-opacity-10 cursor-pointer',
                          {
                            'bg-[#FFA52C] bg-opacity-10': index === currentRow,
                          },
                        )}
                        onClick={() => setCurrentRow(index)}
                      >
                        <span className="font-poppins font-normal text-base text-white text-center">
                          {item.rank}
                        </span>
                        <span className="font-poppins font-normal text-base text-white text-center">
                          {addressWalletCompact(item.address)}
                        </span>
                        <span className="font-poppins font-normal text-base text-white text-center">
                          {item.point}
                        </span>
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                ))}
                <div className="flex w-full items-center justify-center pt-8">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    numOfPage={listLeaderBoard?.num_of_page}
                    // totalCount={listLeaderBoard?.num_of_page}
                    pageSize={leaderBoardParams.page_size}
                    onPageChange={(page) => {
                      setCurrentRow(0)
                      setPageChangeIncrease(page > currentPage)
                      setCurrentPage(page)
                    }}
                  />
                </div>
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
export default LeaderBoard
