import { Cached } from '@mui/icons-material';

import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axiosInstance from '../../contexts/axiosInstance';

const Register = () => {
  //   
  const [user, setUser] = useState({
    
      "name": "",
      "username": "",
      "email": "",
      "phone_1": "",
      "phone_2": "",
      "password": "",
      "password_2": "",
      "gender": 1,
      "identification_type": "",
      "identification_number": "2742238008",
      "identification_image": "",
      "user_type": 1,
      "sign": "",
      "personal_image": "",
      "country": ""
      
    }
  )
  const [sign, setSign] = useState(null)
  const [personalImg, setPersonalImg] = useState(null)
  const [identification, setIdentification] = useState(null)
  function handleIdentifiction(e) {   
    setIdentification(e.target.files[0])
  
  }
  function handlePersonalImg(e) {   
    setPersonalImg(e.target.files[0])
  
  }
  function handleSign(e) {   
    setSign(e.target.files[0])
  
  }

  const [errorMsg, seterrorMsg] = useState('');
  const [loadBtn, setloadBtn] = useState(false);
  let navigate = useNavigate();
  async function submitForm(e) {
    let formData = new FormData()
    e.preventDefault();   
    Object.keys(user).forEach((userKey) => {
      formData.append(userKey, user[userKey]);
    });

    formData.append('identification_image', identification);
    formData.append('sign', sign);
    formData.append('personal_image', personalImg);
    setloadBtn(true)
    try {
      const { data } = await axiosInstance.post("api/users/register/", formData);
      console.log("success");
      console.log(data);
      setloadBtn(false);

      navigate('/login')
     
    } catch (err) {
      setloadBtn(false);
      console.log(err);
      seterrorMsg(err.data.message);

    }
  }
   
  
  let getValue=(e)=>{
    let myUser={...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
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
              <div className="col-md-6 mb-2">
              <input type="text" className='form-control' placeholder='Name' name='name' onChange={getValue} required/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="text" className='form-control' placeholder='User Name' name='username' onChange={getValue} required/>
              </div>
              <div className="mb-2">
              <input type="email" className='form-control' placeholder='Email' name='email' onChange={getValue} required/>
              </div>
            <div className="mb-2">
            <input type="tel" className='form-control' placeholder='Phone' name='phone_1' onChange={getValue} required/>
            </div>
              <div className="mb-2">
            <input type="password" className='form-control' placeholder='Password' name='password' onChange={getValue} required/>
            </div>
            <div className="mb-2">
            <input type="password" className='form-control' placeholder='Re-type Password' name='password_2' onChange={getValue} required/>
            </div>
              <div className="col-md-6 mb-2">
              <input className='form-control' placeholder='gender' name='gender' onChange={getValue}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="text" className='form-control' placeholder='identification type' name='identification_type' onChange={getValue}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="text" className='form-control' placeholder='identification number' name='identification_number' onChange={getValue}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="file" className='form-control' placeholder='identification image' name='identification_image' onChange={handleIdentifiction}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="number" className='form-control' placeholder='user type' name='user_type' onChange={getValue}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="file" className='form-control' placeholder='sign' name='sign' onChange={handleSign}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="file" className='form-control' placeholder='personal_image' name='personal_image' onChange={handlePersonalImg}/>
              </div>
              <div className="col-md-6 mb-2">
              <input type="text" className='form-control' placeholder='country' name='country' onChange={getValue}/>
              </div>
            
            
            <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'> {loadBtn? <Cached/>: 'Create Account'}</button>
            <hr/>
            <p>Already a member? <Link to="/login" style={{color:"#ef074b"}}>Log in</Link></p>
          </div>
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