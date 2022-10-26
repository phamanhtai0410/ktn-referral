import { useSelector } from 'react-redux'
// import 'react-toastify/dist//ReactToastify.css'
import React, { useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { randomKeyUUID } from '../../_helpers/utils/lib'
import AlertCustom from './AlertCustom'
import { selectAlert } from '@/reducers/alert'
import './toastify.scss'

const AlertMessages = () => {
  const alert = useSelector(selectAlert)
  const getItemAlert = useCallback(
    (item) => {
      console.log('first', item)
      const key = item.key || randomKeyUUID()
      const option = {
        toastId: key,
        type: item.message.status ? item.message.status : item.type,
        render: (
          <AlertCustom
            dataItem={item}
            key={key}
            status={item.message.status ? item.message.status : item.type}
            closeToast
          />
        ),
        isLoading: false,
        autoClose: item.duration || item.type !== 'loading',
      }

      switch (alert.type) {
        case 'error':
          toast.error(option.render, option)
          break
        case 'warning':
          toast.warning(option.render, option)
          break
        case 'success':
          toast.success(option.render, option)
          break
        case 'info':
          toast.info(option.render, option)
          break
        case 'loading':
          toast.loading(option.render, {
            ...option,
            autoClose: false,
          })
          break
        case 'update':
          toast.update(key, option)
          break
        default:
          break
      }
    },
    [alert.type],
  )

  useEffect(() => {
    if (alert && alert.type) {
      console.log('alert', alert)
      getItemAlert(alert)
    }
  }, [alert, getItemAlert])

  return (
    <ToastContainer
      toastClassName={() =>
        'relative flex mb-3 px-4 py-4 border border-[#81715C] backdrop-blur-[25px] rounded-md justify-between overflow-hidden cursor-pointer'
      }
      position={toast.POSITION.BOTTOM_RIGHT}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      icon={false}
      closeButton={false}
    />
  )
}

export default AlertMessages
