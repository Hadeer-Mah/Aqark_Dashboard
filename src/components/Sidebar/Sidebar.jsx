import {
  AddCircleOutlineRounded,
  BarChartOutlined,
  Business,
  ExitToAppOutlined,
  LockClockRounded,
  Menu,
  Person,
  QuestionMark,
  Settings,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("removetoken");

    navigate(0);
  }

  

  return (
    <>
      <div className="sidebar d-flex flex-column justify-content-between">
        <ul className="list">
        <li className="listLogo mb-4 pb-4">
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <div className="d-flex align-items-start">
                <Business className="icon" />
                <div className="d-flex flex-column">
                  <p style={{ fontSize: "17px", marginBottom: "0" }}>
                    قيم عقارك
                  </p>
                  <span style={{ fontSize: "14px" }}>
                    لتقييم الخدمات العقارية
                  </span>
                </div>
              </div>
          </Link>
          </li>
          <li>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            
              <BarChartOutlined className="icon" />
              <span>الاحصائيات</span>
            
          </Link>
          </li>
          <li>
            <Link
              to={"/new"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <AddCircleOutlineRounded className="icon" />
              <span>إضافة طلب</span>
            </Link>
          </li>
          <li>
          <Link to={"/list"} style={{ textDecoration: "none", color: "white" }}>
            
              <Menu className="icon" />
              <span>طلباتي</span>
            
          </Link>
          </li>
          <li>
            <Person className="icon" />
            <span>الملف الشخصي</span>
          </li>

          <li>
            <Settings className="icon" />
            <span>الاعدادات العامة</span>
          </li>
          <li>
            <LockClockRounded className="icon" />
            <span>اعدادات الأمان</span>
          </li>
          <li className="mb-5">
            <QuestionMark className="icon" />
            <span>الدعم التقني</span>
          </li>
        </ul>
        <div>
          <div
            onClick={logoutHandler}
            style={{ cursor: "pointer" }}
            className="d-flex"
          >
            <ExitToAppOutlined className="icon" />
            <span>تسجيل الخروج</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
