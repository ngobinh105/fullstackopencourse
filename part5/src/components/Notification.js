import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log('notification', notification)
  if (!notification.message) {
    return null
  }

  return (
    <div className={notification.error ? 'error' : 'message'}>
      {notification.message}
    </div>
  )
}

export default Notification
