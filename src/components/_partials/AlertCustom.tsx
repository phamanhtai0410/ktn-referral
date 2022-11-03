import IcClose from '../../assets/images/toast/ic_close.svg'
import IcInfo from '../../assets/images/toast/ic_info.svg'
import IcSuccess from '../../assets/images/toast/ic_success.svg'
import IcError from '../../assets/images/toast/ic_error.svg'
import IcWarning from '../../assets/images/toast/ic_warning.svg'
import { ClipLoader } from 'react-spinners'

const AlertCustom = ({ dataItem, status, closeToast }) => {
  const { message } = dataItem
  const loadIconView = (status) => {
    switch (status) {
      case 'success':
        return <img src={IcSuccess} alt="Success" />
      case 'info':
        return <img src={IcInfo} alt="Info" />
      case 'warning':
        return <img src={IcWarning} alt="Warning" />
      case 'error':
        return <img src={IcError} alt="Error" />
      case 'loading':
        return <ClipLoader color="#FFA540" size={24} />
      case 'update':
        return <img src={IcSuccess} alt="Update" />
      default:
        break
    }
  }

  return (
    <div className="w-[340px]">
      <div className="alert p-4 w-auto relative flex flex-row items-start justify-between space-x-4 overflow-hidden">
        <div className="flex flex-row items-start w-full overflow-hidden">
          {loadIconView(status)}
          <div className="flex flex-col w-full pl-6 space-y-1 overflow-hidden">
            {message.title && (
              <span
                className={`title-${status} font-poppins font-semibold text-base`}
              >
                {message.title}
              </span>
            )}
            {message.description && (
              <span className="font-poppins font-normal text-sm text-[#FFF6DE]">
                {message.description}
              </span>
            )}
            {message.link && (
              <a
                href={message.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-${status} font-poppins font-normal text-sm text-[#FFF6DE] truncate`}
              >
                {message.link}
              </a>
            )}
            {message?.details && message?.details?.label ? (
              <div>
                <p
                  className={`text-[${
                    message?.details?.color ?? '#699B8C'
                  }] text-[16px] underline font-montserrat_semi_bold ${
                    message?.details?.className
                  }`}
                  onClick={message?.details?.action}
                >
                  {message?.details?.label}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {!(status === 'loading') && (
          <img
            src={IcClose}
            alt=""
            onClick={closeToast}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}

export default AlertCustom
