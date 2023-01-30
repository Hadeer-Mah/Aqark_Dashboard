import { Cached } from '@mui/icons-material';
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {
  //   
  const [user, setUser] = useState({
    'first_name':'',
    'last_name':'',
    'email':'',
    'age':0,
    'password':''
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
      console.log(validation.error.details);
      
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
    let {data} = await axios.post('https://route-movies-api.vercel.app/signup', user);
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
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(18).max(30),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.pattern.base":"invalid password pattern, please use(english characters, numbers, symbols)"
      }),
    })
    return scheme.validate(user, {abortEarly:false});
  }
  return (
    <>
    <div className="register bg-dark text-white">
    <div className="container">
      <div className="row w-75 mx-auto login  d-flex justify-content-center align-items-center vh-100">       
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <form onSubmit={submitForm}>
          <div className="form-group w-100 text-center">
            <h4 className='pb-2'>Create My Account!</h4>
            {errorMsg? <div className="alert alert-danger">{errorMsg}</div>: ''}
            <div className="row mb-2">
              <div className="col-md-6">
              <input type="text" className={errorList.filter((ele) => ele.context.label=='first_name')[0]? 'border border-danger form-control':'form-control'} placeholder='First Name' name='first_name' onChange={getValue}/>
              {errorList.filter((ele) => ele.context.label=='first_name')[0]?.message}
              </div>
              <div className="col-md-6">
              <input type="text" className={errorList.filter((ele) => ele.context.label=='last_name')[0]? 'border border-danger form-control':'form-control'} placeholder='Last Name' name='last_name' onChange={getValue}/>
              {errorList.filter((ele) => ele.context.label=='last_name')[0]?.message}
              </div>
            </div>
            <div className="mb-2">
            <input type="email" className={errorList.filter((ele) => ele.context.label=='email')[0]? 'border border-danger form-control':'form-control'} placeholder='Email' name='email' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='email')[0]?.message}
            </div>
            <div className="mb-2">
            <input type="number" className={errorList.filter((ele) => ele.context.label=='age')[0]? 'border border-danger form-control':'form-control'} placeholder='Age' name='age' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='age')[0]?.message}
            </div>
            <div className="mb-2">
            <input type="password" className={errorList.filter((ele) => ele.context.label=='password')[0]? 'border border-danger form-control':'form-control'} placeholder='Password' name='password' onChange={getValue}/>
            {errorList.filter((ele) => ele.context.label=='password')[0]?.message}
            </div>
            <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'> {loadBtn? <Cached/>: 'Create Account'}</button>
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