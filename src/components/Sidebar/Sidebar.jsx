import { AddAPhotoOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'



const Sidebar = () => {
  return (
    <>
    <div className='sidebar'>
        <ul className="list">
            <li className='logo'>
                <AddAPhotoOutlined className='icon'/>
                <span>قيم عقارك</span>
            </li>
            <li>
                <Link to={'/new'} style={{textDecoration:'none', color:'white'}}>
                <AddAPhotoOutlined className='icon'/>
                <span>إضافة طلب</span>
                </Link>
            </li>
            <Link to={'/list'} style={{textDecoration:'none', color:'white'}}>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>طلباتي</span>
            </li>
            </Link>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الملف الشخصي</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الاعدادات العامة</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>اعدادات الأمان</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الدعم التقني</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الاحصائيات</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الاحصائيات</span>
            </li>
            <li>
                <AddAPhotoOutlined className='icon'/>
                <span>الاحصائيات</span>
            </li>

        </ul>
        <p className='logout'>تسجيل الخروج</p>
    </div>
    </>
  )
}

export default Sidebar