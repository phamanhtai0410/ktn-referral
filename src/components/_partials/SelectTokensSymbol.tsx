import React from 'react'
import IcArrow from '../../assets/images/partials/arrow_bot.svg'
const SelectTokensSymbol = () => {
  return (
    <div className="relative w-[216px] px-8 py-3 rounded-[32px] flex flex-col border border-white border-opacity-[0.4]">
      <select
        className="flex flex-row items-center cursor-pointer appearance-none focus:outline-none bg-transparent text-[#a2a09e]"
        defaultValue={'BNB'}
      >
        <option value="BNB">USDT</option>
      </select>
      <img src={IcArrow} alt="rinz" className="absolute top-[40%] right-8" />
    </div>
  )
}

export default SelectTokensSymbol
