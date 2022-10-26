import React from 'react'
import IcArrow from '../../assets/images/partials/ic_arrow_bot.svg'
import './index.scss'

interface Props {
  index: string
  numOfPage: string
}

const FormSearchPrice = (Props) => {
  const { className, title } = Props
  const onChangeSort = (e) => {
    console.log('Changed')
  }
  return (
    <div className="flex flex-col relative w-[184px]">
      <select
        className="partitals__sort-price py-3 px-6 flex items-center cursor-pointer focus:outline-none appearance-none font-poppins font-normal text-base text-[#FFA52C]"
        defaultValue={'ASC'}
        // onChange={onChangeSort}
      >
        <option
          value="ASC"
          className="font-poppins font-normal text-base text-[#FFA52C]"
        >
          Lowest Price
        </option>
        <option
          value="DESC"
          className="font-poppins font-normal text-base text-[#FFA52C]"
        >
          Highest price
        </option>
      </select>

      <img src={IcArrow} alt="rinz" className="absolute top-[40%] right-4" />
    </div>
  )
}

export default FormSearchPrice
