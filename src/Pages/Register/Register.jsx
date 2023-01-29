import { AutoModeOutlined } from '@mui/icons-material';
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        'name':'',
        'username':'',
        'email':'',
        'phone_1':'',
        'password':'',
        'password_2':'',
        // 'is_verified': true
      })
      const [errorMsg, seterrorMsg] = useState('');
      const [loadBtn, setloadBtn] = useState(false);
      const [errorList, setErrorList] = useState([])
      let navigate = useNavigate();
      let submitForm=(e)=>{
        e.preventDefault();   
        setloadBtn(true);
        let validation = validateForm();
        if (validation.error) {
          setErrorList(validation.error.details);
          setloadBtn(false);
          
        } else {
          setErrorList([]);
            apiCheck();
        }
      }
      let getValue=(e)=>{
        let myUser={...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
      }
      async function apiCheck() {
        let {data} = await axios.post('https://qaym-3kark2-ziadsindion.pythonanywhere.com/api/schema/qaym-3kark2-ziadsindion.pythonanywhere.com/api/users/register/',
        {headers: {
             'accept': 'application/json',
           'Content-Type': 'application/json',
           'X-CSRFTOKEN': ' r0RTGoYtrBV3gVUegx2KFBf2AB94CY7uXXSbutwnJWqkbIOPrMIMI3gZKIq1qPh7' 
        }}
        , user);
        if (data.message === 'success') {
          setloadBtn(false);
          seterrorMsg(null);
          navigate('/login');
          
        } else {
          setloadBtn(false);
          seterrorMsg(data.message);
        }
      }
      function validateForm() {
        let scheme = Joi.object({
          name: Joi.string().alphanum().min(3).max(10).required(),
          username: Joi.string().alphanum().min(3).max(10).required(),
          phone_1: Joi.string().alphanum().min(12).max(18),
          email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          password_2:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        })
        return scheme.validate(user, {abortEarly:false});
      }
  return (
    <>
    <div className="register bg-dark text-white">
    <div className="container">
      <div className="row w-75 mx-auto logind-flex justify-content-center align-items-center vh-100">
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <form onSubmit={submitForm}>
          <div className="form-group w-100 text-center">
            <h4 className='pb-2'>Create My Account!</h4>
            {errorMsg? <div className="alert alert-danger">{errorMsg}</div>: ''}
            <div className="row mb-2">
              <div className="col-md-6">
              <input type="text" className={errorList.filter((ele) => ele.context.label=='name')[0]? 'border border-danger form-control':'form-control'} placeholder='Name' name='name' onChange={getValue}/>
              {errorList.filter((ele) => ele.context.label=='name')[0]?.message}
              </div>
              <div className="col-md-6">
              <input type="text" className={errorList.filter((ele) => ele.context.label=='username')[0]? 'border border-danger form-control':'form-control'} placeholder='User Name' name='username' onChange={getValue}/>
              {errorList.filter((ele) => ele.context.label=='userame')[0]?.message}
              </div>
            </div>
            <div className="mb-2">
            <input type="email" className={errorList.filter((ele) => ele.context.label=='email')[0]? 'border border-danger form-control':'form-control'} placeholder='Email' name='email' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='email')[0]?.message}
            </div>
            <div className="mb-2">
            <input type="tel" className={errorList.filter((ele) => ele.context.label=='phone_1')[0]? 'border border-danger form-control':'form-control'} placeholder='phone' name='phone_1' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='phone_1')[0]?.message}
            </div>
            <div className="mb-2">
            <input type="password" className={errorList.filter((ele) => ele.context.label=='password')[0]? 'border border-danger form-control':'form-control'} placeholder='Password' name='password' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='password')[0]?.message}
            </div>
            <div className="mb-2">
            <input type="password" className={errorList.filter((ele) => ele.context.label=='password_2')[0]? 'border border-danger form-control':'form-control'} placeholder='Password' name='password_2' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='password_2')[0]?.message}
            </div>
            <button type='submit' className='w-100 text-white border-0 py-2 rounded-2'  onSubmit={submitForm}> {loadBtn? <AutoModeOutlined/>: 'Create Account'}</button>
            <hr/>
            <p>Already a member? <Link to="/login" style={{color:"#ef074b"}}>Log in</Link></p>
          </div>
          </form>
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Register