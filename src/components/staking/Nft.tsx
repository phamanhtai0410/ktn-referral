import React from 'react'
import BtnStake from './BtnStake'

const Nft = ({ data, onStake }) => {
  return (
    <div
      key={data?.token_id}
      className="partitals__nft px-[21.48px] py-6 flex flex-col space-y-4 text-white"
    >
      <img
        src={data?.image}
        alt="nft"
        className="h-[248px] object-cover object-top"
      />
      <span className="font-oxanium font-bold text-base text-white text-center min-h-[24px]">
        {data?.name}
      </span>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          NFT ID
        </span>
        <span className="font-poppins font-normal text-sm text-[#FFA52C]">
          {data?.token_id}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          Price
        </span>
        <span className="font-poppins font-bold text-xl text-[#FFA52C]">
          {data?.price}
        </span>
      </div>
      <BtnStake data={data} onStake={onStake} />
    </div>
  )
}

export default Nft
