import { AddCircle, MenuOpen, TrendingDown, TrendingUp } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import DataTable from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { ReqContext } from '../../contexts/ReqContext'
import axiosInstance from '../../contexts/axiosInstance'
import { useMediaQuery } from '@mui/material'


const Home = ({logout, userData}) => {
  const {getData, tableList, showSidebar} = useContext(ReqContext)
  let homeTable = tableList.slice(0,4)
  const isDesktop = useMediaQuery('(min-width:1000px)');



  

  
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data1 = [
    {
      name: "1",
      قائمة: 4000,
      مغلقة: 2400,
      amt: 2400
    },
    {
      name: "2",
      قائمة: 3000,
      مغلقة: 1398,
      amt: 2210
    },
    {
      name: "3",
      قائمة: 2000,
      مغلقة: 9800,
      amt: 2290
    },
    {
      name: "4",
      قائمة: 2780,
      مغلقة: 3908,
      amt: 2000
    },
    {
      name: "5",
      قائمة: 1890,
      مغلقة: 4800,
      amt: 2181
    },
    {
      name: "6",
      قائمة: 2390,
      مغلقة: 3800,
      amt: 2500
    },
    {
      name: "7",
      قائمة: 3490,
      مغلقة: 4300,
      amt: 2100
    }
  ];
  useEffect(() => {
    getData()   
  }, [])
  
  
  return (
    <>
    <div className='home'>
      {isDesktop?<Sidebar/>:''}
      {showSidebar? <Sidebar/>:''}
      <div className={isDesktop? 'homecontainer': 'homecontainer mobile'}>
        {!isDesktop? <Navbar/> :''}
      <div className="container">
        
        <div className="row d-flex">
        <div className="sum d-flex flex-column justify-content-around col-lg-4">
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
          <div>
            <p>تحليل البيانات</p>
            <span>جميع الطلبات</span>
            <p>64318</p>
            <div className='d-flex justify-content-between'>
            <span>الطلبات القائمة</span>
            <span style={{fontSize:"12px"}}>30/100 من الطلبات</span>
            </div>
            <div className="progress mb-2">
            <div className="progress-bar bg-info" role="progressbar" aria-label="Info example" style={{width: "30%" }}aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className='d-flex justify-content-between'>
            <span>الطلبات المعلقة</span>
            <span style={{fontSize:"12px"}}>20/100 من الطلبات</span>
            </div>            
            <div className="progress mb-2">
            <div className="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style={{width: "20%" }}aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className='d-flex justify-content-between'>
            <span>الطلبات المغلقة</span>
            <span style={{fontSize:"12px"}}>40/100 من الطلبات</span>
            </div>
            <div className="progress">
            <div className="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style={{width: "40%" }}aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
        <div className="visualize col-lg-8">
          {isDesktop? <>
           <div className="top">
            <Navbar/>
          </div>
          </>:''}
          
          
          
          <div className="center d-flex justify-content-center align-items-center row">
            <div className="pie col-lg-6 d-flex justify-content-center align-items-center">
              <div>
              <div className="add p-3 mt-5" style={{backgroundColor:'#f8f8f8'}}>
                <Link to={'/new'} style={{textDecoration:'none', color:'gray'}}><AddCircle/>طلب معاينة جديد</Link>
                <p style={{fontSize:'11px'}}>يمكنك الاّن طلب تقييم على عقاراتك بكل سهولة وسيقوم خبراءنا في التقييم العقاري بمساعدتك</p>
              </div>
              <div className="chart w-50 mx-auto">
              <PieChart width={300} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
              </div>

              </div>
              
            </div>
            <div className="bar col-lg-6 d-flex justify-content-center align-items-center">
            <BarChart
      width={400}
      height={300}
      data={data1}
      margin={{
        top: 5,
        right: 20,
        left: 30,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="مغلقة" fill="#e86767" />
      <Bar dataKey="قائمة" fill="#b6eebd" />
    </BarChart>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <div className="d-flex justify-content-between align-items-baseline">
                <p><MenuOpen className='ms-2'/>طلباتي</p>
                <Link to={'/list'} style={{ color:'gray', marginLeft:'10px'}}>رؤية المزيد</Link>
              </div>
                <DataTable tableInfo={homeTable}/>
            </div>
          </div>
        </div> 

        </div>
      </div>
        </div>   
      
    </div>
    </>
  )
}

export default Home