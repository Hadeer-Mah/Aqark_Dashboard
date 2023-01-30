import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { AddCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ReqContext } from '../../contexts/ReqContext';


const New = ({logout}) => {
    const {submitFormReq, getValueReq }= useContext(ReqContext);
      const [image, setImage] = useState("");
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({});
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
          setCoordinates({lat: latitude, lng:longitude})
        })
      }, []);

  return (
    <>
     <div className="new">
      <Sidebar  logout={logout}/>
      <div className="newContainer">
        <Navbar />
        <div className="formContainer">
            <p style={{marginRight:'20px', fontSize:'30px', marginTop:'30px'}}><AddCircle/>طلب تقييم جديد</p>
                <div className='container pb-5 pt-3'>
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="full_name">اسم المالك بالكامل</label>
                            <input type="text" name="full_name" id="full_name" className='w-100 form-control' onChange={getValueReq} required/>

                        </div>
                        <div className="col-md-5">
                            <label htmlFor="telep1">رقم الهاتف1</label>
                            <input type='tel' name="telep1" id="telep1" className='w-100 form-control' onChange={getValueReq} required/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="telep2">رقم الهاتف 2</label>
                            <input type="tel" name="telep2" id="telep2" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="date1">التاريخ الميلادي</label>
                            <input type='date' name="date1" id="date1" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city1">بلد الإقامة</label>
                            <select className='w-100 form-select form-select-sm' name='city1' id='city1' onChange={getValueReq} required>
                                 <option value="Riyadh">Riyadh</option>
                                 <option value="Jeddah">Jeddah</option>
                                 <option value="Dammam" defaultValue>Dammam</option>
                            </select>
                        </div>
                        <div className="col-md-7">
                            <label htmlFor="construction_licence"> صورة الرخصة</label>
                            <input type='file' name="construction_licence" id="construction_licence" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nationalId">الرقم القومي</label>
                            <input type='number' name="nationalId" id="nationalId" className='w-100 form-control' onChange={getValueReq} required/>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="nationalImg">صورة بطاقة الرقم القومي</label>
                            <input type='file' name="nationalImg" id="nationalImg" className='w-100 form-control' onChange={(e) => setImage(e.target.files[0])}/>
                            <div className='w-25 h-25'><img className='w-100' src={ image? URL.createObjectURL(image): ""} alt=""/></div>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="building_number">رقم العقار</label>
                            <input type='number' name="building_number" id="building_number" className='w-100 form-control' onChange={getValueReq} required/>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="installment_number">رقم الصك</label>
                            <input type='number' name="installment_number" id="installment_number" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-7">
                            <label htmlFor="installment_image">صورةالصك</label>
                            <input type='file' name="installment_image" id="installment_image" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-7">
                            <label htmlFor="docFile">ملف الكروكي</label>
                            <input type='file' name="docFile" id="docFile" className='w-100 form-control'/>
                        </div>
                        <div className="col-md-9">
                            <label htmlFor="building_images">صور العقار</label>
                            <input type='file' name="building_images" id="building_images" multiple className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="region">المنطقة</label>
                            <select className='w-100 form-select form-select-sm' name='region' id='region' onChange={getValueReq}>
                                 <option value="1">One</option>
                                 <option value="2" defaultValue>Two</option>
                                 <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="city">المدينة</label>
                            <select className='w-100 form-select form-select-sm' name='city' id='city' onChange={getValueReq}>
                                 <option value="Riyadh">Riyadh</option>
                                 <option value="Jeddah">Jeddah</option>
                                 <option value="Dammam" defaultValue>Dammam</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="neighborhood">الحي</label>
                            <select className='w-100 form-select form-select-sm' name='neighborhood' id='neighborhood' onChange={getValueReq}>
                                 <option value="1" selected>One</option>
                                 <option value="2">Two</option>
                                 <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-9">
                            <label htmlFor="address">العنوان التفصيلي</label>
                            <input type="text" name="address" id="address" onChange={getValueReq} className='form-control'/>
                        </div>
                        <div className="col-md-8 w-50 mb-2" style={{height:'350px'}}>
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
                         }}>
                        </GoogleMapReact>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="contracts"> عقود التأجير</label>
                            <input type='file' name="contracts" id="contracts" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="sign">صورة توقيع العميل</label>
                            <input type='file' name="sign" id="sign" className='w-100 form-control'/>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="terms_and_conditions">وثيقة الشروط والأحكام</label>
                            <input type='file' name="terms_and_conditions" id="terms_and_conditions" className='w-100 form-control' onChange={getValueReq}/>
                        </div>
                        <div className="col-md-4 mt-3">
                            <button type="submit" className='w-100 btn btn-dark' onSubmit={submitFormReq}><Link to={'/details'} style={{textDecoration:'none', color:'white'}}>إرسال الطلب</Link></button>
                        </div>
                        <div className="col-md-4 mt-3">
                            <button type='reset' className='w-100 btn btn-light'>إلغاء</button>
                        </div>
                        
                    </div>
                
                </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default New