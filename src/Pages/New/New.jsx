import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [sign, setSign] = useState(null)


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
   function redActivation(e) {
    e.currentTarget.classList.add('red');
    
  }
   function greenActivation(e) {
    e.currentTarget.classList.add('green');
    
  }

 
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
    formData.append('identification_image', image);
    formData.append('sign', sign);


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
          <div className="container">
            <div className="row">
            <div className="formContainer col-md-8 order-last order-md-first">
            <p
              style={{
                marginRight: "20px",
                fontSize: "20px",
                marginTop: "30px",
              }}
            >
              <AddCircle />
              ?????? ?????????? ????????
            </p>
            <div className="container pb-5 pt-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-8" id="reqInfo">
                    <label htmlFor="username">?????? ???????????? ??????????????</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="telep1">?????? ????????????1</label>
                    <input
                      type="tel"
                      name="phone_1"
                      id="telep1"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="telep2">?????? ???????????? 2</label>
                    <input
                      type="tel"
                      name="phone_2"
                      id="telep2"
                      className="w-100 form-control"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="date1">?????????????? ????????????????</label>
                    <input
                      type='date'
                      name="created"
                      id="date1"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <hr className="my-4"/>
                  <div className="col-md-4" id="personalInfo">
                    <label htmlFor="city1">?????? ??????????????</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="city1"
                      id="city1"
                      onChange={getValueReq}
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="nationalId">?????????? ????????????</label>
                    <input
                      type="number"
                      name="identification_number"
                      id="nationalId"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-9 d-flex">
                    <div>
                    <label htmlFor="nationalImg">???????? ?????????? ?????????? ????????????</label>
                    <input
                      type="file"
                      name="identification_image"
                      id="nationalImg"
                      className="w-100 form-control"
                      onChange={(e) =>
                         setImage(e.target.files[0])
                        }
                        required
                    />
                    </div>
                    
                    <div className="w-25 h-25 me-4">
                      <img
                        className="w-100 rounded-3"
                        src={image ? URL.createObjectURL(image) : ""}
                        alt=""
                      />
                    </div>
                  </div>
                  <hr className="my-4" id="buildInfo"/>
                  <div className="col-md-6">
                    <label htmlFor="building_number">?????? ????????????</label>
                    <input
                      type="number"
                      name="building_number"
                      id="building_number"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="installment_number">?????? ????????</label>
                    <input
                      type="number"
                      name="installment_number"
                      id="installment_number"
                      className="w-100 form-control"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-9 d-flex" id="files">
                    <div>
                      
                      
                    <label htmlFor="installment_image">????????????????</label>
                    <input
                      type="file"
                      name="installment_image"
                      id="installment_image"
                      className="w-100 form-control "
                      onChange={handleInstallment}
                      required
                    />

                    </div>
                    
                    <div className="w-25 h-25 me-4">
                      <img
                        className="w-100 rounded-3"
                        src={installment ? URL.createObjectURL(installment) : ""}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-9 d-flex">
                    <div>
                    <label htmlFor="construction_licence"> ???????? ????????????</label>
                    <input
                      type="file"
                      name="construction_licence"
                      id="construction_licence"
                      className="w-100 form-control"
                      onChange={handleLicence}
                      required
                    />

                    </div>
                    
                    <div className="w-25 h-25 me-4">
                      <img
                        className="w-100 rounded-3"
                        src={licence ? URL.createObjectURL(licence) : ""}
                        alt=""
                      />
                    </div>
                  </div>
                  
                  
                  
                  <div className="col-md-7">
                    <label htmlFor="docFile">?????? ??????????????</label>
                    <input
                      type="file"
                      name="sketch"
                      id="docFile"
                      className="w-100 form-control"
                      onChange={handleSketch}
                      required
                    />
                  </div>
                  <div className="col-md-9">
                    <label htmlFor="building_images">?????? ????????????</label>
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
                  <hr className="my-4" id="buildSite"/>
                  <div className="col-md-4">
                    <label htmlFor="region">??????????????</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="region"
                      id="region"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="city">??????????????</label>
                    <input
                      type="text"
                      className="w-100 form-select form-select-sm"
                      name="city"
                      id="city"
                      onChange={getValueReq}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="neighborhood">????????</label>
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
                    <label htmlFor="address">?????????????? ????????????????</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      onChange={getValueReq}
                      className="form-control"
                      required
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
                    <label htmlFor="contracts"> ???????? ??????????????</label>
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
                    <label htmlFor="sign">???????? ?????????? ????????????</label>
                    <input
                      type="file"
                      name="sign"
                      id="sign"
                      className="w-100 form-control"
                      onChange={(e) =>
                        setSign(e.target.files[0])
                       }
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="terms_and_conditions">
                      ?????????? ???????????? ????????????????
                    </label>
                    <input
                      type="file"
                      name="terms_and_conditions"
                      id="terms_and_conditions"
                      className="w-100 form-control"
                      onChange={handleTerms}
                    />
                  </div>
                  <div className="col-md-3 mt-3" id="confirm">
                    <button className="w-100 btn btn-dark" type="submit">
                      ?????????? ??????????
                    </button>
                  </div>
                  <div className="col-md-3 mt-3">
                    <button type="reset" className="w-100 btn btn-light">
                      ??????????
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3 pt-4 mt-3">
            <p className="fw-bold fs-5">?????????? ?????? ??????????????</p>
            <div className=" d-flex justify-content-center me-4">
            <nav className="navmenu ">
              <ul className="position-relative">
              <li><a href="#reqInfo"  onClick={greenActivation}>???????????? ??????????</a></li>
              <li><a href="#personalInfo" onClick={redActivation}>???????????? ????????????</a></li>
              <li><a href="#buildInfo" onClick={greenActivation}>???????????? ???????????? ????????????????</a></li>
              <li><a href="#files" onClick={redActivation}>???????????? ????????????????</a></li>
              <li><a href="#buildSite" onClick={greenActivation}>???????????? ???????? ????????????</a></li>
              <li><a href="#confirm" onClick={redActivation}>?????????? ??????????</a></li>

              </ul>
            </nav>
            </div>
          </div>

            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default New;
