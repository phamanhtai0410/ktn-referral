import FormSearchPrice from '../_partials/FormSearchPrice'
import FormSearchToken from '../_partials/FormSearchToken'
import { useAppDispatch } from '@/app/hooks'
import {
  approveStaking,
  fetchListMyNFTs,
  unStakeNFT,
} from '@/actions/stakingActions'
import { useSelector } from 'react-redux'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import Nft from './Nft'
import Pagination from '../_partials/Pagination'
import { useEffect, useState } from 'react'
import { selectWalletAccount } from '@/reducers/walletSlice'

const MyNfts = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const listMyNFTs = useSelector(selectMyNFTs)
  const [params, setParams] = useState({
    page: 1,
    page_size: 8,
  })

  const onStake = (token_id, is_staking) => {
    if (!is_staking) {
      dispatch(approveStaking({ token_id: token_id }))
    } else {
      dispatch(unStakeNFT({ token_id: token_id }))
    }
  }

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setParams({ ...params, page: currentPage })
    if (walletAccount) {
      dispatch(
        fetchListMyNFTs({
          ...params,
          page: currentPage,
          address: walletAccount,
        }),
      )
    }
  }, [walletAccount, currentPage])

  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        NFTs
      </span>
      <div className="flex flex-row space-x-6">
        <FormSearchPrice />
        <FormSearchToken />
      </div>
      {listMyNFTs && listMyNFTs?.items?.length > 0 ? (
        <div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-8">
            {listMyNFTs?.items?.map((item, index) => (
              <Nft key={index} data={item} onStake={onStake} />
            ))}
          </div>
          <div className="flex w-full items-center justify-center pt-8">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              numOfPage={listMyNFTs?.pagination?.num_of_page}
              // totalCount={listLeaderBoard?.num_of_page}
              pageSize={listMyNFTs?.pagination?.page_size}
              onPageChange={(page) => {
                setCurrentPage(page)
              }}
            />
          </div>
        </div>
      ) : (
        <span className="font-poppins font-semibold text-base text-center text-[#FFB156]">
          No data found!
        </span>
      )}
    </div>
  )
}
export default MyNfts
