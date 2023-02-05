import {  LanguageOutlined, Menu, NotificationsNoneOutlined, SearchOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import { ReqContext } from "../../contexts/ReqContext";
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = ({userData}) => {
  const {showSidebar, setShowSidebar, tableList} = useContext(ReqContext)
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  function handleClick() {
       setShowSidebar( !showSidebar )
       console.log(showSidebar);
  }

  
  return (
    <>
    <div className='navbarTop'>
      <div className="wrapper">
        {!isDesktop? <div onClick={handleClick} style={showSidebar?{marginRight:"195px",position:'fixed', zIndex:'200', cursor:'pointer', width:'50px', height:'50px', borderRadius:'50%', backgroundColor:'yellow'}:{marginRight:"0",cursor:'pointer', width:'50px', height:'50px', borderRadius:'50%', backgroundColor:'yellow'}} className='d-flex justify-content-center align-items-center'><Menu/></div>:""}
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
             <img src={tableList[0]?.owner?.personal_image?`https://qaym-3kark2-ziadsindion.pythonanywhere.com${tableList[0]?.owner?.personal_image}`:"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" className='avatar'/>
            <div className='userNa me-1'>
            <span>{tableList[0]?.owner.username}</span>
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