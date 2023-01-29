import { TrendingDown, TrendingUp } from '@mui/icons-material'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import DataTable from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'


const Home = () => {
  
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
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "2",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "3",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "4",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "5",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "6",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "7",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  
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
          <div className="container">
          <div className="center d-flex justify-content-center align-items-center row">
            <div className="pie d-flex flex-column justify-content-center col-lg-6">
              <div className="add p-3 bg-warning mt-5"><Link to={'/new'} style={{textDecoration:'none', color:'white'}}>طلب معاينة جديد</Link></div>
              <div className="chart">
              <PieChart width={300} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
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
            <div className="bar col-lg-6">
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
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
            </div>
          </div>
          </div>
          <div className="bottom">
            <div className="container">
                <DataTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home