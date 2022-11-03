import MenuIcon from '@mui/icons-material/Menu'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Logo_mb from "@/assets/images/game/mb-logo.png"
import CloseIcon from '@mui/icons-material/Close';


const menuList = [
  {
    title: 'GAMING',
    link: '/',
  },
  {
    title: 'TOKENOMICS',
    link: 'https://katanainu.com/#tokenomics',
  },
  {
    title: 'WHITEPAPER',
    link: 'https://katanainu.com/katanainuwhitepaper.pdf',
  },
  {
    title: 'ROADMAP',
    link: 'https://katanainu.com/#roadmap',
  },
  {
    title: 'TEAM',
    link: 'https://katanainu.com/#teams',
  },
]

const HeaderMobile = () => {
  const drawerAnchor = 'right'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { t } = useTranslation()
  const toggleDrawer = (open: boolean) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }
  //styling listItemButton 
  const text = {
    lineheight: "10px",
    BorderBottom: "1px solid white"
  }
  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className="flex justify-between px-8 py-7 border-b border-[#313237]" >
          <img src={Logo_mb} className='w-[140px] rounded-full' alt='logo' />
          <CloseIcon style={{ color: "#FFA500" }} />
        </div>
        {menuList.map((item, index) => (
          <a href={item.link} key={item.title}>
            <ListItem>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index == 0 ? <HomeIcon /> : <span></span>}
                  {index == 1 ? <InfoIcon /> : <span></span>}
                </ListItemIcon> */}
                <ListItemText
                  primaryTypographyProps={{ style: text }}
                  primary={item.title} />
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
      <Divider />
    </Box>
  )
  return (
    <div className="flex items-center w-full px-2 py-2 fixed z-[10] bg-[#0000006b]">
      <React.Fragment key={drawerAnchor}>
        <Drawer
          sx={{
            "& .css-1hskriy":{
              width:"100%"
            },
            "& .MuiPaper-root": {
              background: "#1a1b21",
              color: "#ffffff",
              width:"280px"
            },
            "& .css-1a5cv8g-MuiListItem-root": {
              borderBottom: "1px solid rgb(255 255 255 / 10%)",
            },
            "& .css-10hburv-MuiTypography-root": {
              fontFamily: "'Oswald', sans-serif",
              fontSize:"15px",
              fontWeight: 700,
              lineHeight: 0.5,
            }
          }}
          anchor={drawerAnchor}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList()}
        </Drawer>
      </React.Fragment>
      <div className="flex-1 flex items-center justify-start">
        <a href='/'>
          <img src={Logo_mb} className='w-[140px] rounded-full' alt='logo' />
        </a>
        <span className="ml-2 hidden md:block">{t('app_name')}</span>
      </div>
      {/* <div className="ml-auto">
          <button
            type="button"
            className="home-btn text-white cursor-pointer uppercase bg-transparent font-medium rounded-xl text-sm lg:text-base px-2 lg:px-5 py-1 lg:py-2.5 text-center"
          >
            Opensea
          </button> */}

      {/* <ConnectWallet /> */}
      {/* </div> */}
      <MenuIcon onClick={toggleDrawer(true)} style={{ color: "#FFF" }} />

    </div>
  )
}


export default HeaderMobile;