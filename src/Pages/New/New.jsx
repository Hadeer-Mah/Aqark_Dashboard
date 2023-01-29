import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import GoogleMapReact from 'google-map-react';
import axios from 'axios';


const New = () => {
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({});
    const [user, setUser] = useState({
        "installment_number": "string",
  "installment_image": "string",
  "building_number": "string",
  "building_images": [
    "string"
  ],
  "construction_licence": "string",
  "region": "string",
  "city": "string",
  "neighborhood": "string",
  "address": "string",
  "sketch": "string",
  "contracts": "string",
  "terms_and_conditions": "string",
  "others": "string",
  "status": 0,
  "latitude": 0,
  "longitude": 0
      });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
          setCoordinates({lat: latitude, lng:longitude})
        })
      }, []);

      let getValue=(e)=>{
        let myUser={...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
      }
      async function apiCheck() {
        let {data} = await axios.post('http://127.0.0.1:8000/api/reuqests',
       { headers:{
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'YocjLvxpJz1yLvFTubBK3ROHUGb0LJ0LuldBzA5j1UwPGizuFqhM6jPE4NsXzAao'
        }}, user);
        console.log(data);
    }
    let submitForm=(e)=>{
        e.preventDefault();
        apiCheck();
    }   
  return (
    <>
     <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="formContainer">
            <form onSubmit={submitForm}>
                <div className='container py-5'>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="full_name">name</label>
                            <input type="text" name="full_name" id="full_name" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="telep1">Tele</label>
                            <input type='tel' name="telep1" id="telep1" className='w-100'/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="telep2">tel2</label>
                            <input type="tel" name="telep2" id="telep2" className='w-100'/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="date1">date</label>
                            <input type='date' name="date1" id="date1" className='w-100'/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="date2">date</label>
                            <input type='date' name="date2" id="date2" className='w-100'/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city1">بلد الإقامة</label>
                            <select className='w-100' name='city1' id='city1'></select>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="nationalId">الرقم القومي</label>
                            <input type='number' name="nationalId" id="nationalId" className='w-100'/>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="nationalImg">صورة بطاقة الرقم القومي</label>
                            <input type='file' name="nationalImg" id="nationalImg" className='w-100'/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="building_number">رقم العقار</label>
                            <input type='number' name="building_number" id="building_number" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="installment_number">رقم الصك</label>
                            <input type='number' name="installment_number" id="installment_number" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="installment_image">صورةالصك</label>
                            <input type='file' name="installment_image" id="installment_image" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="construction_licence"> صورة الرخصة</label>
                            <input type='file' name="construction_licence" id="construction_licence" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="docFile">ملف الكروكي</label>
                            <input type='file' name="docFile" id="docFile" className='w-100'/>
                        </div>
                        <div className="col-md-9">
                            <label htmlFor="building_images">صور العقار</label>
                            <input type='file' name="building_images" id="building_images" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="region">المنطقة</label>
                            <select className='w-100' name='region' id='region' onChange={getValue}></select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city">المدينة</label>
                            <select className='w-100' name='city' id='city' onChange={getValue}></select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="neighborhood">الحي</label>
                            <select className='w-100' name='neighborhood' id='neighborhood' onChange={getValue}></select>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="address">العنوان التفصيلي</label>
                            <input type="text" name="address" id="address" onChange={getValue}/>
                        </div>
                        <div className="col-md-8 w-50" style={{height:'350px'}}>
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
                        <div className="col-md-8">
                            <label htmlFor="contracts"> عقود التأجير</label>
                            <input type='file' name="contracts" id="contracts" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="sign">صورة توقيع العميل</label>
                            <input type='file' name="sign" id="sign" className='w-100'/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="terms_and_conditions">وثيقة الشروط والأحكام</label>
                            <input type='file' name="terms_and_conditions" id="terms_and_conditions" className='w-100' onChange={getValue}/>
                        </div>
                        <div className="col-md-6">
                            <button type="submit" className='w-100 bg-black text-white' onSubmit={submitForm}>إرسال الطلب</button>
                        </div>
                        <div className="col-md-6">
                            <button type='reset' className='w-100 border-0'>إلغاء</button>
                        </div>
                        
                    </div>
                
                </div>
            </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default New