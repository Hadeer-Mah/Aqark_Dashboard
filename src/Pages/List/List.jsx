import React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const List = () => {
  return (
    <>
    <div className="tableList d-flex">
        <Sidebar/>
        <div className="tableContainer">
            <Navbar/>
            <DataTable/>
        </div>
    </div>
    </>
  )
}

export default List