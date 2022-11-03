import icLogo from '@/assets/images/game/ic-logo.png'
import { useLocation } from 'react-router'
import './index.scss'
import PublicIcon from '@mui/icons-material/Public';
import ConnectWallet from '../ConnectWallet';

const menuList = [
  {
    title: 'Gaming',
    link: '/',
  },
  {
    title: 'Tokenomics',
    link: 'https://katanainu.com/#tokenomics',
  },
  {
    title: 'Whitepaper',
    link: 'https://katanainu.com/katanainuwhitepaper.pdf',
  },
  {
    title: 'Roadmap',
    link: 'https://katanainu.com/#roadmap',
  },
  {
    title: 'Team',
    link: 'https://katanainu.com/#teams',
  },
]

const Header = () => {

  const location = useLocation()

  return (
    <nav className="px-2 sm:px-4 py-2 absolute w-full z-20 left-0">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="w-16 h-6 relative">
          <a
            href="/"
            className="flex items-center absolute top-[-15px] w-[136px] h-auto"
          >
            <img src={icLogo} className="h-24 w-auto" alt="Logo" />
          </a>
        </div>

        <div className="flex md:order-2 items-center gap-8">
          <PublicIcon style={{ color: "#9ca3af" }} />
          {/* <button
            type="button"
            className="home-btn text-white cursor-pointer uppercase bg-transparent font-medium rounded-xl text-base px-5 py-2.5 text-center"
          >
            Connect Wallet
          </button> */}

          <ConnectWallet />

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            {menuList.map((item, index) => (
              <li key={item.title} >
                <a
                  className={`${item?.link === '/' ||
                      item?.link === '/cart' ||
                      item?.link === '/mint'
                      ? 'text-[#e39b11]'
                      : 'text-gray-400'
                    } block py-2 px-2 text-[16px] uppercase md:bg-transparent hover:bg-neutral-100/[.06] `}
                  aria-current="page"
                  href={item.link}
                  key={item.title}
                >
                  {item.title}
                </a>
                <p className={`${item?.link === '/' ||
                    item?.link === '/cart' ||
                    item?.link === '/mint'
                    ? 'text-[#e39b11] border-b-2 border-[#e39b11] px-3 w-fit'
                    : 'text-gray-400'
                  } `}></p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
