import React, { createContext, useState } from 'react'
import axiosInstance from './axiosInstance';

export const ReqContext = createContext();
const ReqProvider = ({children}) => {
  const [showSidebar, setShowSidebar] = useState(false)


  // post data
  const [tableList, setTableList] = useState([])

    const [userReq, setUserReq] = useState({
      "installment_number": "string",
      "installment_image": "string",
      "building_number": "string",
      "building_images": [
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
   
    
        let getValueReq=(e)=>{
          let myUserReq={...userReq};
          myUserReq[e.target.name] = e.target.value;
          setUserReq(myUserReq);
          console.log(userReq);
        }
        async function sendData() {
          try {
            const {data}= await axiosInstance.post({
              url:'api/reuqests/',
              data: userReq
            }
            
          
          )
          console.log("success");
          console.log(data);
           
          }catch(err){
            console.log(err);
          }
        } 
      
        let submitFormReq=(e)=>{
          e.preventDefault();
          
      } 

      // request data

  async function getData() {
    try {
      const {data}= await axiosInstance.get( 'api/reuqests/me/'
      
    
    )
    console.log(data);
    setTableList(data)
    


     
    }catch(err){
      console.log(err);
    }
  } 



  return <ReqContext.Provider value={{ userReq, setUserReq, getValueReq, submitFormReq, sendData, tableList, getData, setTableList, showSidebar, setShowSidebar }}>{children}</ReqContext.Provider>;
}

export default ReqProvider