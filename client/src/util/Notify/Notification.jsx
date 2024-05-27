import React from 'react'
import './Notification.scss'
export const ErrMsg = (msg) => {
  return (
    <div className='errMsg'>{msg}</div>
  )
}
export const SuccessMsg = (msg) => {
  return (
    <div className='successMsg'>{msg}</div>
  )
}
