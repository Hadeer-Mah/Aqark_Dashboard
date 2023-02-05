import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import GoogleMapReact from "google-map-react";
import { AddCircle } from "@mui/icons-material";
import axiosInstance from "../../contexts/axiosInstance";
import { useNavigate } from "react-router";
import { ReqContext } from "../../contexts/ReqContext";
import { useMediaQuery } from "@mui/material";

const New = () => {
const {showSidebar} = useContext(ReqContext)
const isDesktop = useMediaQuery('(min-width:1000px)');

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [licence, setLicence] = useState(null)
  const [contracts, setContracts] = useState(null)
  const [terms, setTerms] = useState(null)
  const [sketch, setSketch] = useState(null)

  const [buildImgs, setBuildImgs] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [installment, setInstallment] = useState(null)
  const [bounds, setBounds] = useState({});
  const [userReq, setUserReq] = useState({
    installment_number: "",
    installment_image: "",
    building_number: "",

    construction_licence: "",
    region: "",
    city: "",
    neighborhood: "",
    address: "",
    sketch: "",
    contracts: "",
    terms_and_conditions: "",
    others: "",
    status: 0,
    latitude: 0,
    longitude: 0,
  });

  console.log("user request", userReq);
  console.log(buildImgs);
  let getValueReq = (e) => {
    let myUserReq = { ...userReq };
    myUserReq[e.target.name] = e.target.value;

    setUserReq(myUserReq);
   
    console.log(userReq);
  };
  console.log(buildImgs);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  function handleLicence(e) {
    setLicence(e.target.files[0])

  }
  function handleContracts(e) {
    
    setContracts(e.target.files[0])

  }
  function handleInstallment(e) {   
    setInstallment(e.target.files[0])
  }
  function handleTerms(e) {   
    setTerms(e.target.files[0])
  }
  function handleSketch(e) {   
    setSketch(e.target.files[0])
  }


  function handleChange(e) {
    setBuildImgs(e.target.files);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    Array.from(buildImgs).forEach((item) => {
      console.log("apppending  image now  ", item);
      formData.append("building_images", item);
    });

    Object.keys(userReq).forEach((userKey) => {
      formData.append(userKey, userReq[userKey]);
    });

    formData.append('construction_licence', licence);
    formData.append('contracts', contracts);
    formData.append('installment_image', installment);
    formData.append('sketch', sketch);
    formData.append('terms_and_conditions', terms);

    




    try {
      const { data } = await axiosInstance.post("api/reuqests/", formData);
      console.log("success");
      console.log(data);
      alert('Request Added Successfuly')
      navigate('/list')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="new">
      {isDesktop?<Sidebar/>:''}
      {showSidebar? <Sidebar/>:''}
        <div className={isDesktop? 'newContainer': 'newContainer mobile'}>
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
              طلب تقييم جديد
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
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="telep1">رقم الهاتف1</label>
                    <input
                      type="tel"
                      name="phone_1"
                      id="telep1"
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
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="date1">التاريخ الميلادي</label>
                    <input
                      type="date"
                      name="date1"
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
                      name="city1"
                      id="city1"
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
                      onChange={handleLicence}
                      required
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
                      onChange={(e) =>
                         setImage(e.target.files[0])
                        }
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
                      onChange={handleInstallment}
                      required
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="docFile">ملف الكروكي</label>
                    <input
                      type="file"
                      name="sketch"
                      id="docFile"
                      className="w-100 form-control"
                      onChange={handleSketch}
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
                      onChange={handleChange}
                      required
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
                      id="region"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="city">المدينة</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="city"
                      id="city"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="neighborhood">الحي</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="neighborhood"
                      id="neighborhood"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-9">
                    <label htmlFor="address">العنوان التفصيلي</label>
                    <input
                      type="text"
                      name="address"
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
                      onChange={handleContracts}
                      required
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="sign">صورة توقيع العميل</label>
                    <input
                      type="file"
                      name="sign"
                      id="sign"
                      className="w-100 form-control"
                      onChange={getValueReq}
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
                      onChange={handleTerms}
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

export default New;
