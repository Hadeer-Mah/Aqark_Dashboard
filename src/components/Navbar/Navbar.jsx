import {  LanguageOutlined, NotificationsNoneOutlined, SearchOutlined } from '@mui/icons-material'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='navbarTop'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search....' />
          <SearchOutlined/>
        </div>
        <div className="items">
        <div className="item">
            <NotificationsNoneOutlined className='iconNav'/>
            <div className="counter"></div>
          </div>                    
          <div className="item">
            <img src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='avatar'/>
            <div className='userNa'>
            <span>Ahmed</span>
            </div>
          </div>
          <div className="item">
            <LanguageOutlined className='iconNav'/> English
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar