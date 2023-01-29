import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import GoogleMapReact from 'google-map-react';
import { DragHandle } from '@mui/icons-material';


const Details = () => {
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({});
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
          setCoordinates({lat: latitude, lng:longitude})
        })
      }, []);
  return (
    <>
    <div className="details d-flex">
        <Sidebar/>
        <div className="detailsContainer d-flex">
          <div className="right d-flex justify-content-between p-5">
                <div className="rightList">
                  <div className='d-flex justify-content-between w-100'>
                    <p className='fs-4 fw-bold'>تفاصيل طلب التقديم</p>
                    {/* <span className='status Pending d-flex justify-content-center align-items-center'>معلق</span> */}
                  </div>
                    <span>رقم الطلب</span>
                    <p>00000000000</p>
                    <span>رقم الهاتف</span>
                    <p>00000000000</p>
                    <span>التاريخ الميلادي</span>
                    <p>00000000000</p>
                    <span>الرقم القومي</span>
                    <p>00000000000</p>
                    <span>رقم العقار</span>
                    <p>00000000000</p>
                    <span>نوع العقار</span>
                    <p>00000000000</p>
                    <span>ملف رخصة البناء</span>
                    <p>00000000000</p>
                    <span>ملف الكروكي</span>
                    <p>00000000000</p>
                   
                </div>
                <div className="leftList mt-5">
                <span>اسم المالك</span>
                    <p>00000000000</p>
                    <span>رقم الهاتف</span>
                    <p>00000000000</p>
                    <span>التاريخ الهجري</span>
                    <p>00000000000</p>
                    <span>صورة الرقم القومي</span>
                    <p>00000000000</p>
                    <span>رقم الصك</span>
                    <p>00000000000</p>
                    <span>عدد الأدوار</span>
                    <p>00000000000</p>
                    <span>الرقم القومي</span>
                    <p>00000000000</p>
                    <span>عقود التأجير</span>
                    <p>00000000000</p>
                </div>
            </div>
            <div className="left col-lg-4">
                <span>اسم المحافظة</span>
                <p>الدمام, السعودية</p>
                <span>اسم الحي</span>
                <p>الدمام, السعودية</p>
                <span>اسم المحافظة</span>
                <p>الدمام, السعودية</p>
                <span>اسم المنطقة</span>
                <p>الدمام, السعودية</p>
                <span>العنوان التفصيلي</span>
                <div className="w-100" style={{height:'350px'}}>
                <GoogleMapReact 
          bootstrapURLKeys={{key: 'AIzaSyCjx0VcQOSzfyAtO--jUTcRIHtwnjT76fQ'}} 
          defaultCenter={coordinates} 
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(e)=>{
            setCoordinates({lat: e.center.lat, lng: e.center.lng});
            setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
          }}
          
          >
          </GoogleMapReact>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Details