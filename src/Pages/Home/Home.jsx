import { TrendingDown, TrendingUp } from '@mui/icons-material'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const Home = () => {
  return (
    <>
    <div className='home'>
      <Sidebar/>
      <div className="homecontainer d-flex">
        <div className="sum">
          <div>
            <p>نظرة عامة شهر أكتوبر</p>
            <span>ابقى على إطلاع دائما بما يحدث في النظام</span>
          </div>
          <div>
            <div className='sumItem'>
              <span>الدخل الحالي</span>
              <div className='sumNum'>
                <p>600.88 SAR</p>
                <div className='percentage percentage0'><TrendingUp/>20%</div>
              </div>
            </div>
            <div className='sumItem'>
              <span>الدخل الحالي</span>
              <div className='sumNum'>
                <p>600.88 SAR</p>
                <div className='percentage percentage1'><TrendingDown/>-10%</div>
              </div>
            </div>
            <div className='sumItem'>
              <span>الدخل الحالي</span>
              <div className='sumNum'>
                <p>600.88 SAR</p>
                <div className='percentage percentage2'><TrendingUp/>10%</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="visualize">
          <div className="top">
            <Navbar/>
          </div>
          <div className="center"></div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home