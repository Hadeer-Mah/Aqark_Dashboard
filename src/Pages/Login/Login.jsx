import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { Cached } from '@mui/icons-material';
import axiosInstance from '../../contexts/axiosInstance';
import jwtDecode from 'jwt-decode';

const Login = () => {
    const [user, setUser] = useState({
        'username':'',
        'password':''
      })
      const [errorMsg, seterrorMsg] = useState('');
      const [loadBtn, setloadBtn] = useState(false);
      let navigate = useNavigate();
      let submitForm=(e)=>{
        e.preventDefault();   
        setloadBtn(true);
        apiCheck();
       
      }
      let getValue=(e)=>{
        let myUser={...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
      }
      async function apiCheck() {
        

        
try {const {data}= await axiosInstance({
  url:'api/users/login/',
  method:'post',
  data: user 
}
)
setloadBtn(false)
console.log("login response",data);
 let encodedAccess = data.access
 console.log(encodedAccess);
 let decodedAccess = jwtDecode(encodedAccess);
 let stringifyAccess = JSON.stringify(decodedAccess)
 let encodedRefresh = data.refresh
 let decodedRefresh = jwtDecode(encodedRefresh);
 let stringifyRefresh = JSON.stringify(decodedRefresh)

 
 localStorage.setItem("accesstoken", encodedAccess);
 localStorage.setItem("refreshtoken", encodedRefresh);
 navigate('/home')
}catch(err){
  seterrorMsg(err.data.message)
  console.log(err);
}
      
       
          
     
      }
    
    
     
      return (
        <>
        <div className="register bg-dark text-white">
        <div className="container">
          <div className="row w-75 mx-auto login d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <form onSubmit={submitForm}>
              <div className="form-group w-100 text-center">
                <h4 className='pb-2'>Log in to Aqark</h4>
                {errorMsg? <div className="alert alert-danger">{errorMsg}</div>: ''}
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='user name' name='username' onChange={getValue}/>
               
                </div>
                <div className="mb-2">
                <input type="password" className='form-control' placeholder='Password' name='password' onChange={getValue}/>
                </div>
                <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'> {loadBtn? <Cached/>: 'Login'}</button>
                <hr/>
                <Link to='/request' style={{color:"#ef074b"}}>?Forgot Password</Link>
              <p>Not a member yet? <Link to="/register" style={{color:"#ef074b"}}>Create account</Link></p>
              </div>
              </form>
              
            </div>
          </div>
        </div>
        </div>
        </>
      )
}

export default Login