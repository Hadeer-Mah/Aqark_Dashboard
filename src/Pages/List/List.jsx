import { AddCircle, MenuOpen } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'
import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import axiosInstance from '../../contexts/axiosInstance'
import { ReqContext } from '../../contexts/ReqContext'

const List = () => {
       const {getData, tableList, showSidebar} = useContext(ReqContext)
       const isDesktop = useMediaQuery('(min-width:1000px)');

       console.log(tableList);
       useEffect(() => {
         getData();
       }, [])
  return (
    <>
    <div className="tableList d-flex">
    {isDesktop?<Sidebar/>:''}
      {showSidebar? <Sidebar/>:''}
        <div className={isDesktop? 'tableContainer': 'tableContainer mobile'}>
            <Navbar/>
            <div className="container">
            <div className='d-flex justify-content-between py-3 align-items-center'>
              <p className='fs-5'><MenuOpen className='me-2'/> طلباتي</p>
              <div className='px-3 py-1 bg-warning rounded-3'><Link to={'/new'} style={{textDecoration:'none', color:'white'}}><AddCircle/>طلب معاينة جديد</Link></div>
            </div>
            <DataTable tableInfo={tableList}/>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default List