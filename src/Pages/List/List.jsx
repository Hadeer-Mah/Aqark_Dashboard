import { AddCircleOutline, MenuOpen } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'
import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
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
              <div className='d-flex'>
              <div className='px-3 py-1 rounded-3' style={{backgroundColor: '#b6eebd'}}><Link to={'/new'} style={{textDecoration:'none', color:'black'}}><AddCircleOutline/>طلب جديد</Link></div>
              <input type="date" name="created" className='rounded-3 me-2 border px-2' />

              </div>
              
            </div>
            <DataTable tableInfo={tableList}/>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default List