import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import GoogleMapReact from 'google-map-react';
import Navbar from '../../components/Navbar/Navbar';
import { ReqContext } from '../../contexts/ReqContext';


const Details = ({userData, logout}) => {
  const {userReq} = useContext(ReqContext);
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
        <Sidebar logout={logout}/>
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
                    <p>{userReq.telep1}</p>
                    <span>التاريخ الميلادي</span>
                    <p>{userReq.date1}</p>
                    <span>الرقم القومي</span>
                    <p>{userReq.nationalId}</p>
                    <span>رقم العقار</span>
                    <p>{userReq.building_number}</p>
                    <span>نوع العقار</span>
                    <p></p>
                    <span>ملف رخصة البناء</span>
                    <p></p>
                    <span>ملف الكروكي</span>
                    <p style={{cursor:"pointer", textDecoration: "underline"}}>اضغط لتحميل الملف</p>
                   
                </div>
                <div className="leftList mt-5">
                <span>اسم المالك</span>
                    <p>{userReq.full_name}</p>
                    <span>رقم الهاتف</span>
                    <p>{userReq.telep2}</p>
                    <span>صورة الرقم القومي</span>
                    <p></p>
                    <span>رقم الصك</span>
                    <p>{userReq.installment_number}</p>
                    <span>عدد الأدوار</span>
                    <p>5</p>
                    <span>الرقم القومي</span>
                    <p>{userReq.nationalId}</p>
                    <span>عقود التأجير</span>
                    <p>{userReq.contracts}</p>
                </div>
            </div>
            <div className="left col-lg-4">
              <Navbar userData={userData}/>
                <span>اسم المحافظة</span>
                <p>{userReq.city}, السعودية</p>
                <span>اسم الحي</span>
                <p>{userReq.neighborhood}, السعودية</p>
                <span>اسم المنطقة</span>
                <p>{userReq.region}, السعودية</p>
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