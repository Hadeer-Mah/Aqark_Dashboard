import React, { createContext, useState } from 'react'
import { Navigate } from 'react-router';

export const ReqContext = createContext();
const ReqProvider = ({children}) => {
    const [userData, setUserData] = useState(null)
    const [userReq, setUserReq] = useState({
        "full_name":"",
      "installment_number": "",
      "installment_image": "",
      "building_number": "",
      "telep1":"",
      "telep2":"",
      "city1":"",
      "city":"",
      "nationalId":"",
      "building_images": [
      ],
      "construction_licence": "",
      "region": "",
      "neighborhood": "",
      "address": "",
      "sketch": "",
      "contracts": "",
      "terms_and_conditions": "",
      "status": "Approved",
      "latitude": 0,
      "longitude": 0
        });
        let getValueReq=(e)=>{
          let myUserReq={...userReq};
          myUserReq[e.target.name] = e.target.value;
          setUserReq(myUserReq);
          console.log(userReq);
        }
      
        let submitFormReq=(e)=>{
          e.preventDefault();
          
      } 
  return <ReqContext.Provider value={{ userReq, setUserReq, getValueReq }}>{children}</ReqContext.Provider>;
}

export default ReqProvider