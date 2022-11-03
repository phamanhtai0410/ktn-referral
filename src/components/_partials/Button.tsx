import React from 'react'
import IcArrow from '../../assets/images/partials/arrow_bot.svg'
import './index.scss'

interface Props {
  className: string
  title: string
}

const Button = (Props) => {
  const { className, title } = Props
  return <button className={`${className}`}>{title}</button>
}

export default Button
