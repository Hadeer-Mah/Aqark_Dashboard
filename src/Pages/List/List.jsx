import React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const List = ({logout}) => {
  return (
    <>
    <div className="tableList d-flex">
        <Sidebar logout={logout}/>
        <div className="tableContainer">
            <Navbar/>
            <DataTable/>
        </div>
    </div>
    </>
  )
}

export default List