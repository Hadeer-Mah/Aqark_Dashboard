import { AddCircle } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axiosInstance from "../../contexts/axiosInstance";
import { ReqContext } from "../../contexts/ReqContext";
import GoogleMapReact from "google-map-react";
import { Navigate, useNavigate, useParams } from "react-router";
import { object } from "joi";
import { useMediaQuery } from "@mui/material";

const Edit = () => {
  const { showSidebar } = useContext(ReqContext);
  const isDesktop = useMediaQuery("(min-width:1000px)");
  const [coordinates, setCoordinates] = useState({});
  const [buildImgs, setBuildImgs] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [licence, setLicence] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [installment, setInstallment] = useState(null);
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const [bounds, setBounds] = useState({});
  const { id } = useParams();
  let { owner } = userDetails;
  
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

 

  function getValueReq(e) {
    setUserDetails({ [e.target.name]: e.target.value });

    
  }

  function getuserName(e) {
    setUserDetails({
      owner: { [e.target.name]: e.target.value },
    });

    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    sendData(id);
  }

  async function sendData(id) {
    
   
    try {
      const { data } = await axiosInstance.patch(
        `api/reuqests/${id}/`,
        userDetails
      );
      console.log("success");
      console.log(data);
      alert("User Updated");
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }
  async function getDetails(id) {
    try {
      const { data } = await axiosInstance.get(`api/reuqests/${id}/`);

      console.log("success");
      console.log(data);
      setUserDetails(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getDetails(id);
  }, []);

  return (
    <>
      <div className="new">
        {isDesktop ? <Sidebar /> : ""}
        {showSidebar ? <Sidebar /> : ""}
        <div className={isDesktop ? "newContainer" : "newContainer mobile"}>
          <Navbar />
          <div className="formContainer">
            <p
              style={{
                marginRight: "20px",
                fontSize: "30px",
                marginTop: "30px",
              }}
            >
              <AddCircle />
              تعديل الطلب
            </p>
            <div className="container pb-5 pt-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-5">
                    <label htmlFor="username">اسم المالك بالكامل</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="w-100 form-control"
                      value={userDetails?.owner?.username}
                      onChange={getuserName}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="telep1">رقم الهاتف1</label>
                    <input
                      type="tel"
                      name="phone_1"
                      id="telep1"
                      value={userDetails?.owner?.phone_1}
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="telep2">رقم الهاتف 2</label>
                    <input
                      type="tel"
                      name="phone_2"
                      id="telep2"
                      value={userDetails?.owner?.phone_2}
                      className="w-100 form-control"
                      onChange={getuserName}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="date1">التاريخ الميلادي</label>
                    <input
                      type="date"
                      name="created"
                      value={userDetails?.created}
                      id="date1"
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="city1">بلد الإقامة</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="city"
                      id="city1"
                      value={userDetails.city}
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="construction_licence"> صورة الرخصة</label>
                    <input
                      type="file"
                      name="construction_licence"
                      id="construction_licence"
                      className="w-100 form-control"
                      files={userDetails?.construction_licence}
                      // onChange={handleLicence}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="nationalId">الرقم القومي</label>
                    <input
                      type="number"
                      name="nationalId"
                      id="nationalId"
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="nationalImg">صورة بطاقة الرقم القومي</label>
                    <input
                      type="file"
                      name="nationalImg"
                      id="nationalImg"
                      className="w-100 form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div className="w-25 h-25">
                      <img
                        className="w-100"
                        src={image ? URL.createObjectURL(image) : ""}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="building_number">رقم العقار</label>
                    <input
                      type="number"
                      name="building_number"
                      id="building_number"
                      value={userDetails?.building_number}
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="installment_number">رقم الصك</label>
                    <input
                      type="number"
                      name="installment_number"
                      id="installment_number"
                      value={userDetails?.installment_number}
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="installment_image">صورةالصك</label>
                    <input
                      type="file"
                      name="installment_image"
                      id="installment_image"
                      className="w-100 form-control"
                      // onChange={handleInstallment}
                      
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="docFile">ملف الكروكي</label>
                    <input
                      type="file"
                      name="sketch"
                      id="docFile"
                      className="w-100 form-control"
                    />
                  </div>
                  <div className="col-md-9">
                    <label htmlFor="building_images">صور العقار</label>
                    <input
                      type="file"
                      name="building_images"
                      id="building_images"
                      multiple
                      className="w-100 form-control"
                      // onChange={handleChange}
                    />
                    {buildImgs &&
                      Array.from(buildImgs).map((img, index) => {
                        return (
                          <span key={index}>
                            <img
                              src={URL.createObjectURL(img)}
                              alt=""
                              width={150}
                              height={150}
                              style={{ padding: "10px", objectFit: "cover" }}
                            />
                          </span>
                        );
                      })}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="region">المنطقة</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="region"
                      value={userDetails?.region}
                      id="region"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="city">المدينة</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="city"
                      id="city"
                      value={userDetails?.city}
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="neighborhood">الحي</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="neighborhood"
                      id="neighborhood"
                      value={userDetails.neighborhood}
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-9">
                    <label htmlFor="address">العنوان التفصيلي</label>
                    <input
                      type="text"
                      name="address"
                      value={userDetails?.address}
                      id="address"
                      onChange={getValueReq}
                      className="form-control"
                    />
                  </div>
                  <div
                    className="col-md-8 w-50 mb-2"
                    style={{ height: "350px" }}
                  >
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyCjx0VcQOSzfyAtO--jUTcRIHtwnjT76fQ",
                      }}
                      defaultCenter={coordinates}
                      center={coordinates}
                      defaultZoom={14}
                      margin={[50, 50, 50, 50]}
                      options={""}
                      onChange={(e) => {
                        setCoordinates({
                          lat: e.center.lat,
                          lng: e.center.lng,
                        });
                        setBounds({
                          ne: e.marginBounds.ne,
                          sw: e.marginBounds.sw,
                        });
                      }}
                    ></GoogleMapReact>
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="contracts"> عقود التأجير</label>
                    <input
                      type="file"
                      name="contracts"
                      id="contracts"
                      className="w-100 form-control"
                      // onChange={handleContracts}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="sign">صورة توقيع العميل</label>
                    <input
                      type="file"
                      name="sign"
                      id="sign"
                      className="w-100 form-control"
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="terms_and_conditions">
                      وثيقة الشروط والأحكام
                    </label>
                    <input
                      type="file"
                      name="terms_and_conditions"
                      id="terms_and_conditions"
                      className="w-100 form-control"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <button className="w-100 btn btn-dark" type="submit">
                      إرسال الطلب
                    </button>
                  </div>
                  <div className="col-md-3 mt-3">
                    <button type="reset" className="w-100 btn btn-light">
                      إلغاء
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
