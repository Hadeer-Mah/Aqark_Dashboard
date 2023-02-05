import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axiosInstance from '../../contexts/axiosInstance';



const PasByEmail = () => {
    const [errorMsg, seterrorMsg] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useState({
        'email':'',
      })
      let getValue=(e)=>{
        let myUser={...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
      }


    async function pasRequest() {
        
try {const {data}= await axiosInstance.post('api/users/request-reset-password/', user )
console.log("response",data);
alert('Email sent successfuly')

}catch(err){
    console.log(err);
}
     
      }
      let submitForm=(e)=>{
        e.preventDefault();   
        pasRequest();
      }
    
  return (
    <>
    <div className="register bg-dark text-white">
    <div className="container">
      <div className="row w-75 mx-auto login d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={submitForm}>
          <div className="form-group w-100 text-center">
            <h4 className='pb-2'>New Password</h4>
            {errorMsg? <div className="alert alert-danger">{errorMsg}</div>: ''}
            <div className="mb-2">
            <input type="text" className='form-control' placeholder='Email' name='email' onChange={getValue}/>
            </div>
            
            <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'>Request New Password</button>
            <hr/>
          </div>
          </form>
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default PasByEmail