import { AddAPhotoOutlined, AddCircleOutlineRounded, BarChart, BarChartOutlined, Business, ExitToAppOutlined, Lock, LockClockRounded, Menu, Person, QuestionMark, Settings, SettingsAccessibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'



const Sidebar = () => {
  return (
    <>
    <div className='sidebar d-flex flex-column justify-content-between'>
        <ul className="list">
            <Link to={'/'} style={{textDecoration:'none', color:'white'}}>
            <li className='listLogo' style={{fontSize:'17px'}}>
                <Business className='icon'/>
                <span>قيم عقارك</span>
            </li>
            <li>
                <BarChartOutlined className='icon'/>
                <span>الاحصائيات</span>
            </li>
            </Link>
            <li>
                <Link to={'/new'} style={{textDecoration:'none', color:'white'}}>
                <AddCircleOutlineRounded className='icon'/>
                <span>إضافة طلب</span>
                </Link>
            </li>
            <Link to={'/list'} style={{textDecoration:'none', color:'white'}}>
            <li>
                <Menu className='icon'/>
                <span>طلباتي</span>
            </li>
            </Link>
            <Link to={'/details'} style={{textDecoration:'none', color:'white'}}>
            <li>
                <Person className='icon'/>
                <span>الملف الشخصي</span>
            </li>
            </Link>
            
            <li>
                <Settings className='icon'/>
                <span>الاعدادات العامة</span>
            </li>
            <li>
                <LockClockRounded className='icon'/>
                <span>اعدادات الأمان</span>
            </li>
            <li className='mb-5'>
                <QuestionMark className='icon'/>
                <span>الدعم التقني</span>
            </li>
           
           

        </ul>
        <p>
        <ExitToAppOutlined className='icon'/>
        <span>تسجيل الخروج</span>
        </p>
    </div>
    </>
  )
}

export default Sidebar