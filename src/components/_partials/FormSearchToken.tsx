import React from 'react'
import IcArrow from '../../assets/images/partials/ic_arrow_bot.svg'
import './index.scss'

interface Props {
  index: string
  numOfPage: string
}

const FormSearchToken = (Props) => {
  const { className, title } = Props
  const onChangeSort = (e) => {
    console.log('Changed')
  }
  return (
    <div className="flex flex-col relative w-full">
      <input
        className="partitals__search-token py-3 px-6 appearance-none focus:outline-none font-poppins font-normal text-base text-[#FFA52C]"
        placeholder="Search Token ID"
      />
    </div>
  )
}

export default FormSearchToken
