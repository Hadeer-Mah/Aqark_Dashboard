import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import GoogleMapReact from "google-map-react";
import { ReqContext } from "../../contexts/ReqContext";
import { useParams } from "react-router";
import axiosInstance from "../../contexts/axiosInstance";
import Carousel from "react-bootstrap/Carousel";
import { IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { Download } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Details = () => {
  const {showSidebar} = useContext(ReqContext)
  const isDesktop = useMediaQuery('(min-width:1000px)');

  const { id } = useParams();
  const { userReq } = useContext(ReqContext);
  const [userDetails, setUserDetails] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
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
   
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <>
      <div className="details">
      {isDesktop?<Sidebar/>:''}
      {showSidebar? <Sidebar/>:''}
      <div className={isDesktop? 'detailsContainer': 'detailsContainer mobile'}>
        <Navbar/>
      <div
          className='container'
        >
          <div className="row">
            <div className="col-lg-7 right pt-4">
              <div>
                <div className="d-flex justify-content-between mb-4">
                <p className="fs-4 fw-bold">تفاصيل طلب التقديم</p>
                <div className="d-flex justify-content-between">
                <div className={`status ${userDetails?.status == 0? 'Pending':'Approved'} text-center d-flex align-items-center px-3`}>{userDetails?.status == 0 ? "طلب معلق": 'طلب مغلق'}</div>

                <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
            textAlign:'center'
          },
        }}
      >
          <MenuItem onClick={handleClose}>
          <Link to={'/new'} style={{color:'gray', textDecoration:'none'}}>طلب جديد</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Link to={`/list/edit/${userDetails.id}`} style={{color:'gray', textDecoration:'none'}}>تعديل</Link>
          </MenuItem>
          
      </Menu>
                </div>

                </div>
                <div >
                <Carousel>
                  {userDetails?.building_images?.map((img, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          style={{height:'300px', objectFit: 'cover', borderRadius:'16px'}}
                          src={`https://qaym-3kark2-ziadsindion.pythonanywhere.com${img.image}`}

                          alt=""
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>

                </div>
                

              </div>
              <div className="row d-flex justify-content-between mt-3">
                <div className="rightList col-lg-6">
                  <div className="mb-4">
                    <span>رقم الطلب</span>
                    <br />
                    <p>{"0001"}</p>
                  </div>
                  <div className="mb-4">
              <span>رقم الهاتف</span><br/>
              <p>{userDetails?.owner?.phone_1? userDetails?.owner?.phone_1:""}</p>
              </div>
                  <div className="mb-4">
                    <span>التاريخ الميلادي</span>
                    <br />
                    <p>{userDetails.created ? userDetails.created : ""}</p>
                  </div>
                  <div className="mb-4">
              <span>الرقم القومي</span><br/>
              <p>{userDetails?.owner?.identification_number? userDetails?.owner?.identification_number:""}</p>
              </div>

                  <div className="mb-4">
                    <span>رقم العقار</span>
                    <br />

                    <p>
                      {userDetails?.building_number
                        ? userDetails?.building_number
                        : ""}
                    </p>
                  </div>

                  <div className="mb-4">
                    <span>ملف رخصة البناء</span>
                    <br/>
                    {userDetails.construction_licence?
                    <>
                    <a
                      href={userDetails.construction_licence}
                      download
                      style={{fontSize: '15px'}}
                    >
                      اضغط لتحميل الملف
                      <Download/>
                    </a>
                    </>:""}
                  </div>
                </div>
                <div className="leftList col-lg-6">
                  <div className="mb-4">
                    <span>اسم المالك</span>
                    <br />
                    <p>
                      {userDetails?.owner?.username
                        ? userDetails?.owner?.username
                        : ""}
                    </p>
                  </div>

                  <div className="mb-4">
                    <span>صورة الرقم القومي</span>
                    <br />
                    <img
                        className="w-75"
                        src={userDetails?.owner?.identification_image}
                        alt=""
                      />
                  </div>
                  <div className="mb-4">
                    <span>رقم الصك</span>
                    <br />
                    <p>
                      {userDetails.installment_number
                        ? userDetails?.installment_number
                        : ""}
                    </p>
                  </div>
                  <div className="mb-4">
                    <span>ملف الكروكي</span>
                    <br />
                    {userDetails.sketch?
                    <>
                    <a
                      href={userDetails.sketch}
                      download
                      style={{fontSize: '15px'}}
                    >
                      اضغط لتحميل الملف
                      <Download/>
                    </a>
                    </>:""}
                  </div>
                  
                  <div className="mb-4">
                    <span>عقود التأجير</span>
                    <br />
                    {userDetails.contracts?
                    <>
                    <a
                      href={userDetails.contracts}
                      download
                      style={{fontSize: '15px'}}
                    >
                      اضغط لتحميل الملف
                      <Download/>
                    </a>
                    </>:""}
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 left d-flex flex-column justify-content-center ps-2 pt-5">
              <div className="mb-0 pt-2">
                <span>اسم المحافظة</span>
                <br />
                <p>{userDetails.city ? userDetails.city : ""}</p>
                <br />
              </div>
              <div className="mb-3">
                <span>اسم الحي</span>
                <br />
                <p>
                  {userDetails?.neighborhood ? userDetails?.neighborhood : ""}
                </p>
              </div>

              <div className="mb-3">
                <span>اسم المنطقة</span>
                <p>{userDetails.region ? userDetails?.region : ""}</p>
              </div>

              <div className="mb-3">
                <span>العنوان التفصيلي</span>
                <p>{userDetails.address ? userDetails.address : ""}</p>
              </div>

              <div className="w-100" style={{ height: "350px" }}>
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
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                  }}
                ></GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      </div>
    </>
  );
};

export default Details;
